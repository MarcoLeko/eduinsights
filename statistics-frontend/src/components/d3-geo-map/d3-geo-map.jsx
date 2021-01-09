import React, { useRef, useEffect, useState } from "react";
import {
  select,
  geoPath,
  geoMercator,
  min,
  max,
  scaleLinear,
  schemeBlues,
} from "d3";
import "./d3-geo-map.scss";
import { useStatisticData } from "../../hooks/use-statistic-data";

const height = 800;
const width = 800;

function GeoChart() {
  const svgRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { geoJsonFromSelectedStatistic } = useStatisticData();

  useEffect(() => {
    const svg = select(svgRef.current);

    const minProp = min(
      geoJsonFromSelectedStatistic.features,
      (feature) => feature.properties.value
    );
    const maxProp = max(
      geoJsonFromSelectedStatistic.features,
      (feature) => feature.properties.value
    );
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(schemeBlues[7]);

    const projection = geoMercator()
      .scale(200)
      .center([0, 20])
      .translate([width / 2, height / 2]);

    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);

    // render each country
    svg
      .selectAll(".country")
      .data(geoJsonFromSelectedStatistic.features)
      .join("path")
      .on("click", (e, feature) => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .on("mouseover", (e, feature) => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .on("mouseout", () => {
        setSelectedCountry(null);
      })
      .transition()
      .duration(200)
      .attr("class", "country")
      .attr("fill", (feature) => colorScale(feature.properties.value || 0))
      .attr("d", (feature) => pathGenerator(feature));

    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        (feature) =>
          feature &&
          feature.properties?.name +
            ": " +
            feature.properties?.value.toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25);
  }, [selectedCountry, geoJsonFromSelectedStatistic]);

  return (
    <div className="svg-wrapper">
      <svg className="svg-map" ref={svgRef} width={width} height={height} />
    </div>
  );
}

export default GeoChart;
