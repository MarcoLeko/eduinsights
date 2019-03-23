const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {appSrc, appRoot} = require('./variables');

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
        new HtmlWebpackPlugin({
            template: appSrc + '/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});