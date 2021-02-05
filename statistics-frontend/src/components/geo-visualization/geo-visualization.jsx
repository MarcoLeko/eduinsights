import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./geo-visualization.scss";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { Typography } from "@material-ui/core";
import { GeoToolTip } from "../geo-tooltip/geo-tooltip";
import { VisualizationLoadingProgress } from "../loading-progress/visualization-loading-progress";

const {
  extent,
  geoPath,
  scaleLinear,
  interpolateMagma,
  select,
  drag,
  geoOrthographic,
  geoGraticule,
  scaleSequential,
  geoEquirectangular,
  axisBottom,
} = d3;

function createGlobe(
  svg,
  width,
  height,
  geoJson,
  isDarkTheme,
  setSelectedCountryHandler,
  resetSelectedCountryHandler,
  unitScale
) {
  const λ = scaleLinear().domain([0, width]).range([-180, 180]);
  const φ = scaleLinear().domain([0, height]).range([90, -90]);

  const projection = geoOrthographic()
    .fitSize([width, height], geoJson)
    .rotate([0, 0, 0]);

  const path = geoPath().projection(projection);
  const graticule = geoGraticule();

  svg.append("path").datum(graticule).attr("d", path);

  svg
    .selectAll("path")
    .data(geoJson.features)
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
    .attr("d", (feature) => path(feature));

  const dragged = drag()
    .subject(function () {
      const r = projection.rotate();
      return {
        x: λ.invert(r[0]),
        y: φ.invert(r[1]),
      };
    })
    .on("drag", function (event) {
      projection.rotate([λ(event.x), φ(event.y)]);
      svg.selectAll(".country").attr("d", path);
      svg.datum(graticule).attr("d", path);
    });

  svg.call(dragged);
}

function createMap(
  svg,
  width,
  height,
  geoJson,
  isDarkTheme,
  setSelectedCountryHandler,
  resetSelectedCountryHandler,
  unitScale
) {
  const projection = geoEquirectangular().fitSize([width, height], geoJson);

  const path = geoPath().projection(projection);

  svg
    .selectAll(".country")
    .data(geoJson.features)
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
}

const width = 1280;
const height = 640;

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

    function createLegend(unitScale) {
      const legendWidth = width * 0.5;
      const legendHeight = 30;
      const colorScale = scaleSequential(interpolateMagma);
      const numCells = 100;
      const cellWidth = legendWidth / numCells;
      const axisScale = unitScale.range([0, legendWidth]);
      const legendScale = scaleLinear()
        .domain(
          extent(
            geoJsonFromSelectedStatistic.features.map(
              (item) => item.properties.value
            )
          )
        )
        .range(isDarkTheme ? [0, 1] : [1, 0]);
      const legend = svg
        .append("svg")
        .attr("id", "legend")
        .style("color", "inherit")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("x", width * 0.5 - 16)
        .attr("y", height - 20);

      for (let i = 0; i < numCells - 1; i++) {
        legend
          .append("rect")
          .attr("x", i * cellWidth + 7.5)
          .attr("width", cellWidth)
          .attr("height", 10)
          .attr("fill", colorScale(legendScale(i + cellWidth)));
      }

      const axis = axisBottom(axisScale).tickSize(0);
      legend.append("g").attr("transform", `translate(7.5,10)`).call(axis);
    }

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
      createLegend(unitScale);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoJsonFromSelectedStatistic, isDarkTheme]);

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
