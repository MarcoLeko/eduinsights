import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./geo-globe.scss";
import useResizeObserver from "../../hooks/useResizeObserver";
import { VisualizationLoadingProgress } from "../shared/visualization-loading-progress";
import { setVisualizationLoaded } from "../../context/ui-actions";
import { useUiContext } from "../../hooks/use-ui-context";
import { StatisticsMarkup } from "../SEO/statistics-markup";
import { Typography } from "@material-ui/core";
import { useD3Utils } from "../../hooks/use-d3-utils";
import { MapToolTip } from "../../map-tooltip/map-tooltip";

const {
  extent,
  geoPath,
  scaleLinear,
  interpolateMagma,
  select,
  drag,
  geoOrthographic,
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
  const {
    getVisualizationHeight,
    setSelectedCountryHandler,
    resetSelectedCountryHandler,
    toolTipPos,
    selectedCountry,
  } = useD3Utils(wrapperRef);
  const dimensions = useResizeObserver(wrapperRef);
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    if (geoJsonFromSelectedStatistic.features.length) {
      dispatch(setVisualizationLoaded(true));
    }

    const svg = select(svgRef.current);
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

    svg.append("path").datum(graticule).attr("d", path);

    svg
      .selectAll("path")
      .data(geoJsonFromSelectedStatistic.features)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions, geoJsonFromSelectedStatistic, dispatch, isDarkTheme]);

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

export default GeoGlobe;
