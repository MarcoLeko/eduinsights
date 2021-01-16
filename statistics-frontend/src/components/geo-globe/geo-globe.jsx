import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./geo-globe.scss";
import useResizeObserver from "../../hooks/useResizeObserver";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { StatisticsMarkup } from "../SEO/statistics-markup";
import { Typography } from "@material-ui/core";
import { useD3Utils } from "../../hooks/use-d3-utils";

const {
  extent,
  geoPath,
  scaleLinear,
  interpolateMagma,
  select,
  geoOrthographic,
  zoom,
  geoGraticule,
} = d3;

function GeoGlobe({
  showLoadingScreen,
  geoJsonFromSelectedStatistic,
  statisticsList,
}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { dispatch, theme } = useUiContext();
  const { getVisualizationHeight } = useD3Utils();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry] = useState(null);
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }

    let lastX = 0;
    let lastY = 0;
    const svg = select(svgRef.current);
    const scale = 300,
      origin = {
        x: 55,
        y: -40,
      };
    const { width, height } =
      dimensions || wrapperRef.current?.getBoundingClientRect();
    const λ = scaleLinear().domain([0, width]).range([-180, 180]);
    const φ = scaleLinear().domain([0, height]).range([90, -90]);

    const unitScale = scaleLinear()
      .domain(
        extent(
          geoJsonFromSelectedStatistic.features.map(
            (item) => item.properties.value
          )
        )
      )
      .range(isDarkTheme ? [0, 1] : [1, 0]);

    const projection = geoOrthographic()
      .fitSize([width, height], geoJsonFromSelectedStatistic)
      .rotate([0, 0, 0]);

    const path = geoPath().projection(projection);
    const graticule = geoGraticule();

    svg.call(zoom().on("zoom", zoomed));

    svg
      .append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

    svg
      .selectAll(".country")
      .data(geoJsonFromSelectedStatistic.features)
      .join("path")
      .transition()
      .attr("fill", (feature) =>
        feature.properties.value === null
          ? "#ccc"
          : interpolateMagma(unitScale(feature.properties.value))
      )
      .attr("d", (feature) => path(feature));

    function updatePaths(svg, graticule, geoPath) {
      svg.selectAll("path.graticule").datum(graticule).attr("d", geoPath);
    }

    function zoomed(event) {
      const transform = event.transform;
      const r = {
        x: λ(transform.x),
        y: φ(transform.y),
      };
      if (event.sourceEvent.wheelDelta) {
        projection.scale(scale * transform.k);
        transform.x = lastX;
        transform.y = lastY;
      } else {
        projection.rotate([origin.x + r.x, origin.y + r.y]);
        lastX = transform.x;
        lastY = transform.y;
      }
      updatePaths(svg, graticule, path);
    }
  }, [
    selectedCountry,
    dimensions,
    geoJsonFromSelectedStatistic,
    dispatch,
    isDarkTheme,
  ]);

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
      <svg className="svg-map" ref={svgRef} height={getVisualizationHeight()} />
      {Boolean(geoJsonFromSelectedStatistic.features.length) && (
        <StatisticsMarkup
          data={{
            ...geoJsonFromSelectedStatistic,
            statisticsList: statisticsList,
          }}
        />
      )}
    </div>
  );
}

export default GeoGlobe;
