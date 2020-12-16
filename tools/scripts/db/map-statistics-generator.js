"use strict";

const chalk = require("chalk");
const {
  fetchGeoCountriesPolygons,
  fetchUnescoStatisticWithUrl,
  writeToFileSync,
  fetchUnescoHierarchicalCodeList,
  ensureDirectory,
  matchUnescoRegionsWithGeoJsonPolygon,
  matchUnescoCountriesWithGeoJsonPolygon,
  createMapStatisticsOutputPath,
  createMapStatisticsTempPath,
} = require("./map-statistics-generator.service");
const mapStatistics = require("./map-statistics");
const topojson = require("topojson-server");
const topojsonSimplify = require("topojson-simplify");
const log = console.log;

(async function () {
  try {
    ensureDirectory(createMapStatisticsTempPath(""));

    const unescoHierarchicalCodeListJson = await fetchUnescoHierarchicalCodeList();
    writeToFileSync(
      unescoHierarchicalCodeListJson,
      createMapStatisticsTempPath("unesco-hierarchical-code-list.json")
    );

    const countriesGeoJsonResponse = await fetchGeoCountriesPolygons();
    const preSimplyfiedTopojson = topojsonSimplify.presimplify(
      topojson.topology({
        countries: countriesGeoJsonResponse,
      })
    );

    const countriesGeoJsonCompressed = topojsonSimplify.simplify(
      preSimplyfiedTopojson,
      0.0005
    );
    writeToFileSync(
      countriesGeoJsonCompressed,
      createMapStatisticsTempPath("countries.json")
    );

    for (const [index, statistic] of mapStatistics.entries()) {
      const unescoRegions = new Map(),
        resultArrayWithCountryMatches = [];

      const unescoStatisticsJson = await fetchUnescoStatisticWithUrl(
        Object.values(mapStatistics)[index].url
      );

      writeToFileSync(
        unescoStatisticsJson,
        createMapStatisticsTempPath(`${statistic.key}.json`)
      );

      const availableCountriesStatistics = unescoStatisticsJson.structure.dimensions.series.find(
        (data) => data.id === "REF_AREA"
      );

      matchUnescoCountriesWithGeoJsonPolygon(
        countriesGeoJsonCompressed,
        availableCountriesStatistics,
        unescoStatisticsJson,
        resultArrayWithCountryMatches,
        unescoRegions
      );

      log(
        `Total hits of matching countries: ${chalk.bold.green(
          resultArrayWithCountryMatches.length
        )}`
      );

      log(
        `Total hits of not matching countries/areas: ${chalk.bold.red(
          unescoRegions.size
        )}`
      );
      await matchUnescoRegionsWithGeoJsonPolygon(
        unescoHierarchicalCodeListJson,
        availableCountriesStatistics,
        unescoStatisticsJson,
        countriesGeoJsonCompressed,
        resultArrayWithCountryMatches,
        unescoRegions
      );

      const output = {
        key: statistic.key,
        description: statistic.description,
        startYear: statistic.startYear,
        endYear: statistic.endYear,
        type: countriesGeoJsonCompressed.type,
        arcs: countriesGeoJsonCompressed.arcs,
        objects: {
          countries: {
            bbox: countriesGeoJsonCompressed.bbox,
            type: countriesGeoJsonCompressed.objects.countries.type,
            geometries: resultArrayWithCountryMatches,
          },
        },
      };

      ensureDirectory(createMapStatisticsOutputPath(""));
      writeToFileSync(
        output,
        createMapStatisticsOutputPath(`${statistic.key}.json`)
      );

      log(
        chalk.bold(
          `Output file generated at: ${chalk.green.underline(
            createMapStatisticsOutputPath(`${statistic.key}.json`)
          )} with: ${chalk.green.underline(
            resultArrayWithCountryMatches.length
          )} countries`
        )
      );
    }
  } catch (e) {
    log(chalk.bold.red("Oooops! An error occured " + e));
    process.exit(1);
  }
})();
