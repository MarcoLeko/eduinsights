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
        selectedPath,
        collection;


    if (args.length === 3) {
        selectedPath = args[0];
        database = args[1];
        collection = args[2];

        log(chalk.blue(`Writing to database: ${chalk.yellow.bold.underline(database)} and to collection: ${chalk.yellow.bold.underline(collection)} `));

        const raw = fs.readFileSync(path.join(__dirname, '..', selectedPath), 'utf8');
        documents = JSON.parse(raw);

        log(`Found entities: ${chalk.bold.magenta(documents.length)}`);
        log("Will parse to database...");

        mongoClient.connect()
            .then((connManager) => connManager.db(database).collection(collection).insertMany(documents))
            .then(() => log(chalk.blue.bold(`Successfully transferred ${chalk.yellow.bold.underline(documents.length)} documents.`)))
            .catch((e) =>  log(chalk.bold.red('Ooops! Something wrong happened' + e)))
            .then(() => mongoClient.close())
    } else {
        log(chalk.bold.red('A path, database and a collection has to be specified!\n In Order:\n 1. path\n 2. Database\n 3. Collection'));
        process.exit(1);
    }
})();



