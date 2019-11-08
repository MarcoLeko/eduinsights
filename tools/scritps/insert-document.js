'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { spawn }= require('child_process');

(function () {
    const username = process.env.DB_USERNAME,
        password = process.env.DB_PASSWORD,
        args = process.argv.slice(3),
        log = console.log,
        mongoServer = "mongodb+srv://help-educate-vj2pu.mongodb.net/";

    let database,
        documents,
        collection;


    if (args.length === 2) {
        database = args[0];
        collection = args[1];
        log(chalk.blue(`Writing to database: ${chalk.yellow.bold.underline(database)} and to collection: ${chalk.yellow.bold.underline(collection)} `));

        const raw = fs.readFileSync(path.join(__dirname, 'documents.json'));
        documents = JSON.parse(raw);

        log(`Found entities: ${chalk.bold.magenta(documents.length)}`);
        log("Will parse to database.");
        const writeAction = spawn('mongo', [`\"${mongoServer}${database}\"`,` -u ${username}`, `-p ${password}`, `--eval db.${collection}.insertMany(${documents});`], {shell: true});
        writeAction.stdout.on('data', data => log(chalk.bold.magenta(`stout: ${data}`)));
        writeAction.stderr.on('data', data => log(chalk.bold.magenta(`StdErr: ${data}`)));
        writeAction.on('close', (code) => log(chalk.blue.bold(`Child process exited with code: ${code}.`)));
    } else {
        console.log(chalk.bold.red('A database and a collection has to be specified!\n In Order:\n 1. Database\n 2. Collection'));
        process.exit(1);
    }
})();



