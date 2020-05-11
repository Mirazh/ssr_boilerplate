const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const getPlugins = () => {
    const isStats = process.env.IS_STATS === 'true';
    const plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
    ];

    if (isStats) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
};

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: getPlugins(),
};
