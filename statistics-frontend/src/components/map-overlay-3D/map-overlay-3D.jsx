import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import EarthNight from "../../assets/earth-night.jpg";
import EarthDay from "../../assets/earth-day.jpg";
import EarthTopology from "../../assets/earth-topology.png";
import { useUiContext } from "../../hooks/use-ui-context";
import { getColor, getColorRange } from "../shared/getColor";
import "./map-overlay-3D.scss";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { StatisticsMarkup } from "../SEO/statistics-markup";
import ResetViewGlobeButton from "../reset-view-visualization-button/reset-view-globe-button";

export function MapOverlay3D({
  showLoadingScreen,
  geoJsonFromSelectedStatistic,
  statisticsList,
}) {
  const { theme, dispatch } = useUiContext();
  const materialUiTheme = useTheme();
  const matches = useMediaQuery(materialUiTheme.breakpoints.down("xs"));
  const height = matches
    ? window.innerHeight - (128 + 52)
    : window.innerHeight - (128 + 117);

  const globeRef = useRef();
  const [activeHoveredPolygon, setActiveHoveredPolygon] = useState(null);

  useEffect(() => {
    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }
    return () => dispatch(setVisualizationLoaded(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoJsonFromSelectedStatistic]);

  function getGlobeWidth() {
    return document.body.clientWidth > 1200 ? 1200 : document.body.clientWidth;
  }

  return (
    <div className="globe-content-wrapper">
      <VisualizationLoadingProgress show={showLoadingScreen} />
      {globeRef.current && (
        <ResetViewGlobeButton
          camera={globeRef.current.camera()}
          controls={globeRef.current.controls()}
        />
      )}
      {Boolean(geoJsonFromSelectedStatistic.features.length) && (
        <>
          <StatisticsMarkup
            data={{
              ...geoJsonFromSelectedStatistic,
              statisticsList: statisticsList,
            }}
          />
          <Typography
            variant="caption"
            color={"secondary"}
            style={{
              position: "absolute",
              top: 16,
              margin: "auto",
              zIndex: 2,
              width: "100%",
              textAlign: "center",
            }}
          >
            {geoJsonFromSelectedStatistic.description}
          </Typography>
        </>
      )}
      <Globe
        height={height}
        ref={globeRef}
        width={getGlobeWidth()}
        globeImageUrl={theme === "dark" ? EarthNight : EarthDay}
        bumpImageUrl={EarthTopology}
        polygonStrokeColor={() => "#111"}
        polygonSideColor={() => "#111"}
        polygonCapColor={(layer) =>
          layer === activeHoveredPolygon
            ? "steelblue"
            : getColor(
                getColorRange(geoJsonFromSelectedStatistic.evaluation, layer)
                  .key
              )
        }
        polygonLabel={({ properties: layer }) => `
        <div class="polygon-label"><b>${layer.name} (${layer.id}):</b> <br />
        value: <i>${layer.value}%</i><br/>
        capital: <i>${layer.capital}</i>
        </div>
      `}
        onPolygonHover={setActiveHoveredPolygon}
        polygonsTransitionDuration={300}
        polygonsData={geoJsonFromSelectedStatistic.features}
      />
    </div>
  );
}
