import {useLeaflet} from "react-leaflet";
import {memo, useEffect} from 'react';
import L from "leaflet";
import {getColor} from "./map-overlay";

/**
 * @return {null}
 */
function MapLegend() {

    const {map} = useLeaflet();
    const legend = L.control({position: "bottomright"});

    useEffect(() => {
        const grades = [95, 75, 50, 30, 25];
        const labels = [];

        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");

            let from;
            let to;

            for (let i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push(
                    `<i style="background:${getColor(from + 1)}"></i>` +
                    from + (to ? "&ndash;" + to : "+")
                );
            }

            div.innerHTML = labels.join("<br>");
            return div;
        };

        legend.addTo(map);
    }, [map, legend]);

    return null;
}

export default memo(MapLegend);
