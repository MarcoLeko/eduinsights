import React, { memo, useEffect } from "react";
import * as ReactLeaflet from "react-leaflet";
import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { getColor, getColorRange } from "../shared/getColor";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";

const { GeoJSON } = ReactLeaflet;

function GeoJson({ geoJsonRef, infoControlRef, data }) {
  const { map } = useLeaflet();
  const { dispatch } = useUiContext();
  useEffect(() => {
    dispatch(setVisualizationLoaded(true));
    return () => dispatch(setVisualizationLoaded(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToCountry,
    });
  }

  function style(feature) {
    return {
      fillColor: getColor(getColorRange(data.evaluation, feature).key),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "2",
      fillOpacity: 0.7,
    };
  }

  function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    infoControlRef.current.info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
    geoJsonRef.current.leafletElement.resetStyle(e.target);
    infoControlRef.current.info.update();
  }

  function zoomToCountry(e) {
    map.fitBounds(e.target.getBounds());
  }

  return (
    <GeoJSON
      key={new Date()}
      data={data}
      style={style}
      ref={geoJsonRef}
      onEachFeature={onEachFeature}
    />
  );
}

export default memo(GeoJson);
