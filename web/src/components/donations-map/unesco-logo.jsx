import {useLeaflet} from "react-leaflet";
import {memo, useEffect} from 'react';
import L from "leaflet";

/**
 * @return {null}
 */
function UnescoLogo() {

    const {map} = useLeaflet();
    const logo = L.control({position: "bottomleft"});

    useEffect(() => {

        logo.onAdd = () => {
            const div = L.DomUtil.create("div", "logo");

            return div;
        };

        logo.addTo(map);
    }, [map, logo]);

    return null;
}

export default memo(UnescoLogo);
