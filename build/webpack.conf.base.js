var path = require('path');
var fs = require('fs');

var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');
var package = require(path.join(projectRoot, 'package.json'));
var projectName = package.name;

var compiledFileName = 'index';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var compileIndex = process.argv.slice(2);

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = false;
var entry = getEntry();

module.exports = {
    entry: entry,
    output: {
        // 打包后存放的目录路径
        path: './',
        // 公共目录
        publicPath: '../',
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    resolve: {
        root: [projectRoot, path.resolve(__dirname, '../..')],
        extensions: ['', '.js', '.jsx', '.vue', '.json', '.scss', 'css'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'jquery': path.resolve(__dirname, '../node_modules/@alife/alpha-jquery/jquery'),
            'reactComponents': path.resolve(__dirname, '../pc/components-react'),
            'es5-fix': path.resolve(__dirname, '../pc/common/js/es5-fix'),
            'Ajax': path.resolve(__dirname, '../pc/common/js/eh-ajax'),
            'pc-common': path.resolve(__dirname, '../pc/common/js'),
            'node_modules': path.resolve(__dirname, '../node_modules'),
            'handlebars': path.resolve(__dirname, '../pc/common/js/helpers')
        },
        modulesDirectories: ['../node_modules', '../node_modules/@alife/']
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.tpl$/,
            loader: 'handlebars-template'
        }, {
            test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 1000000,
                name: '[name]'
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css!less')
        }, {
            test: /\.s(a|c)ss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }, {
            test: /\.styl(us)?$/,
            loader: ExtractTextPlugin.extract('css!stylus')
        }]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    autoprefixer: {
        browsers: ['last 2 versions']
    },
    babel: {
        cacheDirectory: false,
        presets: [
            "es2015", "react", "stage-2"
        ],
        plugins: [
            '@alipay/babel-plugin-antm',
            'transform-class-properties',
            'transform-es2015-arrow-functions',
            'transform-es2015-block-scoping',
            'transform-es2015-object-super',
            'jsx-control-statements'
        ]
    },
    devtool: SOURCE_MAP ? '#source-map' : false,
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css'])),
            less: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'less'])),
            sass: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass'])),
            scss: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass'])),
            stylus: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'stylus'])),
            styl: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'stylus']))
        }
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: "empty"
    }
};

function getEntry() {
    var main = package.main || [];
    // 前面是打包后的文件的名字，后面是要打包文件的路径
    var entry = {};

    if (compileIndex !== undefined && compileIndex.length && compileIndex[0] !== 'watch') {
        var ary = [];

        compileIndex.forEach(function(seled) {
            main[seled] && ary.push(main[seled]);
        });

        main = ary;
    }

    main.forEach(function(item, index) {
        var extraName = path.extname(item);

        if (extraName === '.js' || extraName === '.jsx' || extraName === '.vue') {
            var pathDir = getPathDir(item);

            entry['./' + pathDir] = item;
        }
    });

    console.log(entry);

    return entry;
}

// 去掉文件路径后缀名的辅助方法
function getPathDir(aPath, extraName) {
    return path.join(path.dirname(aPath), compiledFileName);
}

function generateExtractLoaders(loaders) {
    return loaders.map(function(loader) {
        return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
    }).join('!')
}
