"use strict";
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

(function () {
  const log = console.log,
    { name, version } = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../../..", "/statistics-backend", "package.json")
      )
    ),
    pathToConfigurationFile = path.join(
      __dirname,
      "../../..",
      ".elasticbeanstalk",
      "config.yml"
    ),
    configurationFile = fs.readFileSync(pathToConfigurationFile).toString(),
    appName = `${name}@${version}`;

  log(`Applying app version ${chalk.bold.blue(appName)} for deployment.`);

  fs.writeFileSync(
    pathToConfigurationFile,
    configurationFile.replace(
      /^.*artifact.*$/gm,
      `  artifact: ./tools/scripts/aws/${appName}.zip`
    )
  );
})();
