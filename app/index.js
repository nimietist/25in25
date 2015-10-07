import dotenv from 'dotenv'
dotenv.load()

import express from 'express'
import socket from './lib/socket'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import assets from 'connect-assets'
import routing from './config/routing'

let app = express()

socket(app)

app.port = process.env.PORT
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(favicon(path.join(__dirname, 'assets', 'img', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use(assets({
//   servePath: process.env.CDN_PATH || 'assets',
//   paths: [path.join(__dirname, 'assets', '*')],
//   buildDir: path.join(__dirname, '..', 'dist')
// }))

app.use(routing)

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.serve = () => {
  app.listen(app.port, () => console.log(`Listening on port ${app.port}`))
}

export default app
