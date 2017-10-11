const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  output:{
   filename: 'javascripts/[name].[hash].js', 
   path: BUILD_PATH,
   publicPath:'/',
},
  devServer: {
    disableHostCheck: true,
    port:7777,
    contentBase: './build',
    inline: true,
    historyApiFallback: true
  }
});