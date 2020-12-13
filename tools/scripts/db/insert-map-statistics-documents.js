"use strict";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const MongoClient = require("mongodb").MongoClient;

async function cleanupConnections(changeStream, mongoClient) {
  await changeStream.close();
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

  const database = "statistics",
    collectionToBeInserted = "mapstatistics",
    changeStreamCollection = collectionToBeInserted + "list",
    document = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/output/output.json"), "utf8")
    );

  let connectionManager, changeStream;

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

    const mapStatisticsCollection = connectionManager
      .db(database)
      .collection(collectionToBeInserted);

    const mapStatisticsListCollection = connectionManager
      .db(database)
      .collection(changeStreamCollection);

    // ensure indexes for collections
    await mapStatisticsCollection.createIndex(
      { type: "text" },
      { unique: true }
    );

    await mapStatisticsListCollection.createIndex(
      { type: "text" },
      { unique: true }
    );

    changeStream = mapStatisticsCollection.watch();
    log("Will listen to collection changes...");

    changeStream.on("change", async () => {
      log(
        `${chalk.red.bold(`!!!`)}Document changes detected${chalk.red.bold(
          `!!!`
        )}`
      );
      const keys = await mapStatisticsCollection
        .find({})
        .project({ _id: 0, features: 0 })
        .toArray();

      await mapStatisticsListCollection
        .updateOne(
          { type: "list" },
          { $set: { statistics: keys.flatMap((obj) => obj.type) } },
          { upsert: true }
        )
        .catch((e) =>
          log(chalk.bold.red("Ooops! Something wrong happened " + e))
        );

      await cleanupConnections();
    });

    await mapStatisticsCollection
      .updateOne({ type: document.type }, { $set: document }, { upsert: true })
      .then(() => log(chalk.blue.bold(`Successfully transferred document.`)))
      .catch((e) =>
        log(chalk.bold.red("Ooops! Something wrong happened " + e))
      );

    // cleanup after 5secs
    setTimeout(async () => await cleanupConnections(), 5000);
  } catch (e) {
    log(chalk.bold.red("Oooops! An error occured " + e));
    await cleanupConnections();
    process.exit(1);
  }
})();
