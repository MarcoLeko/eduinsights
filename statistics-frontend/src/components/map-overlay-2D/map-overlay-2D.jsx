import React, { memo, useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./map-overlay.scss";
import * as ReactLeaflet from "react-leaflet";
import { setSwipeState } from "../../store/ui/ui-actions";
import { connect } from "react-redux";
import MapLegend from "../map-legend/map-legend";
import MapInfoControl from "../map-info-control/map-info-control";
import MapSideBar from "./map-side-bar";
import ResetViewMapButton from "../reset-view-map-button/reset-view-map-button";
import { useMapStatistics } from "../../hooks/use-map-statistics";
import { useLeaflet } from "react-leaflet";
import GeoJson from "../geoJson/geojson";

const { Map, TileLayer } = ReactLeaflet;

function MapOverlay2D({ toggleSwipe }) {
  const { map } = useLeaflet();
  const geoJsonRef = useRef(null);
  const infoControlRef = useRef(null);
  const {
    geoJsonFromSelectedStatistic,
    selectedStatistic,
    allMapStatistics,
    setSelectedStatistic,
    fetchMapStatisticsById,
  } = useMapStatistics(geoJsonRef);

  const [mapMode, setMapMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const mediaQueryThemeMode = window.matchMedia("(prefers-color-scheme: dark)");

  function setMapModeWrapper(e) {
    setMapMode(e.matches ? "dark" : "light");
  }

  useEffect(() => {
    mediaQueryThemeMode.addEventListener("change", setMapModeWrapper);

    return () =>
      mediaQueryThemeMode.removeEventListener("change", setMapModeWrapper);
  }, [mediaQueryThemeMode]);

  function centerMapView(e) {
    if (e) {
      map.panTo(e.popup._latlng, { animate: true });
    }
  }

  function toggleMapMode() {
    setMapMode(mapMode === "light" ? "dark" : "light");
  }

  return (
    <Map
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
      <MapSideBar
        mapStatistics={allMapStatistics}
        toggleMapMode={toggleMapMode}
        mapMode={mapMode}
        setSelectedStatistic={setSelectedStatistic}
        fetchMapStatisticsById={fetchMapStatisticsById}
        selectedStatistic={selectedStatistic}
      />
      {selectedStatistic && geoJsonFromSelectedStatistic.description && (
        <>
          <GeoJson
            geoJsonRef={geoJsonRef}
            data={geoJsonFromSelectedStatistic}
            infoControlRef={infoControlRef}
          />
          <MapInfoControl
            selectedStatisticMetaData={geoJsonFromSelectedStatistic}
            ref={infoControlRef}
          />
          <MapLegend selectedStatisticMetaData={geoJsonFromSelectedStatistic} />
        </>
      )}
      <ResetViewMapButton />
    </Map>
  );
}

const dispatchMapToProps = (dispatch) => ({
  toggleSwipe: (val) => dispatch(setSwipeState(val)),
});

export default connect(null, dispatchMapToProps)(memo(MapOverlay2D));
