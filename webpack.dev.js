const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 8080,
        contentBase: path.join(__dirname, 'dist'),
    },
});
