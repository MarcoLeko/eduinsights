import React, { useRef } from "react";
import * as ReactLeaflet from "react-leaflet";
import { useMapStatistics } from "../../hooks/use-map-statistics";
import L from "leaflet";
import { getColor } from "../shared/getColor";

const { GeoJSON } = ReactLeaflet;

function GeoJson({ infoControlRef, mapRef }) {
  const geoJSONRef = useRef(null);

  const { geoJsonFromSelectedStatistic } = useMapStatistics(geoJSONRef);

  function style(feature) {
    return {
      fillColor: getColor(feature.properties.value),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "2",
      fillOpacity: 0.7,
    };
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToCountry,
    });
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
    geoJSONRef.current.leafletElement.resetStyle(e.target);
    infoControlRef.current.info.update();
  }

  function zoomToCountry(e) {
    mapRef.current.leafletElement.fitBounds(e.target.getBounds());
  }

  return (
    <GeoJSON
      data={geoJsonFromSelectedStatistic}
      style={style}
      ref={geoJSONRef}
      onEachFeature={onEachFeature}
    />
  );
}

export { GeoJson };
