'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const archiver = require('archiver');

(function() {
  const log = console.log,
      packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '../../..', '/backend', 'package.json'))),
      appName = `${packageJSON.name}@${packageJSON.version}`;

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // Delete previous zip files
  const zipPattern = /^.*\.(zip)$/;
  fs.readdirSync(__dirname).forEach(
      (file) => zipPattern.test(file) && fs.unlinkSync(path.join(__dirname, file))
  );

  // create a file to stream archive data to.
  log('... bundling ' + chalk.bold.blue(`${appName}`) + ' into ZIP.');
  const output = fs.createWriteStream(path.join(__dirname, `${appName}.zip`));
  const archive = archiver('zip', {zlib: {level: 9}});

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    log((`${chalk.bold.green(formatBytes(archive.pointer()))} total compressed: ${chalk.bold.blue(path.resolve(__dirname, `${appName}.zip`))}`));
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', function(err) {
    throw err;
  });
  archive.pipe(output);

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(path.join(__dirname, '../../..', '/backend', 'build'),
      false);
  archive.finalize();
  log(chalk('Successfully compressed bundle folder.'));
})();
