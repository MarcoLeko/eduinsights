import { useLeaflet } from "react-leaflet";
import { useEffect, forwardRef, useImperativeHandle, memo } from "react";
import L from "leaflet";

/**
 * @return {null}
 */
function MapInfoControl(props, ref) {
  const { map } = useLeaflet();
  const info = L.control();
  const div = L.DomUtil.create("div", "info");

  info.update = function (args) {
    return (div.innerHTML =
      "<h4>Proportion of primary schools with access to internet</h4>" +
      (args
        ? `<b>${args.name}</b>&emsp;${args.value}&nbsp;%`
        : "Touch/Hover over a state"));
  };

  info.onAdd = function () {
    this.update();
    return div;
  };

  useImperativeHandle(ref, () => ({ info }));

  useEffect(() => {
    info.addTo(map);
  }, [div, info, map]);

  return null;
}

export default memo(forwardRef(MapInfoControl));
