import React, { useEffect, useRef, useState } from "react";
import {
  extent,
  geoEquirectangular,
  geoPath,
  interpolateBlues,
  scaleLinear,
  scaleSequential,
  select,
} from "d3";
import "./geo-map.scss";
import { useStatisticData } from "../../hooks/use-statistic-data";
import useResizeObserver from "../../hooks/useResizeObserver";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { StatisticsMarkup } from "../SEO/statistics-markup";
import { useMediaQuery, useTheme } from "@material-ui/core";

function GeoMap({ showLoadingScreen }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { dispatch, theme } = useUiContext();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { geoJsonFromSelectedStatistic, statisticsList } = useStatisticData();
  const isDarkTheme = theme === "dark";
  const muiTheme = useTheme();
  const verySmallViewport = useMediaQuery(muiTheme.breakpoints.between(0, 361));
  const smallViewport = useMediaQuery(muiTheme.breakpoints.between(362, "xs"));
  const mediumViewport = useMediaQuery(
    muiTheme.breakpoints.between("xs", "md")
  );
  const largeViewport = useMediaQuery(muiTheme.breakpoints.between("md", "lg"));

  const getHeight = () => {
    if (verySmallViewport) {
      return 250;
    }
    if (smallViewport) {
      return 350;
    }
    if (mediumViewport) {
      return 450;
    }

    if (largeViewport) {
      return 600;
    }

    return 640;
  };

  useEffect(() => {
    const svg = select(svgRef.current);

    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }

    const { width } = dimensions || wrapperRef.current.getBoundingClientRect();

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

    const projection = geoEquirectangular().fitWidth(
      width,
      geoJsonFromSelectedStatistic
    );
    const pathGenerator = geoPath().projection(projection);

    const highlight = function (e, feature) {
      setSelectedCountry(selectedCountry === feature ? null : feature);
      select(this).transition().style("opacity", 1);
    };

    const resetHighlight = function () {
      setSelectedCountry(null);
      select(this).transition().style("opacity", 0.75);
    };

    svg
      .selectAll(".country")
      .data(geoJsonFromSelectedStatistic.features)
      .join("path")
      .style("opacity", 0.75)
      .style("stroke-width", 0.5)
      .style("stroke", isDarkTheme ? "#303030" : "#fff")
      .on("mouseover", highlight)
      .on("mouseout", resetHighlight)
      .attr("class", "country")
      .transition()
      .attr("fill", (feature) =>
        feature.properties.value === null
          ? "#ccc"
          : colorScale(unitScale(feature.properties.value))
      )
      .attr("d", (feature) => pathGenerator(feature))
      .attr("transform", "scale(1, 1.3)");
  }, [
    selectedCountry,
    dimensions,
    geoJsonFromSelectedStatistic,
    dispatch,
    isDarkTheme,
  ]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <VisualizationLoadingProgress show={showLoadingScreen} />
      <svg className="svg-map" ref={svgRef} height={getHeight()} />
      {Boolean(geoJsonFromSelectedStatistic.features.length) && (
        <>
          <StatisticsMarkup
            data={{
              ...geoJsonFromSelectedStatistic,
              statisticsList: statisticsList,
            }}
          />
        </>
      )}
    </div>
  );
}

export default GeoMap;
