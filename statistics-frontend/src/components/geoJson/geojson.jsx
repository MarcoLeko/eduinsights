import React, { memo } from "react";
import * as ReactLeaflet from "react-leaflet";
import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import { getColor } from "../shared/getColor";

const { GeoJSON } = ReactLeaflet;

function GeoJson({ geoJsonRef, infoControlRef, data }) {
  const { map } = useLeaflet();

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToCountry,
    });
  }

  function inRange(x, min, max) {
    if (min > max) {
      return (x - min) * (x - max) >= 0;
    } else {
      return (x - min) * (x - max) <= 0;
    }
  }

  function style(feature) {
    const getRange = data.evaluation.find((obj) =>
      inRange(feature.properties.value, obj.value[1], obj.value[0])
    );

    if (getRange === undefined) {
      console.log(feature.properties);
      console.log(data.evaluation);
    }
    return {
      fillColor: getColor(getRange.key),
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

export default memo(
  GeoJson,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data.evaluation) ===
    JSON.stringify(nextProps.data.evaluation)
);
