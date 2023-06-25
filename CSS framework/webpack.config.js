const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "[name]-bundle.js",
    },
    mode: 'development', // 'development' 'production' 
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [".tsx", ".ts", ".js", ".css"],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                // exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin(
            {
                patterns: [
                    { from: './src/pages', to: './' },
                    { from: './src/styles', to: './styles' },
                    { from: './src/assets', to: './assets' }
                ]
            }),
        new MiniCssExtractPlugin(),
    ],
};