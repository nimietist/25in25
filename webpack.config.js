var webpack = require('webpack')

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:8080',
    // 'webpack/hot/only-dev-server',
    './app/assets/js/main.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.less$/,
      loader: 'style!less'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
}
