import {useLeaflet} from "react-leaflet";
import {memo, useEffect} from 'react';
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
                    map.flyTo(map.options.center, map.options.zoom, {
                        animate: true,
                        easeLinearity: .75,
                        duration: 1.5
                    })
                }, div);
            return div;
        };

        button.addTo(map);
    }, [map, button]);

    return null;
}

export default memo(MapResetViewButton);
