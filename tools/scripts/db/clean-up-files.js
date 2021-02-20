"use strict";

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

(function () {
  const outputPath = path.join(__dirname, "output"),
    tempPath = path.join(__dirname, "temp"),
    log = console.log;

  // Remove folder synchronously and recursive
  // https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
  function rmRecursive(selectedPath) {
    if (fs.existsSync(selectedPath)) {
      fs.readdirSync(selectedPath).forEach((file) => {
        const currPath = path.join(selectedPath, file);
        if (fs.lstatSync(currPath).isDirectory()) {
          // recurse
          rmRecursive(currPath);
        } else {
          // delete file
          fs.unlinkSync(currPath);
        }
      });
      fs.rmdirSync(selectedPath);
    }
  }

  rmRecursive(outputPath);
  rmRecursive(tempPath);

  log(chalk.green.bold("Successfully removed temp and output directories."));
})();
