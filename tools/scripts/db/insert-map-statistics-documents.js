"use strict";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const MongoClient = require("mongodb").MongoClient;

(async function () {
  const username = process.env.DB_USERNAME,
    password = process.env.DB_PASSWORD,
    args = process.argv.slice(3),
    log = console.log,
    uri = `mongodb+srv://${username}:${password}@eduinsights.vj2pu.mongodb.net?retryWrites=true/`,
    mongoClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  let database, document, collection, connectionManager;

  if (args.length === 2) {
    database = args[0];
    collection = args[1];

    log(
      chalk.blue(
        `Writing to database: ${chalk.yellow.bold.underline(
          database
        )} and to collection: ${chalk.yellow.bold.underline(collection)} `
      )
    );

    document = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/output/output.json"), "utf8")
    );

    log("Will parse to database...");

    connectionManager = await mongoClient.connect();

    await connectionManager
      .db(database)
      .collection(collection)
      .createIndex({ type: "text" }, { unique: true });

    const mapStatisticsCollection = connectionManager
      .db(database)
      .collection(collection);

    const changeStream = mapStatisticsCollection.watch();

    changeStream.on("change", (event) => {
      log(event);
    });

    log("next is", next);
    connectionManager
      .db(database)
      .collection(collection)
      .updateOne({ type: document.type }, { $set: document }, { upsert: true })
      .then(() => log(chalk.blue.bold(`Successfully transferred document.`)))
      .catch((e) => log(chalk.bold.red("Ooops! Something wrong happened " + e)))
      .then(() => mongoClient.close());
  } else {
    log(
      chalk.bold.red(
        "A database and a collection has to be specified!\n 1. Database\n 2. Collection"
      )
    );
    process.exit(1);
  }
})();
