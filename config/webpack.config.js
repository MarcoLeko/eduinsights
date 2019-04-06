const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const {publicDir, srcDir, distDir} = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = (env) => {

    const isProduction = env.production === true;
    const isDevelopment = env.development === true;

    process.env.NODE_ENV = isProduction ? 'production' : isDevelopment && 'development';
    process.env.BABEL_ENV = isProduction ? 'production' : isDevelopment && 'development';

    return {
        entry: {
            main: srcDir + '/index.ts'
        },
        output: {
            filename: isProduction ? '[name].bundle.[contentHash:8].js' : '[name].bundle.js',
            chunkFilename: isProduction ?'[id].vendor.bundle.[contentHash:8].js': '[id].vendor.bundle.js',
            path: distDir
        },
        mode: isProduction ? 'production' : isDevelopment && 'development',
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    parallel: true,
                    cache: true
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
            splitChunks: {
                chunks: 'all',
                name: false,
                minChunks: 2
            },
            runtimeChunk: true
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'assets/[name].[hash:8].[ext]'
                            }
                        },
                        {
                            test: /\.tsx?$/,
                            use: 'ts-loader',
                            exclude: /node_modules/
                        },
                        {
                            test: /\.(sa|sc|c)ss$/,
                            use: [
                                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                                'css-loader',
                                'sass-loader'
                            ]
                        },
                        {
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            use: [
                                {
                                    loader: 'file-loader',
                                    options: {
                                        name: 'assets/[name].[hash:8].[ext]'
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]

        },
        plugins: [
            new CopyWebpackPlugin([{ from: 'public' }]),
            isDevelopment && new webpack.HotModuleReplacementPlugin(),
            isProduction && new MiniCssExtractPlugin({
                filename: 'styles/[name].[contenthash:8].css',
                chunkFilename: 'styles/[name].[contenthash:8].chunk.css',
            }),
            new ManifestPlugin({
                fileName: 'asset-manifest.json'
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin(
                Object.assign({}, {
                        inject: true,
                        template: publicDir + '/index.html'
                    },
                    isProduction ? {
                        minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeRedundantAttributes: true,
                            useShortDoctype: true,
                            removeEmptyAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            keepClosingSlash: true,
                            minifyJS: true,
                            minifyCSS: true,
                            minifyURLs: true,
                        },
                    } : undefined)),
        ].filter(Boolean),
        devServer: {
            port: 4200,
            publicPath: '/',
            contentBase: publicDir,
            watchContentBase: true,
            hot: true,
            compress: true
        }
    };
};