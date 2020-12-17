import { useLeaflet } from "react-leaflet";
import { forwardRef, memo, useEffect, useImperativeHandle } from "react";
import L from "leaflet";
import "./map-info-control.scss";

/**
 * @return {null}
 */
function MapInfoControl({ geoJsonRef, selectedStatisticMetaData }, ref) {
  const { map } = useLeaflet();
  const info = L.control();
  const div = L.DomUtil.create("div", "info");

  info.update = (args) => {
    div.innerHTML =
      `<h4 class="header">${selectedStatisticMetaData.description}</h4>` +
      `<p>${selectedStatisticMetaData.startYear} - ${selectedStatisticMetaData.endYear}</p>` +
      `<span>` +
      (args
        ? `<b>${args.name}</b>&emsp;${args.value}&nbsp;%`
        : "Hover over a state") +
      `</span>`;
  };

  info.onAdd = function () {
    this.update();
    return div;
  };

  useImperativeHandle(ref, () => ({ info }));

  useEffect(() => {
    info.addTo(map);
  }, [info, map]);

  return null;
}

export default memo(forwardRef(MapInfoControl));
