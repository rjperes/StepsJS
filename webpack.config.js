var package = require('./package.json');

var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist/lib'),
        filename: 'index.js',
        library: package.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }
};