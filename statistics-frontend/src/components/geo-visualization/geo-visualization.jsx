import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./geo-visualization.scss";
import {
  setRecentQueries,
  setVisualizationLoaded,
} from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { Typography } from "@material-ui/core";
import { GeoToolTip } from "../geo-tooltip/geo-tooltip";
import { VisualizationLoadingProgress } from "../loading-progress/visualization-loading-progress";
import {
  createGlobe,
  createLegend,
  createMap,
  height,
  width,
} from "./geo-visualization-utils";

const { extent, scaleLinear, select } = d3;

function GeoVisualization({
  showLoadingScreen,
  geoJsonFromSelectedStatistic,
  showGlobe,
}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { dispatch, theme } = useUiContext();
  const isDarkTheme = theme === "dark";

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [toolTipPos, setToolTipPos] = useState(null);

  const setSelectedCountryHandler = useCallback(
    (e, feature) => {
      setSelectedCountry(selectedCountry === feature ? null : feature);
      const rect = wrapperRef.current?.getBoundingClientRect();
      const pageX = e.clientX - rect.left;
      const pageY = e.clientY - rect.top;
      setToolTipPos({ pageX, pageY });
    },
    [selectedCountry, wrapperRef]
  );

  const resetSelectedCountryHandler = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);

    if (geoJsonFromSelectedStatistic.features) {
      dispatch(setVisualizationLoaded(true));

      const unitScale = scaleLinear()
        .domain(
          extent(
            geoJsonFromSelectedStatistic.features.map(
              (item) => item.properties.value
            )
          )
        )
        .range(isDarkTheme ? [0, 1] : [1, 0]);

      showGlobe
        ? createGlobe(
            svg,
            width,
            height,
            geoJsonFromSelectedStatistic,
            isDarkTheme,
            setSelectedCountryHandler,
            resetSelectedCountryHandler,
            unitScale
          )
        : createMap(
            svg,
            width,
            height,
            geoJsonFromSelectedStatistic,
            isDarkTheme,
            setSelectedCountryHandler,
            resetSelectedCountryHandler,
            unitScale
          );

      // Currently only percentage legend is supported
      if (geoJsonFromSelectedStatistic.unit === "Percentage") {
        createLegend(svg, unitScale, isDarkTheme, geoJsonFromSelectedStatistic);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoJsonFromSelectedStatistic, isDarkTheme]);

  useEffect(() => {
    const {
      features,
      description,
      unit,
      amountOfCountries,
    } = geoJsonFromSelectedStatistic;
    if (features) {
      dispatch(
        setRecentQueries({
          description,
          unit,
          amountOfCountries,
          uri: window.location.pathname + window.location.search,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoJsonFromSelectedStatistic]);

  return (
    <div className="svg-wrapper" ref={wrapperRef} id="svg-container">
      <VisualizationLoadingProgress show={showLoadingScreen} />
      {geoJsonFromSelectedStatistic.description && (
        <Typography
          variant="subtitle1"
          align={"center"}
          className="edu-header-h6"
          color="textSecondary"
        >
          {geoJsonFromSelectedStatistic.description}
        </Typography>
      )}
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} />
      {Boolean(geoJsonFromSelectedStatistic.features) && (
        <GeoToolTip
          unit={geoJsonFromSelectedStatistic.unit}
          selectedCountry={selectedCountry}
          tooltipPos={toolTipPos}
        />
      )}
    </div>
  );
}

export { GeoVisualization };
