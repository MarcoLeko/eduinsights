import { useLeaflet } from "react-leaflet";
import { memo, useEffect } from "react";
import L from "leaflet";
import { getColor } from "../shared/getColor";
import "./map-legend.scss";

const div = L.DomUtil.create("div", "info legend");

/**
 * @return {null}
 */
function MapLegend({ selectedStatisticMetaData }) {
  const { map } = useLeaflet();
  const legend = L.control({ position: "bottomright" });

  legend.update = () => {
    const labels = [];

    let from;
    let to;
    let range;

    for (const evaluation of selectedStatisticMetaData.evaluation) {
      range = evaluation.key;
      from = evaluation.value[0];
      to = evaluation.value[1];

      labels.push(
        `<div class="legend-item-wrapper">
               <i class="legend-color-box" style="background:${getColor(
                 range
               )}"></i>` +
          `<span>${from + (to ? " &ndash; " + to : " > ")}</span>` +
          `</div>`
      );
    }

    return (div.innerHTML = labels.join(""));
  };

  legend.onAdd = function () {
    this.update();
    return div;
  };
  useEffect(() => {
    legend.addTo(map);
  }, [map, legend]);

  return null;
}

export default memo(MapLegend);
