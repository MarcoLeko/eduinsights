import { memo, useEffect } from "react";
import {
  axisBottom,
  extent,
  scaleLinear,
  scaleSequential,
  interpolateBlues,
  select,
} from "d3";
import { useMediaQuery } from "@material-ui/core";

/**
 *
 * @param svgRef
 * @param geoJsonFromSelectedStatistic
 * @param width
 * @returns {null}
 */

//TODO: on small viewport place legend to the bottom x-axis - on large on the left on the y-axis also append it to the container not svg
function GeoLegend({ svgRef, geoJsonFromSelectedStatistic, width }) {
  const media = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const svg = select(svgRef.current);
    const colorScale = scaleSequential(interpolateBlues);

    const legendWidth = 0.5 * width;
    const legendHeight = 30;
    const numCells = 500;
    const cellWidth = legendWidth / numCells;
    const legendUnitScale = scaleLinear()
      .domain([0, legendWidth])
      .range([0, 1]);
    const axisScale = scaleLinear()
      .domain(
        extent(geoJsonFromSelectedStatistic.features, (d) => d.properties.value)
      )
      .range([0, legendWidth]);
    const legend = svg
      .append("svg")
      .attr("id", "legend")
      .style("color", media ? "#fff" : "inherit")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("x", legendWidth)
      .attr("y", 20);

    for (let i = 0; i < numCells; i++) {
      legend
        .append("rect")
        .attr("x", i * cellWidth)
        .attr("width", cellWidth)
        .attr("height", legendHeight - 20)
        .attr("fill", colorScale(legendUnitScale(i * cellWidth)));
    }

    const axis = axisBottom(axisScale).tickSize(0);
    legend.append("g").attr("transform", `translate(-3,10)`).call(axis);
    // eslint-disable-next-line
  }, [geoJsonFromSelectedStatistic, media]);

  return null;
}

export default memo(GeoLegend);
