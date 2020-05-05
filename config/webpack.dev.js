const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        main: ['@babel/polyfill', './client/main.js'],
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    mode: 'development',
    devServer: {
        contentBase: 'dist',
        overlay: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                        ]
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]',
                        },
                    }
                ]
            }
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'client/index.html',
        }),
        new CleanWebpackPlugin(),
    ]
};