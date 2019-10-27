import React from 'react'
import 'leaflet/dist/leaflet.css';
import './map-overlay.scss';
import * as ReactLeaflet from 'react-leaflet';
import {setSwipeState} from "../../store/actions";
import {connect} from "react-redux";

const {Map, TileLayer, Marker, Popup} = ReactLeaflet;

function MapOverlay({setSwipeState}) {
    const position = [51.505, -0.09];
    const zoom = 4;
    return (
        <Map
            center={position}
            zoom={zoom}
            animate={true}
            maxZoom={10}
            minZoom={2}
            bounceAtZoomLimits={true}
            zoomAnimation={true}
            onMovestart={() => setSwipeState(false)}
            onMoveend={() => setSwipeState(true)}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </Map>
    )
}

export default connect(null, {setSwipeState})(MapOverlay);
