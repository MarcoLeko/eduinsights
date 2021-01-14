import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../geo-map/geo-map.scss";
import useResizeObserver from "../../hooks/useResizeObserver";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { StatisticsMarkup } from "../SEO/statistics-markup";
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";

const {
  extent,
  geoPath,
  interpolateBlues,
  scaleLinear,
  scaleSequential,
  select,
  geoOrthographic,
} = d3;

function GeoGlobe({
  showLoadingScreen,
  geoJsonFromSelectedStatistic,
  statisticsList,
}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { dispatch, theme } = useUiContext();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const isDarkTheme = theme === "dark";
  const muiTheme = useTheme();
  const verySmallViewport = useMediaQuery(muiTheme.breakpoints.between(0, 361));
  const smallViewport = useMediaQuery(muiTheme.breakpoints.between(362, "xs"));
  const midSmallViewport = useMediaQuery(
    muiTheme.breakpoints.between("xs", 1000)
  );
  const mediumViewport = useMediaQuery(
    muiTheme.breakpoints.between(1001, "md")
  );

  const largeViewport = useMediaQuery(muiTheme.breakpoints.between("md", "lg"));

  const getHeight = () => {
    if (verySmallViewport) {
      return 250;
    }
    if (smallViewport) {
      return 350;
    }
    if (midSmallViewport) {
      return 500;
    }
    if (mediumViewport) {
      return 600;
    }
    if (largeViewport) {
      return 640;
    }

    return 640;
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    let rotation;
    let coordinates;
    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const colorScale = scaleSequential(interpolateBlues);
    const unitScale = scaleLinear()
      .domain(
        extent(
          geoJsonFromSelectedStatistic.features.map(
            (item) => item.properties.value
          )
        )
      )
      .range([0, 1]);

    function reDraw() {
      svg.selectAll("path").attr("d", path);
    }

    function mouseMove(event) {
      if (coordinates) {
        // limit vertical rotation between 55 & -55
        const newCoordinates = [event.pageX, event.pageY],
          newRotation = [
            rotation[0] + (newCoordinates[0] - coordinates[0]) / 6,
            rotation[1] + (coordinates[1] - newCoordinates[1]) / 6,
          ];
        if (newRotation[1] > 55) {
          newRotation[1] = 55;
        }
        if (newRotation[1] < -55) {
          newRotation[1] = -55;
        }
        projection.rotate(newRotation);
        reDraw();
      }
    }

    function mouseUp(e) {
      if (coordinates) {
        mouseMove(e);
        coordinates = null;
      }
    }

    function mouseDown(event) {
      coordinates = [event.pageX, event.pageY];
      rotation = projection.rotate();
      event.preventDefault();
    }

    const highlight = function (e, feature) {
      setSelectedCountry(selectedCountry === feature ? null : feature);
      select(this).transition().style("opacity", 1);
    };

    const resetHighlight = function () {
      setSelectedCountry(null);
      select(this).transition().style("opacity", 0.75);
    };

    const projection = geoOrthographic()
      .fitSize([width, height], geoJsonFromSelectedStatistic)
      .precision(0.1)
      .clipAngle(90);

    const path = geoPath().projection(projection).pointRadius(2);

    svg
      .selectAll(".country")
      .data(geoJsonFromSelectedStatistic.features)
      .join("path")
      .style("opacity", 0.75)
      .style("stroke-width", 0.5)
      .style("stroke", isDarkTheme ? "#303030" : "#fff")
      .attr("d", path)
      .on("mousemove", mouseMove)
      .on("mouseup", mouseUp)
      .on("mousedown", mouseDown)
      // .on("mouseover", highlight)
      // .on("mouseout", resetHighlight)
      .attr("class", "country")
      .transition()
      .attr("fill", (feature) =>
        feature.properties.value === null
          ? "#ccc"
          : colorScale(unitScale(feature.properties.value))
      )
      .attr("d", (feature) => path(feature));
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
      <svg className="svg-map" ref={svgRef} height={getHeight()} />
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
