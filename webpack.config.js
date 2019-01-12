
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HelloWorldPlugin = require('./plugins/HelloWorldPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './test/button/button.js',
  output: {
    path: __dirname + '/dest',
    filename: 'button.js'
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            }
          }]
        })
      },
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.ts$/, use: 'awesome-typescript-loader' }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dest', 'build']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'button test',
      template: './test/button/index.html',
      inject: 'body',
    }),
    new HelloWorldPlugin({options: true}),
    new ExtractTextPlugin('css/index.css')
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dest'),
    port: 9090,
  },
}
