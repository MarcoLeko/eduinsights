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

const log = console.log;

(async function () {
  try {
    ensureDirectory(createMapStatisticsTempPath(""));

    const unescoHierarchicalCodeListJson = await fetchUnescoHierarchicalCodeList();
    writeToFileSync(
      unescoHierarchicalCodeListJson,
      createMapStatisticsTempPath("unesco-hierarchical-code-list.json")
    );

    const countriesGeoJson = await fetchGeoCountriesPolygons();
    writeToFileSync(
      countriesGeoJson,
      createMapStatisticsTempPath("countries.geojson")
    );

    for (const [index, statistic] of Object.keys(mapStatistics).entries()) {
      const unescoRegions = new Map(),
        resultArrayWithCountryMatches = [];

      const unescoStatisticsJson = await fetchUnescoStatisticWithUrl(
        Object.values(mapStatistics)[index]
      );

      writeToFileSync(
        unescoStatisticsJson,
        createMapStatisticsTempPath(`${statistic}.json`)
      );

      const availableCountriesStatistics = unescoStatisticsJson.structure.dimensions.series.find(
        (data) => data.id === "REF_AREA"
      );

      matchUnescoCountriesWithGeoJsonPolygon(
        countriesGeoJson,
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
        countriesGeoJson,
        resultArrayWithCountryMatches,
        unescoRegions
      );

      const output = {
        type: statistic,
        features: resultArrayWithCountryMatches,
      };

      ensureDirectory(createMapStatisticsOutputPath(""));
      writeToFileSync(
        output,
        createMapStatisticsOutputPath(`${statistic}.json`)
      );

      log(
        chalk.bold(
          `Output file generated at: ${chalk.green.underline(
            createMapStatisticsOutputPath(`${statistic}.json`)
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
