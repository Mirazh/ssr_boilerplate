const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getBabelOptions = presets => {
    const options = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
        ]
    };

    presets && options.presets.push(...presets);

    return options
};


module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        main: ['@babel/polyfill', './client/App.tsx'],
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
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
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
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
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
};