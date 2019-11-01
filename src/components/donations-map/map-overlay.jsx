import React, {useEffect, useRef, useState} from 'react'
import 'leaflet/dist/leaflet.css';
import './map-overlay.scss';
import * as ReactLeaflet from 'react-leaflet';
import {setSwipeState} from "../../store/actions";
import {connect} from "react-redux";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const {Map, TileLayer, Marker, Popup} = ReactLeaflet;

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapOverlay({setSwipeState}) {
    const zoom = 4;

    const ref = useRef(null);
    // const [bounds, setBounds] = useState([0, 0]);

    useEffect(() => {
        console.log(ref)
        console.log(ref.current.leafletElement.getBounds())

    }, []);

    return (
        <Map
            ref={ref}
            center={[45.000, 10.000]}
            zoom={zoom}
            maxZoom={10}
            minZoom={2}
            // bounds={ref.current.leafletElement.getBounds()}
            onMovestart={() => setSwipeState(false)}
            onMoveend={() => setSwipeState(true)}
        >
            <TileLayer
                noWrap={true}
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                [[51.505, -0.09], [58.403, 20.420], [43.300, 40]].map((position, i) =>

                    <Marker position={position} key={i}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                )
            }
        </Map>
    )
}

export default connect(null, {setSwipeState})(MapOverlay);
