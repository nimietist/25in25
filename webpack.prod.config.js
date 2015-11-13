var path = require('path')
var webpack = require('webpack')
var IsoToolsPlugin = require('webpack-isomorphic-tools/plugin')
var isoConfig = require('./webpack-isomorphic-config')
var isoToolsPlugin = new IsoToolsPlugin(isoConfig).development()

module.exports = {
  port: 3000,
  context: path.resolve('.'),
  devtool: 'source-map',
  entry: [
    './app/main.js'
  ],
  output: {
    path: './static',
    filename: 'main.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    isoToolsPlugin
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        stage: 0
      }
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.(otf|eot|svg|ttf|woff)/,
      loader: 'url?limit=100000'
    }, {
      test: isoToolsPlugin.regular_expression('images'),
      loader: 'url?limit=100000'
    }
  ]},
  resolve: {
    root: path.resolve('.'),
    extensions: ['', '.js', '.json', '.coffee']
  }
}
