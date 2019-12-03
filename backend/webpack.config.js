const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const terserOptions = {
    parallel: true,
    cache: true,
    sourceMap: true,
    terserOptions: {
        compress: {
            dead_code: true
        },
        output: {
            comments: false
        },
    },
};

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'backend/app.js',
    },
    resolve: {
        // Add `.ts` as a resolvable extension.
        extensions: [".ts", ".js"]
    },
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            // all files with a `.ts` extension will be handled by `ts-loader`
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(
                terserOptions
            )],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: '../web/build', to: 'web/build' }
        ]),
    ]
};
