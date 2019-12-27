'use strict';
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const archiver = require('archiver');

(function() {
  const log = console.log,
      packageJSON = JSON.parse(fs.readFileSync(
          path.join(__dirname, '../../..', '/backend', 'package.json')));

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  log('... bundling ' + chalk.bold.blue(`${packageJSON.name}@${packageJSON.version}`) + ' into ZIP.');

  // create a file to stream archive data to.
  const output = fs.createWriteStream(path.join(__dirname, `${packageJSON.name}@${packageJSON.version}.zip`));
  const archive = archiver('zip', {zlib: {level: 9}});

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    log((`${chalk.bold.green(formatBytes(archive.pointer()))} total compressed.`));
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    console.log('Data has been drained');
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
