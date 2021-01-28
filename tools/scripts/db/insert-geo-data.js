"use strict";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const MongoClient = require("mongodb").MongoClient;

async function cleanupConnection(mongoClient) {
  await mongoClient.close();
}

(async function () {
  const username = process.env.DB_USERNAME,
    password = process.env.DB_PASSWORD,
    log = console.log,
    uri = `mongodb+srv://${username}:${password}@eduinsights.vj2pu.mongodb.net?retryWrites=true/`,
    mongoClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  const database = "countries",
    collectionToBeInserted = "geoData",
    selectedPath = path.join(__dirname, "temp", "countries.json");

  let connectionManager;

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

    const document = JSON.parse(fs.readFileSync(selectedPath, "utf8"));
    document.key = "geoJson";

    await geoDataCollection
      .updateOne({ key: document.key }, { $set: document }, { upsert: true })
      .then(() =>
        log(
          `Successfully transferred document from path: ${chalk.blue.bold(
            selectedPath
          )}`
        )
      )
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
