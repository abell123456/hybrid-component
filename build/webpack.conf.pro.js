var baseConf = require('./webpack.conf.base');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isWatch = process.argv.slice(2)[1] === 'watch' || process.argv.slice(2)[0] === 'watch';

module.exports = merge(baseConf, {
    watch: isWatch,

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
});
