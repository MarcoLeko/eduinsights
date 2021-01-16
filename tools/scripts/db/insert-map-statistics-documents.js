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
    collectionToBeInserted = "mapStatistics",
    changeStreamCollection = `${collectionToBeInserted}List`,
    selectedPath = path.join(__dirname, "output");

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
      { key: "text" },
      { unique: true, collation: { locale: "simple" } }
    );

    await mapStatisticsListCollection.createIndex(
      { key: "text" },
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
        .project({
          key: 1,
          description: 1,
          startYear: 1,
          amountOfCountries: 1,
          endYear: 1,
          evaluationType: 1,
        })
        .toArray();

      await mapStatisticsListCollection
        .updateOne(
          { key: "list" },
          { $set: { statistics: keys } },
          { upsert: true }
        )
        .catch((e) =>
          log(chalk.bold.red("Ooops! Something wrong happened " + e))
        );
    });

    for await (const file of fs.readdirSync(selectedPath)) {
      const filePath = path.join(selectedPath, file);
      const document = JSON.parse(fs.readFileSync(filePath, "utf8"));
      await mapStatisticsCollection
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

    // cleanup after 5secs
    setTimeout(async () => {
      await cleanupConnections(changeStream, mongoClient);
    }, 25000);
  } catch (e) {
    log(chalk.bold.red("Oooops! An error occured " + e));
    await cleanupConnections(changeStream, mongoClient);
    process.exit(1);
  }
})();
