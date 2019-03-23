const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const {appRoot} = require('./variables');

module.exports = merge(common, {
    entry: './src/index.ts',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: appRoot + '/dist'
    },
    devServer: {
        port: 4200
    }
});