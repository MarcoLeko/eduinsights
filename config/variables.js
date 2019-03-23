const path = require('path');

const appRoot = process.cwd();
const appSrc =  path.resolve(path.relative(appRoot, 'src'));

module.exports = {appRoot, appSrc};