'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const MongoClient = require('mongodb').MongoClient;

(function () {
    const userName = process.env.DB_USERNAME,
        password = process.env.DB_PASSWORD,
        args = process.argv.slice(3),
        log = console.log,
        uri = `mongodb+srv://${userName}:${password}@help-educate-vj2pu.mongodb.net/test?retryWrites=true&w=majority`,
        mongoClient = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    let database,
        documents,
        collection;


    if (args.length === 2) {
        database = args[0];
        collection = args[1];

        log(chalk.blue(`Writing to database: ${chalk.yellow.bold.underline(database)} and to collection: ${chalk.yellow.bold.underline(collection)} `));

        const raw = fs.readFileSync(path.join(__dirname, 'documents.json'), 'utf8');
        documents = JSON.parse(raw);

        log(`Found entities: ${chalk.bold.magenta(documents.length)}`);
        log("Will parse to database...");

        mongoClient.connect()
            .then((connManager) => connManager.db(database).collection(collection).insertMany(documents))
            .catch((e) =>  log(chalk.bold.red('Ooops! Something wrong happened' + e)))
            .then(() => mongoClient.close())
            .then(() => log(chalk.blue.bold(`Successfully transferred ${chalk.yellow.bold.underline(documents.length)} documents.`)))
    } else {
        log(chalk.bold.red('A database and a collection has to be specified!\n In Order:\n 1. Database\n 2. Collection'));
        process.exit(1);
    }
})();



