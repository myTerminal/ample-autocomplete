/* global require module __dirname */

const libraryFileName = 'ample-autocomplete';
const libraryName = 'ampleAutocomplete';

const sourceDir = 'src';
const outputDir = 'build';

const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const clean = new CleanWebpackPlugin([outputDir]);

const extractCSS = new ExtractTextPlugin('styles/' + libraryFileName + '.css');

module.exports = {
    mode: 'development',
    entry: {
        library: './' + sourceDir + '/scripts/' + libraryFileName + '.jsx'
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(jsx|js)$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "jsxhint-loader"
                    }
                ]
            },
            {
                test: /\.(jsx|js)$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "jscs-loader"
                    }
                ]
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'babel-preset-env',
                            'babel-preset-react'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ options: {} }),
        clean,
        extractCSS
    ],
    output: {
        filename: 'scripts/' + libraryFileName + '.js',
        path: path.resolve(__dirname, outputDir),
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React'
        }
    }
};
