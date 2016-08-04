var ora = require('ora');
var webpack = require('webpack');
var conf = require('./webpack.conf.pro');

var spinner = ora('正在针对"package.json"文件下的"main"配置进行构建...');
console.log();
spinner.start();

webpack(conf, function(err, stats) {
    spinner.stop();

    if (err) {
        throw err;
    }

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
});
