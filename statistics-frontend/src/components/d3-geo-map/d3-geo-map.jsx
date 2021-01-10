import React, { useRef, useEffect, useState } from "react";
import {
  select,
  geoPath,
  scaleThreshold,
  schemeBlues,
  geoEquirectangular,
} from "d3";
import "./d3-geo-map.scss";
import { useStatisticData } from "../../hooks/use-statistic-data";
import useResizeObserver from "../../hooks/useResizeObserver";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";

function getWidth(width) {
  return width > 1280 ? 1280 : width;
}

function GeoChart({ showLoadingScreen }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { dispatch } = useUiContext();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { geoJsonFromSelectedStatistic } = useStatisticData();

  useEffect(() => {
    const svg = select(svgRef.current);

    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const colorScale = scaleThreshold()
      .domain(
        geoJsonFromSelectedStatistic.evaluation.map((item) => item.value[0])
      )
      .range(schemeBlues[7]);

    const projection = geoEquirectangular()
      .scale((getWidth(width) / 640) * 100)
      .center([0, 75])
      .translate([getWidth(width) / 2, height / 4]);

    const pathGenerator = geoPath().projection(projection);

    const highlight = function (e, feature) {
      setSelectedCountry(selectedCountry === feature ? null : feature);
      svg
        .selectAll(".country")
        .transition()
        .duration(200)
        .style("opacity", 0.4);

      select(this).transition().duration(200).style("opacity", 1);
    };

    const resetHighlight = function () {
      setSelectedCountry(null);
      svg
        .selectAll(".country")
        .transition()
        .duration(200)
        .style("opacity", 0.8);
      select(this).transition().duration(200).style("opacity", 0.8);
    };

    // render each country
    svg
      .selectAll(".country")
      .data(geoJsonFromSelectedStatistic.features)
      .join("path")
      .style("opacity", 0.8)
      .on("mouseover", highlight)
      .on("mouseout", resetHighlight)
      .attr("class", "country")
      .style("stroke-width", 1)
      .style("stroke", "black")
      .attr("fill", (feature) => colorScale(feature.properties.value))
      .attr("d", (feature) => pathGenerator(feature));

    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        (feature) =>
          feature &&
          feature.properties?.value &&
          feature.properties?.name +
            ": " +
            feature.properties?.value.toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25);
  }, [selectedCountry, dimensions, geoJsonFromSelectedStatistic]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <VisualizationLoadingProgress show={showLoadingScreen} />
      <svg className="svg-map" ref={svgRef} />
    </div>
  );
}

export default GeoChart;
