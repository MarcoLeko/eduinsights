import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./geo-map.scss";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { StatisticsMarkup } from "../SEO/statistics-markup";
import { Typography } from "@material-ui/core";
import { MapToolTip } from "../../map-tooltip/map-tooltip";
import { useD3Utils } from "../../hooks/use-d3-utils";
import useResizeObserver from "../../hooks/use-resize-observer";

const {
  extent,
  geoEquirectangular,
  geoPath,
  interpolateMagma,
  scaleLinear,
  select,
} = d3;

function GeoMap({
  showLoadingScreen,
  geoJsonFromSelectedStatistic,
  statisticsList,
}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { dispatch, theme } = useUiContext();
  const {
    getVisualizationHeight,
    setSelectedCountryHandler,
    resetSelectedCountryHandler,
    toolTipPos,
    selectedCountry,
  } = useD3Utils(wrapperRef);
  const dimensions = useResizeObserver(wrapperRef);
  const isDarkTheme = theme === "dark";
  useEffect(() => {
    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }

    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current?.getBoundingClientRect();
    const unitScale = scaleLinear()
      .domain(
        extent(
          geoJsonFromSelectedStatistic.features.map(
            (item) => item.properties.value
          )
        )
      )
      .range(isDarkTheme ? [0, 1] : [1, 0]);

    const projection = geoEquirectangular().fitSize(
      [width, height],
      geoJsonFromSelectedStatistic
    );

    const path = geoPath().projection(projection);

    svg
      .selectAll(".country")
      .data(geoJsonFromSelectedStatistic.features)
      .join("path")
      .style("opacity", 0.8)
      .style("stroke-width", 0.5)
      .style("stroke", isDarkTheme ? "#303030" : "#fff")
      .on("mouseover", setSelectedCountryHandler)
      .on("mouseout", resetSelectedCountryHandler)
      .attr("class", "country")
      .attr("fill", (feature) =>
        feature.properties.value === null
          ? "#ccc"
          : interpolateMagma(unitScale(feature.properties.value))
      )
      .attr("d", (feature) => path(feature))
      .attr("transform", "scale(1, 1.2)");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions, geoJsonFromSelectedStatistic, dispatch, isDarkTheme]);

  return (
    <div className="svg-wrapper" ref={wrapperRef} id="svg-container">
      <VisualizationLoadingProgress show={showLoadingScreen} />
      {geoJsonFromSelectedStatistic.description && (
        <Typography
          variant="subtitle1"
          className="statistic-description"
          color="textSecondary"
        >
          {geoJsonFromSelectedStatistic.description}
        </Typography>
      )}
      <svg ref={svgRef} height={getVisualizationHeight()} />
      {Boolean(geoJsonFromSelectedStatistic.features.length) && (
        <>
          <StatisticsMarkup
            data={{
              ...geoJsonFromSelectedStatistic,
              statisticsList: statisticsList,
            }}
          />
          <MapToolTip
            evaluationType={geoJsonFromSelectedStatistic.evaluationType}
            selectedCountry={selectedCountry}
            tooltipPos={toolTipPos}
          />
        </>
      )}
    </div>
  );
}

export default GeoMap;
