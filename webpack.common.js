const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// Create multiple instances
const extractCSS = new ExtractTextPlugin('stylesheets/[name].[hash].css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name].[hash].css');
const extractSASS = new ExtractTextPlugin('stylesheets/[name].[hash].css');
module.exports = {
    entry: {
        app:  ["babel-polyfill", "./src/main.js"],
       //  vendor:['jquery','moment','lodash','highcharts']
       vue:['vue','vue-router','vuex'],
       iview:['iview'],
       axios:['axios'],
       highcharts:['highcharts'],
       superagent:['superagent']
    //    'xlsx':['xlsx']
    },
   
    module: {
        rules: [{
           test: /\.(less|css)$/,
           use:[ 'style-loader','css-loader','less-loader'],
         },
            {
                test: /\.scss$/,
                use: extractSASS.extract(['css-loader', 'sass-loader'])
            },
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //       fallback: 'style-loader',
            //       //resolve-url-loader may be chained before sass-loader if necessary
            //       use: ['css-loader', 'sass-loader']
            //     })
            //   },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                        })
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                   loader: 'file-loader',
                   options: {
                     name: 'img/[name].[hash:8].[ext]',
                     publicPath:'./'
                   }
                 }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                   loader: 'file-loader',
                   options: {
                     name: 'font/[name].[hash:8].[ext]',
                     publicPath:'./'
                   }
                 }
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins: [
        new CompressionWebpackPlugin({ //gzip 压缩
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css|html)$'    //压缩 js 与 css/html
            ),
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"'
            }
          }),
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: './src/template/index.html',
            minify: {
                removeComments: true,        //去注释
                collapseWhitespace: true,    //压缩空格
                removeAttributeQuotes: true  //去除属性引用
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.CommonsChunkPlugin({
           //  name: ['vendor','manifest'] // Specify the common bundle's name.
           name:['vue','iview','axios','highcharts','superagent','manifest']
        }),
       //  new webpack.HashedModuleIdsPlugin({
       //      hashFunction: 'sha256',
       //      hashDigest: 'hex',
       //      hashDigestLength: 20
       //  }),
        extractCSS,
        extractLESS,
        extractSASS
    ],
    resolve: {
       alias: {
         'vue$': 'vue/dist/vue.common.js'
       }
     }
};