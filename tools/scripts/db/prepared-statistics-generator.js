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
} = require("./tools.service");
const mapStatistics = require("./prepared-statistics");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

async function cleanupConnections(changeStream, mongoClient) {
  await changeStream.close();
  await mongoClient.close();
}

(async function () {
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const log = console.log;
  const uri = `mongodb+srv://${username}:${password}@eduinsights.vj2pu.mongodb.net?retryWrites=true/`;
  const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const geoDataDB = "geoData";
  const countriesCollectionName = "countries";
  const unescoHierarchicalCodeListCollectionName = "unescoHierarchicalCodeList";

  const preparedStatisticsDB = "preparedStatistics";
  const examplesCollectionName = "examples";
  const examplesCollectionListName = `${examplesCollectionName}List`;

  try {
    const connectionManager = await mongoClient.connect();
    const countriesGeoJson = await connectionManager
      .db(geoDataDB)
      .collection(countriesCollectionName)
      .findOne({});

    const unescoHierarchicalCodeListJson = await connectionManager
      .db(geoDataDB)
      .collection(unescoHierarchicalCodeListCollectionName)
      .findOne({});

    const examplesCollectionFromPreparedStatistics = connectionManager
      .db(preparedStatisticsDB)
      .collection(examplesCollectionName);

    const examplesCollectionListFromPreparedStatistics = connectionManager
      .db(preparedStatisticsDB)
      .collection(examplesCollectionListName);

    // ensure indexes for collections
    await examplesCollectionFromPreparedStatistics.createIndex(
      { key: "text" },
      { unique: true, collation: { locale: "simple" } }
    );

    await examplesCollectionListFromPreparedStatistics.createIndex(
      { key: "text" },
      { unique: true }
    );

    const changeStream = examplesCollectionFromPreparedStatistics.watch();
    log("Will listen to collection changes...");

    changeStream.on("change", async () => {
      log(
        `${chalk.red.bold(`!!!`)} Document changes detected${chalk.red.bold(
          `!!!`
        )}`
      );

      const preparedStatisticsKeys = await examplesCollectionFromPreparedStatistics
        .find({})
        .project({
          key: 1,
          description: 1,
          amountOfCountries: 1,
          unit: 1,
        })
        .toArray();

      await examplesCollectionListFromPreparedStatistics
        .updateOne(
          { key: "list" },
          { $set: { statistics: preparedStatisticsKeys } },
          { upsert: true }
        )
        .catch((e) =>
          log(chalk.bold.red("Ooops! Something wrong happened " + e))
        );
    });

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

    log("Will parse to database...");

    for await (const file of fs.readdirSync(appendFileToOutputDirPath())) {
      const filePath = appendFileToOutputDirPath(file);
      const document = JSON.parse(fs.readFileSync(filePath, "utf8"));
      await examplesCollectionFromPreparedStatistics
        .updateOne({ key: document.key }, { $set: document }, { upsert: true })
        .then(() =>
          log(
            `Successfully transferred document from path: ${chalk.blue.bold(
              filePath
            )}`
          )
        )
        .catch((e) =>
          log(chalk.bold.red("Ooops! Something wrong happened " + e))
        );
    }

    setTimeout(async () => {
      await cleanupConnections(changeStream, mongoClient);
    }, 25000);
  } catch (e) {
    log(chalk.bold.red("Oooops! An error occured " + e));
    process.exit(1);
  }
})();
