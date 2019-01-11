
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './test/button/button.js',
  output: {
    path: __dirname + '/dist',
    filename: 'button.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.ts$/, use: 'awesome-typescript-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'button test',
      template: './test/button/index.html',
      inject: 'body',
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9090,
  },
}
