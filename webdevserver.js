var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.config')
var bodyParser = require('body-parser')
var lorem = require('lorem-ipsum')

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

app.use('/img', express.static(path.join(__dirname, 'app', 'img')))
app.use('/fonts', express.static(path.join(__dirname, 'app', 'fonts')))

app.post('/api/v1/login', function (req, res) {
  if (req.body.username) {
    res.send({
      id: 12345,
      username: req.body.username,
      image_url: '/img/chris.jpg'
    })
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
    works.push({
      id: i,
      title: `title${i}`,
      username: 'username',
      cloudinary_image_url: 'gqutbssg0ck5zcuqrym7',
      image_url: 'http://res.cloudinary.com/twentyfive/image/upload/v1449806840/gqutbssg0ck5zcuqrym7.jpg',
      slug: `some-special-slug${i}`,
      description: lorem({count: 1, units: 'paragraphs'})
    })
  }
  res.send(works)
})

app.get('/api/v1/artwork/:slug', function (req, res) {
  res.send({
    id: 1,
    title: `title$1`,
    username: 'username',
    cloudinary_image_url: 'gqutbssg0ck5zcuqrym7',
    image_url: 'http://res.cloudinary.com/twentyfive/image/upload/v1449806840/gqutbssg0ck5zcuqrym7.jpg',
    slug: req.params.slug,
    description: lorem({count: 1, units: 'paragraphs'})
  })
})

app.post('/api/v1/users/current', function (req, res) {
  res.send({
    id: 12345,
    username: req.body.username,
    email: 'test@test.com',
    image_url: '/img/chris.jpg'
  })
})

app.get('/api/v1/users/:id', function (req, res) {
  res.send({
    id: 12345,
    username: req.params.id,
    email: 'test@test.com',
    image_url: '/img/chris.jpg'
  })
})

app.post('/api/v1/users', function (req, res) {
  res.send(req.body)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, 'localhost', function (err) {
  if (err) { return console.log(err) }
  console.log('Assets listening at http://localhost:3000')
})
