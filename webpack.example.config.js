const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    shoplist: './example/shop-list.js',
    tinyreact: './tiny-react/app.js',
  },
  output: {
    path: __dirname + '/dest',
    filename: '[name].js'
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
      { test: /\.ts$/, use: 'awesome-typescript-loader' },
      { test: /\.json$/, use: 'json-loader' }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dest', 'build']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'shop list example',
      template: './example/shop-list.html',
      inject: 'body',
      chunks: ['shoplist'],
    }),
    new HtmlWebpackPlugin({
      filename: 'tinyreact.html',
      title: 'tiny react example',
      template: './tiny-react/index.html',
      inject: 'body',
      chunks: ['tinyreact'],
    }),
    new ExtractTextPlugin('css/index.css')
  ],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src/ui.framework/'),
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dest'),
    port: 9090,
  },
}
