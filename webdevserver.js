var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.config')

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, // only display warnings and errors to console
  stats: {
    colors: true
  },
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, 'localhost', function (err) {
  if (err) { return console.log(err) }
  console.log('Assets listening at http://localhost:3000')
})
