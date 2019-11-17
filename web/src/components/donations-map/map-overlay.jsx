import React, {useEffect, useRef, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import './map-overlay.scss';
import * as ReactLeaflet from 'react-leaflet';
import {setSwipeState} from "../../store/actions";
import {connect} from "react-redux";
import L from 'leaflet';
import marker from '../../assets/marker.png';
import MarkerPopup from "./marker-popup";
import {getInternetAccessStatistics} from "../../store/thunks";
import MapInfoControl from './map-info-control';

const {Map, TileLayer, Marker, GeoJSON} = ReactLeaflet;

let DefaultIcon = L.icon({
    iconUrl: marker,
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 35], // point of the icon which will correspond to marker's location
});

L.Marker.prototype.options.icon = DefaultIcon;
function MapOverlay({setSwipeState}) {
    const mapRef = useRef(null);
    const geoJSONRef = useRef(null);
    const [geoJSON, setGeoJSON] = useState({type: 'featureCollection', features: []});
    const [donationLocations] = useState([
        [48.135125, 11.581981], [58.403, 20.420], [43.300, 40],
        [70.505, -20], [40.505, -80], [-40.505, -10]
    ]);

    useEffect(() => {
        getInternetAccessStatistics().then((result) => {
            geoJSONRef.current.leafletElement.clearLayers().addData(result);
            setGeoJSON(result);
        });

    }, []);

    function getColor(d) {
        return d > 95 ? '#993404' :
            d > 75  ? '#d95f0e' :
                d > 50  ? '#fe9929' :
                    d > 30  ? '#fec44f' :
                        d > 25   ? '#fee391' :
                            '#ffffd4'
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.value),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7
        };
    }

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geoJSONRef.current.leafletElement.resetStyle(e.target);
    }

    function zoomToCountry(e) {
        mapRef.current.leafletElement.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToCountry
        });
    }

    function getMapData() {
        return (
            <GeoJSON
                data={geoJSON}
                style={style}
                ref={geoJSONRef}
                onEachFeature={onEachFeature}>
                {
                    donationLocations.map((position, i) =>
                        (
                            <Marker position={position} key={i}>
                                <MarkerPopup/>
                            </Marker>
                        )
                    )
                }
            </GeoJSON>
        )
    }
    return (
        <Map
            ref={mapRef}
            center={[45.000, 10.000]}
            zoom={3}
            zoomControl={false}
            onMovestart={() => setSwipeState(false)}
            onMoveend={() => setSwipeState(true)}
            minZoom={3}
            bounceAtZoomLimits={true}
            maxBoundsViscosity={.95}
            maxBounds={[[-90, -175], [80, 175]]}
        >
            <TileLayer
                noWrap={true}
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | &amp;copy <a href="https://apps.mapbox.com/feedback/">Mapbox</a>'
                url={'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + process.env.REACT_APP_MAPBOX_KEY}
            />
            {getMapData()}
            <MapInfoControl getColor={getColor}/>
        </Map>
    )
}

export default connect(null, {setSwipeState})(MapOverlay);
