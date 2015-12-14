var path = require('path')
var webpack = require('webpack')
var IsoToolsPlugin = require('webpack-isomorphic-tools/plugin')
var isoConfig = require('./webpack-isomorphic-config')
var isoToolsPlugin = new IsoToolsPlugin(isoConfig).development()

var PORT = process.env.PORT || 3000
module.exports = {
  port: PORT,
  devtool: 'eval-source-map',
  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr`,
    './app/main.js'
  ],
  output: {
    path: '/',
    filename: 'main.js',
    publicPath: `http://localhost:${PORT}/static/`
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVTOOLS__: true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    isoToolsPlugin
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        stage: 0,
        plugins: ['react-transform'],
        extra: {
          'react-transform': {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }
        }
      }
    }, {
      test: /\.(css|less|scss)$/,
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
