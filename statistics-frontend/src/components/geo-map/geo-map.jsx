import React, { useRef, useEffect, useState } from "react";
import {
  select,
  geoPath,
  scaleSequential,
  interpolateBlues,
  geoEquirectangular,
  scaleLinear,
  extent,
} from "d3";
import "./geo-map.scss";
import { useStatisticData } from "../../hooks/use-statistic-data";
import useResizeObserver from "../../hooks/useResizeObserver";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import GeoLegend from "../geo-legend/geo-legend";

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

    const projection = geoEquirectangular().fitSize(
      [width, height],
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
      .style("stroke", "black")
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
  }, [selectedCountry, dimensions, geoJsonFromSelectedStatistic, dispatch]);

  return (
    <div className="svg-wrapper" ref={wrapperRef}>
      <VisualizationLoadingProgress show={showLoadingScreen} />
      <svg className="svg-map" ref={svgRef} />
      {Boolean(
        svgRef.current &&
          geoJsonFromSelectedStatistic.features.length &&
          dimensions?.width
      ) && (
        <GeoLegend
          geoJsonFromSelectedStatistic={geoJsonFromSelectedStatistic}
          svgRef={svgRef}
          width={dimensions.width}
        />
      )}
    </div>
  );
}

export default GeoChart;
