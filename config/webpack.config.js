const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const isDev = process.env.NODE_ENV === 'development';

const getBabelOptions = (presets) => {
    const options = {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: '> 0.25%, not dead',
                },
            ],
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
        ],
    };

    presets && options.presets.push(...presets);

    return options;
};

const common = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        main: ['@babel/polyfill', './client/App.tsx'],
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: getBabelOptions(),
                },
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: getBabelOptions(['@babel/preset-react']),
                },
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: getBabelOptions(['@babel/preset-react', '@babel/preset-typescript']),
                },
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'client/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};

module.exports = merge(common, isDev ? devConfig : prodConfig);
