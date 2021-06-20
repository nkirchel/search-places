const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv').config({
    path: path.join(__dirname, '.env')
});;

module.exports = {
    entry: './src/index.js',
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public/js'),
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://localhost:3000'
    },
    mode: "production",
    entry: path.resolve(__dirname, "src/index.js"),
    module: {
        rules: [{
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/react"] //Preset used for env setup
                }
            },
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
        }, {
            test: /\.(css|less)$/i,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(png|jpe?g|svg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(Dotenv.parsed)
        }),
        new HtmlWebpackPlugin({
            title: 'Search Locations',
            template: path.resolve('public/index.html')
        }),
        new CopyWebpackPlugin([{
                from: 'public/images',
                to: 'images'
            },
            {
                from: 'public/manifest',
                to: 'manifest'
            }
        ]),
        new webpack.HotModuleReplacementPlugin()
    ]
};