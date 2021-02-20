"use strict";

const chalk = require("chalk");
const {
  fetchUnescoStatisticWithUrl,
  writeToFileSync,
  matchUnescoRegionsWithGeoJson,
  matchUnescoCountriesWithGeoJson,
  appendFileToOutputDirPath,
  appendFileToTempDirPath,
  getUnit,
} = require("./map-statistics-generator.service");
const mapStatistics = require("./map-statistics");
const MongoClient = require("mongodb").MongoClient;

(async function () {
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const log = console.log;
  const uri = `mongodb+srv://${username}:${password}@eduinsights.vj2pu.mongodb.net?retryWrites=true/`;
  const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const countriesDB = "countries";
  const geoDataCollection = "geoData";
  const unescoHierarchicalCodeListCollection = "unescoHierarchicalCodeList";

  try {
    const connectionManager = await mongoClient.connect();

    const countriesGeoJson = await connectionManager
      .db(countriesDB)
      .collection(geoDataCollection)
      .findOne({});

    const unescoHierarchicalCodeListJson = await connectionManager
      .db(countriesDB)
      .collection(unescoHierarchicalCodeListCollection)
      .findOne({});

    for (const [index, statistic] of mapStatistics.entries()) {
      const unescoRegions = new Map(),
        resultArrayWithCountryMatches = [];

      const unescoStatisticsJson = await fetchUnescoStatisticWithUrl(
        Object.values(mapStatistics)[index].url
      );

      writeToFileSync(
        unescoStatisticsJson,
        appendFileToTempDirPath(`${statistic.key}.json`)
      );

      const availableCountriesStatistics = unescoStatisticsJson.structure.dimensions.series.find(
        (data) => data.id === "REF_AREA"
      );

      if (
        availableCountriesStatistics.values.length !==
        Object.keys(unescoStatisticsJson.dataSets[0].series).length
      ) {
        throw new Error(
          "There are more Observations than REF_AREA countries - multi dimension observations are currently not supported"
        );
      }

      matchUnescoCountriesWithGeoJson(
        countriesGeoJson,
        availableCountriesStatistics,
        unescoStatisticsJson,
        resultArrayWithCountryMatches,
        unescoRegions
      );

      log(
        `Total hits of matching countries: ${chalk.bold.green(
          resultArrayWithCountryMatches.filter(
            (item) => item.properties.value !== null
          ).length
        )}`
      );

      log(
        `Total hits of not matching countries/areas: ${chalk.bold.red(
          unescoRegions.size
        )}`
      );

      matchUnescoRegionsWithGeoJson(
        unescoHierarchicalCodeListJson,
        availableCountriesStatistics,
        unescoStatisticsJson,
        countriesGeoJson,
        resultArrayWithCountryMatches,
        unescoRegions
      );

      const output = {
        key: statistic.key,
        description: statistic.description,
        startYear: statistic.startYear,
        endYear: statistic.endYear,
        unit: getUnit(unescoStatisticsJson),
        type: countriesGeoJson.type,
        arcs: countriesGeoJson.arcs,
        amountOfCountries: resultArrayWithCountryMatches.filter(
          (item) => item.properties.value !== null
        ).length,
        objects: {
          countries: {
            bbox: countriesGeoJson.bbox,
            type: countriesGeoJson.objects.countries.type,
            geometries: resultArrayWithCountryMatches,
          },
        },
      };

      writeToFileSync(
        output,
        appendFileToOutputDirPath(`${statistic.key}.json`)
      );

      log(
        chalk.bold(
          `Output file generated at: ${chalk.green.underline(
            appendFileToOutputDirPath(`${statistic.key}.json`)
          )} with: ${chalk.green.underline(
            resultArrayWithCountryMatches.length
          )} countries`
        )
      );
    }
    await mongoClient.close();
  } catch (e) {
    log(chalk.bold.red("Oooops! An error occured " + e));
    process.exit(1);
  }
})();
