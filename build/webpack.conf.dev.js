var path = require('path');
var baseConf = require('./webpack.conf.base');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var projectRoot = path.resolve(__dirname, '../');

baseConf.module.preLoaders = [{
    test: /\.(vue|jsx?)$/,
    loader: 'eslint',
    include: projectRoot,
    exclude: /node_modules/
}];

module.exports = merge(baseConf, {
    // 自动监听，重新打包
    watch: true,
    cache: true,
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
});
