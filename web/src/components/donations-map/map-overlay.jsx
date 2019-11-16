import React, {useEffect, useRef, useState} from 'react'
import 'leaflet/dist/leaflet.css';
import './map-overlay.scss';
import * as ReactLeaflet from 'react-leaflet';
import {setSwipeState} from "../../store/actions";
import {connect} from "react-redux";
import L from 'leaflet';
import marker from '../../assets/marker.png';
import MarkerPopup from "./marker-popup";
import {getInternetAccessStatistics} from "../../store/thunks";

const {Map, TileLayer, Marker, GeoJSON} = ReactLeaflet;

let DefaultIcon = L.icon({
    iconUrl: marker,
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 35], // point of the icon which will correspond to marker's location
});

L.Marker.prototype.options.icon = DefaultIcon;

// TODO: remove this line as fetching the data will later be part of backend
const mapBoxAccessToken = "pk.eyJ1IjoibWFyY29sZWtvIiwiYSI6ImNrMnQ4dmF2eDE1NWIzY3A3Njc3cHA4OTUifQ.YZzqYyZzcwKfV51f-FUnZw";

function MapOverlay({setSwipeState}) {
    const ref = useRef(null);

    const [geoJSON, setGeoJSON] = useState({type: 'featureCollection', features: []});
    useEffect(() => {
        const fetchData = async () => {
            const result = await getInternetAccessStatistics();
            console.log(result);
            setGeoJSON(result)
        };

        fetchData();
    }, [geoJSON.features]);

    function getColor(d) {
        return d > 90 ? '#016c59' :
            d > 75 ? '#1c9099' :
                d > 50 ? '#67a9cf' :
                    '#bdc9e1';
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

    return (
        <Map
            ref={ref}
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
                url={'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + mapBoxAccessToken}
            />
            <GeoJSON data={geoJSON} style={style}>
                {
                    [
                        [48.135125, 11.581981], [58.403, 20.420], [43.300, 40],
                        [70.505, -20], [40.505, -80], [-40.505, -10]
                    ].map((position, i) =>

                        <Marker position={position} key={i}>
                            <MarkerPopup/>
                        </Marker>
                    )
                }
            </GeoJSON>
        </Map>
    )
}

export default connect(null, {setSwipeState})(MapOverlay);
