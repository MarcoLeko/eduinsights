import { useLeaflet } from "react-leaflet";
import { memo, useEffect } from "react";
import L from "leaflet";
import "./reset-view-map-button.scss";

/**
 * @return {null}
 */
function ResetViewMapButton() {
  const { map } = useLeaflet();
  const button = L.control({ position: "bottomleft" });

  useEffect(() => {
    button.onAdd = () => {
      const buttonElm = L.DomUtil.create("button", "button ripple");
      buttonElm.innerHTML = "Reset View";

      L.DomEvent.disableClickPropagation(buttonElm).addListener(
        buttonElm,
        "click",
        function () {
          map.flyTo(map.options.center, map.options.zoom, {
            animate: true,
            easeLinearity: 0.75,
            duration: 1.5,
          });
        },
        buttonElm
      );
      return buttonElm;
    };

    button.addTo(map);
  }, [map, button]);

  return null;
}

export default memo(ResetViewMapButton);
