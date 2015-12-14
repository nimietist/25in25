require('babel/register')()
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var bodyParser = require('body-parser')
var lorem = require('lorem-ipsum')

var app = express()

app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  var config = require('./webpack.dev.config')
  var compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, // only display warnings and errors to console
    stats: {
      colors: true
    },
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use('/static', express.static(path.join(__dirname, 'static')))
}

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

function colorz (i) {
  return ['red', 'yellow', 'blue'][i % 3]
}

app.get('/api/v1/artworks', function (req, res) {
  const works = []
  var count = req.query.page === '1' ? 50 : req.query.page === '2' ? 25 : 0
  for (var i = 0; i < count; i++) {
    works.push({
      id: i,
      title: `title${i}`,
      username: 'username',
      cloudinary_image_url: 'gqutbssg0ck5zcuqrym7',
      // image_url: 'http://res.cloudinary.com/twentyfive/image/upload/v1449806840/gqutbssg0ck5zcuqrym7.jpg',
      // image_url: '/img/chris.jpg',
      image_url: 'http://lorempixel.com/400/400?q=' + i,
      color: colorz(i),
      slug: `some-special-slug${i}`,
      description: lorem({count: 1, units: 'paragraphs'})
    })
  }
  res.send(works)
})

app.get('/api/v1/artwork/:slug', function (req, res) {
  var id = parseInt(req.params.slug.replace('some-special-slug', ''), 10) || 1
  res.send({
    id: id,
    title: `title${id}`,
    username: 'username',
    cloudinary_image_url: 'gqutbssg0ck5zcuqrym7',
    // image_url: 'http://res.cloudinary.com/twentyfive/image/upload/v1449806840/gqutbssg0ck5zcuqrym7.jpg',
    // image_url: '/img/chris.jpg',
    image_url: `http://lorempixel.com/400/400?q=${id}`,
    color: colorz(parseInt(Math.random() * 3, 10)),
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

app.listen(process.env.PORT || 3000, function (err) {
  if (err) { return console.log(err) }
  console.log('Assets listening at http://localhost:'+(process.env.PORT||3000))
})
