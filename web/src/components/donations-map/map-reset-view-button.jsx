import {useLeaflet} from "react-leaflet";
import React, {useEffect} from 'react';
import L from "leaflet";

/**
 * @return {null}
 */
function MapResetViewButton() {

    const {map} = useLeaflet();
    const button = L.control({position: "topleft"});

    useEffect(() => {

        button.onAdd = () => {
            const div = L.DomUtil.create("button", "button ripple");
            div.innerHTML = 'Reset View';

            L.DomEvent.disableClickPropagation(div)
                .addListener(div, 'click', function () {
                    map.setView(map.options.center, map.options.zoom)
                }, div);
            return div;
        };

        button.addTo(map);
    }, []);

    return null;
}

export default MapResetViewButton;
