import React, {useEffect, useRef} from 'react'
import 'leaflet/dist/leaflet.css';
import './map-overlay.scss';
import * as ReactLeaflet from 'react-leaflet';
import {setSwipeState} from "../../store/actions";
import {connect} from "react-redux";
import L from 'leaflet';
import marker from '../../assets/marker.png';
import MarkerPopup from "./marker-popup";

const {Map, TileLayer, Marker} = ReactLeaflet;

let DefaultIcon = L.icon({
    iconUrl: marker,
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 35], // point of the icon which will correspond to marker's location
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapOverlay({setSwipeState}) {
    const ref = useRef(null);

    useEffect(() => {
        const {leafletElement} = ref.current;
        console.log(leafletElement.getBounds())
    }, []);

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
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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
        </Map>
    )
}

export default connect(null, {setSwipeState})(MapOverlay);
