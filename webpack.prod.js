const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const common = require('./webpack.common.js');
const path = require('path')
const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
module.exports = merge(common, {
    devtool: 'sourceMap',
    output:{
       filename: 'javascripts/[name].[hash].js', 
       path: BUILD_PATH,
       publicPath:'',
    },
    plugins: [
        new BabiliPlugin(),
    ]
});