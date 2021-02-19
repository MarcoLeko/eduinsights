"use strict";
const chalk = require("chalk");
const MongoClient = require("mongodb").MongoClient;
const {
  fetchGeoCountriesPolygons,
  writeToFileSync,
  appendFileToTempDirPath,
  fetchDataSetsCountryCodes,
} = require("./map-statistics-generator.service");
const topojson = require("topojson-server");
const topojsonSimplify = require("topojson-simplify");
const countries = require("i18n-iso-countries");

async function cleanupConnection(mongoClient) {
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

  const database = "countries";
  const collectionToBeInserted = "geoData";

  let connectionManager;

  const countriesGeoJsonResponse = await fetchGeoCountriesPolygons();
  const featuresWithISO2CountryCodes = countriesGeoJsonResponse.features.map(
    (item) => {
      return {
        type: item.type,
        geometry: item.geometry,
        properties: {
          name: item.properties.ADMIN,
          code:
            countries.alpha3ToAlpha2(item.properties.ISO_A3) ||
            item.properties.ISO_A3,
        },
      };
    }
  );

  const countriesGeoJsonWithISO2CountryCodes = {
    ...countriesGeoJsonResponse,
    features: featuresWithISO2CountryCodes,
  };

  const preSimplyfiedTopojson = topojsonSimplify.presimplify(
    topojson.topology({
      countries: countriesGeoJsonWithISO2CountryCodes,
    })
  );

  const countriesGeoJsonCompressed = topojsonSimplify.simplify(
    preSimplyfiedTopojson,
    0.25
  );

  writeToFileSync(
    countriesGeoJsonCompressed,
    appendFileToTempDirPath("countries.json")
  );

  log(
    chalk.blue(
      `Writing to database: ${chalk.yellow.bold.underline(
        database
      )} and to collection: ${chalk.yellow.bold.underline(
        collectionToBeInserted
      )} `
    )
  );

  try {
    log("Will parse to database...");

    connectionManager = await mongoClient.connect();

    const geoDataCollection = connectionManager
      .db(database)
      .collection(collectionToBeInserted);

    // ensure indexes for collections
    await geoDataCollection.createIndex(
      { key: "text" },
      { unique: true, collation: { locale: "simple" } }
    );

    const document = { ...countriesGeoJsonCompressed, key: "geoJson" };

    await geoDataCollection
      .updateOne({ key: document.key }, { $set: document }, { upsert: true })
      .then(() => log(`Successfully transferred document`))
      .catch((e) =>
        log(chalk.bold.red("Ooops! Something wrong happened " + e))
      );

    await cleanupConnection(mongoClient);
  } catch (e) {
    log(chalk.bold.red("Oooops! An error occured " + e));
    await cleanupConnection(mongoClient);
    process.exit(1);
  }
})();
