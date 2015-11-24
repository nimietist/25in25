var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.config')
var bodyParser = require('body-parser')

var app = express()
var compiler = webpack(config)

app.use(bodyParser.json())

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, // only display warnings and errors to console
  stats: {
    colors: true
  },
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.post('/api/v1/login', function (req, res) {
  if (req.body.username) {
    res.send({username: req.body.username})
  } else {
    res.status(401).send('Unauthorized')
  }
})

app.get('/api/v1/logout', function (req, res) {
  res.send({success: true})
})

app.get('/api/v1/artworks', function (req, res) {
  const works = []
  for (var i = 0; i < 50; i++) {
    works.push({ title: `title${i}`, username: 'username' })
  }
  res.send(works)
})

app.post('/api/v1/user', function (req, res) {
  res.send(req.body)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, 'localhost', function (err) {
  if (err) { return console.log(err) }
  console.log('Assets listening at http://localhost:3000')
})
