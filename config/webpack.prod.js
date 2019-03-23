const merge = require('webpack-merge');
const common = require('./webpack.common');
const {srcDir, rootDir} = require('./paths');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    entry: {
        main: srcDir + '/index.ts'
    },
    devtool: 'source-map',
    mode: 'production',
    output: {
        filename: '[name].bundle.[contentHash:8].js',
        path: rootDir + '/dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});