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
    setSelectedCountryHandler,
    resetSelectedCountryHandler,
    toolTipPos,
    selectedCountry,
    width,
    height,
  } = useD3Utils(wrapperRef);
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    const svg = select(svgRef.current);

    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }

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
  }, [geoJsonFromSelectedStatistic, isDarkTheme]);

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
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} />
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
