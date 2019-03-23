const merge = require('webpack-merge');
const common = require('./webpack.common');
const {appSrc, appRoot} = require('./variables');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    entry: {
        main: appSrc + '/index.ts'
    },
    devtool: 'source-map',
    mode: 'production',
    output: {
        filename: '[name].bundle.[contentHash:8].js',
        path: appRoot + '/dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: appSrc + '/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});