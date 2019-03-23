const merge = require('webpack-merge');
const common = require('./webpack.common');
const {appSrc, appDist} = require('./variables');

module.exports = merge(common, {
    entry: appSrc + '/index.ts',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: appDist,
        port: 4200
    }
});