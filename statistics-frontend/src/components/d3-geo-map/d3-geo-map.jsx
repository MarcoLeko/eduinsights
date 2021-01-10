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

function getWidth(width) {
  return width > 1280 ? 1280 : width;
}

function GeoChart() {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { geoJsonFromSelectedStatistic } = useStatisticData();

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const colorScale = scaleThreshold()
      .domain(
        geoJsonFromSelectedStatistic.evaluation.map((item) => item.value[1])
      )
      .range(schemeBlues[7]);

    const projection = geoEquirectangular()
      .scale((getWidth(width) / 640) * 100)
      .center([0, 75])
      .translate([getWidth(width) / 2, height / 4]);

    const pathGenerator = geoPath().projection(projection);

    const highlight = function (e, feature) {
      setSelectedCountry(selectedCountry === feature ? null : feature);
    };

    const resetHighlight = function () {
      setSelectedCountry(null);
      svg.selectAll(".country").style("opacity", 0.8);
    };

    // render each country
    svg
      .selectAll(".country")
      .data(geoJsonFromSelectedStatistic.features)
      .join("path")
      .on("click", highlight)
      .on("mouseover", highlight)
      .on("mouseout", resetHighlight)
      .attr("class", "country")
      .style("stroke-width", 1)
      .style("stroke", "black")
      .transition()
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
      <svg className="svg-map" ref={svgRef} />
    </div>
  );
}

export default GeoChart;
