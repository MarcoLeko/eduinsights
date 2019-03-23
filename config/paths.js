'use strict';

const path = require('path');
const fs = require('fs');

const rootDir = fs.realpathSync(process.cwd());
const resolveDir = relativePath => path.resolve(rootDir, relativePath);

const srcDir =  resolveDir( 'src');
const distDir =  resolveDir('dist');
const publicDir =  resolveDir('public');

module.exports = {rootDir, srcDir, distDir, publicDir};