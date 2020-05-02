const path = require('path');

module.exports = {
    entry: {
        main: './src/client/main.js',
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    mode: 'development',
    devServer: {
        contentBase: 'dist'
    }
};