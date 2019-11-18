import {useLeaflet} from "react-leaflet";
import {useEffect} from 'react';
import L from "leaflet";

/**
 * @return {null}
 */
function MapInfoControl() {

    const {map} = useLeaflet();
    const info = L.control();

    useEffect(() => {

        info.onAdd = () => {
            const div = L.DomUtil.create("div", "info");
            const update = (props) => (
                div.innerHTML = '<h4>Proportion of primary schools with access to internet</h4>' + (props ?
                    '<b>' + props.name + '</b>&emsp;' + props.value + '&nbsp;%'
                    : 'Hover over a state')
            );

            update();
            return div;
        };

        info.addTo(map);
    }, []);

    return null;
}

export default MapInfoControl;
