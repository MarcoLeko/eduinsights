const merge = require('webpack-merge');
const common = require('./webpack.common');
const { srcDir, publicDir } = require('./paths');

module.exports = merge(common, {
    entry: srcDir + '/index.ts',
    devtool: 'eval-source-map',
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        port: 4200,
        publicPath: '/',
        contentBase: publicDir,
        watchContentBase: true,
        hot: true,
        compress: true
    }
});