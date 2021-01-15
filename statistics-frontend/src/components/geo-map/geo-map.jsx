import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./geo-map.scss";
import useResizeObserver from "../../hooks/useResizeObserver";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { StatisticsMarkup } from "../SEO/statistics-markup";
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { MapToolTip } from "../../map-tooltip/map-tooltip";

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
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [toolTipPos, setToolTipPos] = useState({ pageX: null, pageY: null });
  const muiTheme = useTheme();

  const midSmallViewport = useMediaQuery(
    muiTheme.breakpoints.between("xs", 1000)
  );

  const mediumViewport = useMediaQuery(
    muiTheme.breakpoints.between(1001, "md")
  );

  const largeViewport = useMediaQuery(muiTheme.breakpoints.between("md", "lg"));

  const getDesktopHeight = () => {
    // Viewport is probably rotated e.g. Mobile
    if (window.innerHeight > window.innerWidth) {
      return "100%";
    }

    if (midSmallViewport) {
      return "550px";
    }
    if (mediumViewport) {
      return "600px";
    }
    if (largeViewport) {
      return "640px";
    }

    return "100%";
  };

  const isDarkTheme = theme === "dark";

  useEffect(() => {
    const svg = select(svgRef.current);

    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }

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

    const pathGenerator = geoPath().projection(projection);

    const highlight = function (e, feature) {
      setSelectedCountry(selectedCountry === feature ? null : feature);
    };

    const mouseMove = function (e) {
      const rect = wrapperRef.current?.getBoundingClientRect();
      setToolTipPos({
        pageX: e.clientX - rect.left,
        pageY: e.clientY - rect.top,
      });
    };

    const resetHighlight = function () {
      setSelectedCountry(null);
    };

    svg
      .selectAll(".country")
      .data(geoJsonFromSelectedStatistic.features)
      .join("path")
      .style("opacity", 0.8)
      .style("stroke-width", 0.5)
      .style("stroke", isDarkTheme ? "#303030" : "#fff")
      .on("mouseover", highlight)
      .on("mousemove", mouseMove)
      .on("mouseout", resetHighlight)
      .attr("class", "country")
      .transition()
      .attr("fill", (feature) =>
        feature.properties.value === null
          ? "#ccc"
          : interpolateMagma(unitScale(feature.properties.value))
      )
      .attr("d", (feature) => pathGenerator(feature))
      .attr("transform", "scale(1, 1.2)");
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
      <svg
        className="svg-map"
        ref={svgRef}
        style={{ height: `${getDesktopHeight()}` }}
      />
      {Boolean(geoJsonFromSelectedStatistic.features.length) && (
        <>
          <StatisticsMarkup
            data={{
              ...geoJsonFromSelectedStatistic,
              statisticsList: statisticsList,
            }}
          />
          <MapToolTip
            selectedCountry={selectedCountry}
            tooltipPos={toolTipPos}
          />
        </>
      )}
    </div>
  );
}

export default GeoMap;
