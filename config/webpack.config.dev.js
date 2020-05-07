module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: 'dist',
        overlay: true,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
};
