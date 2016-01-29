require('envc')()
require('rootpath')()

import express from 'express'
import socket from 'app/lib/socket'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import routing from 'app/config/routing'
import IsoTools from 'webpack-isomorphic-tools'
import isoConfig from 'webpack-isomorphic-config'
import session from 'express-session'
import connectRedis from 'connect-redis'
import engines from 'consolidate'

const RedisStore = connectRedis(session)

const app = express()

socket(app)

app.port = process.env.PORT
app.locals.assets_host = process.env.ASSETS_HOST || ''

app.engine('jade', engines.jade)
app.engine('ejs', engines.ejs)
app.set('views', path.join(__dirname, 'app', 'views'))
app.set('view engine', 'jade')
app.use(favicon(path.join(__dirname, 'app', 'img', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  store: new RedisStore({url: process.env.REDIS_URL}),
  secret: 'keyboard cat'
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/static', express.static('static'))
app.use(routing)

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
}

global.webpackIsoTools = new IsoTools(isoConfig)
  .development(process.env.NODE_ENV === 'development')
  .server(require('path').resolve('.'), e => {
    console.log('webpack iso initialized')
  })

app.serve = () => {
  app.listen(app.port, () => console.log(`Listening on port ${app.port}`))
}

export default app
