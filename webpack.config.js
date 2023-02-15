const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var WebpackObfuscator = require('webpack-obfuscator');
var ip = require('ip');

const webpack = require('webpack');

let config = {
  mode: 'development',

  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  

  module: {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
    ]
},

  plugins: [
    new CleanWebpackPlugin(),
    
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

    new CopyPlugin({
      patterns: [
        { from: 'res/', to: 'res/'}
      ],
    }),

    new webpack.ProvidePlugin({
      PIXI: 'pixi.js'
    })
  ],

  devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      host: ip.address(),
      port: 8080,
      disableHostCheck: true,
    }
}

module.exports = (env, argv) => {


  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if(argv.platform === 'mobile')
    config.devServer.host =  ip.address();

    config.node = {
        fs: 'empty',
    }

  return config;
};