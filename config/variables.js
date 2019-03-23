const path = require('path');

const appRoot = process.cwd();
const appSrc =  path.resolve(path.relative(appRoot, 'src'));
const appDist =  path.resolve(path.relative(appRoot, 'dist'));

module.exports = {appRoot, appSrc, appDist};