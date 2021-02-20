import * as d3 from "d3";

const {
  extent,
  geoPath,
  scaleLinear,
  interpolateMagma,
  drag,
  geoOrthographic,
  geoGraticule,
  scaleSequential,
  geoEquirectangular,
  axisBottom,
} = d3;

const width = 1280;
const height = 640;

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
  const graticule = geoGraticule().step([5, 5]);

  svg
    .append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path)
    .attr("fill", "none")
    .style("stroke-width", 0.5)
    .style("stroke", isDarkTheme ? "#fff" : "#8a8a8a")
    .style("opacity", 0.75);

  svg
    .selectAll("path")
    .data(geoJson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke-width", 0.5)
    .style("stroke", isDarkTheme ? "#fff" : "#303030")
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
      svg.selectAll("path.graticule").datum(graticule).attr("d", path);
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
    .style("stroke-width", 0.5)
    .style("stroke", isDarkTheme ? "#fff" : "#303030")
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

function createLegend(
  svg,
  unitScale,
  isDarkTheme,
  geoJsonFromSelectedStatistic
) {
  const legendWidth = width * 0.5;
  const legendHeight = 40;
  const colorScale = scaleSequential(interpolateMagma);
  const numCells = 100;
  const cellWidth = legendWidth / numCells;
  const axisScale = unitScale.range([0, legendWidth]);
  const legendScale = scaleLinear()
    .domain(
      extent(
        geoJsonFromSelectedStatistic.features.map(
          (item) => Number(item.properties.value) || 0
        )
      )
    )
    .range(isDarkTheme ? [0, 1] : [1, 0]);
  const legend = svg
    .append("svg")
    .attr("id", "legend")
    .style("color", isDarkTheme ? "#fff" : "#303030")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .attr("x", width * 0.5 - 32)
    .attr("y", height - 40);

  for (let i = 0; i < numCells - 1; i++) {
    legend
      .append("rect")
      .attr("x", i * cellWidth + 12.5)
      .attr("width", cellWidth)
      .attr("height", legendHeight - 20)
      .attr("fill", colorScale(legendScale(i + cellWidth)));
  }

  const axis = axisBottom(axisScale).tickSize(4).tickPadding(4);
  legend.append("g").attr("transform", `translate(12.5,20)`).call(axis);
}

export { width, height, createGlobe, createLegend, createMap };
