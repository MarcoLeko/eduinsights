"use strict";

const chalk = require("chalk");
const MongoClient = require("mongodb").MongoClient;
const {
  writeToFileSync,
  appendFileToTempDirPath,
  fetchUnescoHierarchicalCodeList,
} = require("./map-statistics-generator.service");

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
  const collectionToBeInserted = "unescoHierarchicalCodeList";

  let connectionManager;

  const unescoHierarchicalCodeListJson = await fetchUnescoHierarchicalCodeList();
  writeToFileSync(
    unescoHierarchicalCodeListJson,
    appendFileToTempDirPath("unesco-hierarchical-code-list.json")
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

    const codeListCollection = connectionManager
      .db(database)
      .collection(collectionToBeInserted);

    // ensure indexes for collections
    await codeListCollection.createIndex(
      { key: "text" },
      { unique: true, collation: { locale: "simple" } }
    );

    const document = {
      ...unescoHierarchicalCodeListJson,
      key: "unescoHierarchicalCodeList",
    };

    await codeListCollection
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
