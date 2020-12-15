import React, { useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./map-overlay.scss";
import * as ReactLeaflet from "react-leaflet";
import { setSwipeState } from "../../store/ui/ui-actions";
import { connect } from "react-redux";
import L from "leaflet";
import MapLegend from "./map-legend";
import MapInfoControl from "./map-info-control";
import MapResetViewButton from "./map-reset-view-button";
import MapSideBar from "./map-side-bar";
import { useMapStatistics } from "../../hooks/useMapStatistics";

const { Map, TileLayer, GeoJSON } = ReactLeaflet;

export function getColor(d) {
  return d > 90
    ? "#228B22"
    : d > 80
    ? "#9ACD32"
    : d > 70
    ? "#FFEDA0"
    : d > 50
    ? "#FD8D3C"
    : d > 25
    ? "#FF6347"
    : "#800026";
}

function MapOverlay({ toggleSwipe }) {
  const mapRef = useRef(null);
  const geoJSONRef = useRef(null);
  const infoControlRef = useRef(null);
  const { geoJSON, allMapStatistics } = useMapStatistics(geoJSONRef);

  console.log(allMapStatistics);
  const [mapMode, setMapMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      setMapMode(e.matches ? "dark" : "light");
    });

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

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToCountry,
    });
  }

  function centerMapView(e) {
    const { leafletElement } = mapRef.current;

    if (e) {
      leafletElement.panTo(e.popup._latlng, { animate: true });
    }
  }

  function toggleMapMode() {
    setMapMode(mapMode === "light" ? "dark" : "light");
  }

  return (
    <Map
      ref={mapRef}
      center={[45.0, 10.0]}
      zoom={3}
      tap={false} // disable tap events to let leaflet assume all map touch events are clean mouse events
      onPopupopen={centerMapView.bind(this)}
      zoomControl={false}
      onMovestart={() => toggleSwipe(false)}
      onMoveend={() => toggleSwipe(true)}
      minZoom={3}
      bounceAtZoomLimits={true}
      maxBoundsViscosity={0.95}
      maxBounds={[
        [-90, -175],
        [80, 175],
      ]}
    >
      <TileLayer
        noWrap={true}
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> | &amp;copy <a href="https://apps.mapbox.com/feedback/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/${mapMode}-v10/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
      />
      <GeoJSON
        data={geoJSON}
        style={style}
        ref={geoJSONRef}
        onEachFeature={onEachFeature}
      />
      <MapSideBar toggleMapMode={toggleMapMode} mapMode={mapMode} />
      <MapLegend />
      <MapInfoControl ref={infoControlRef} />
      <MapResetViewButton />
    </Map>
  );
}

const dispatchMapToProps = (dispatch) => ({
  toggleSwipe: (val) => dispatch(setSwipeState(val)),
});

export default connect(null, dispatchMapToProps)(MapOverlay);
