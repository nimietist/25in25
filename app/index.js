import express from 'express';
import expressSession from 'express-session';
import dotenv from 'dotenv';
import socket from './lib/socket';
import connect from 'connect-assets';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import redisStore from './lib/redis';

dotenv.load();

let app = express();

socket(app);

app.port = process.env.PORT;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(expressSession({
  store: redisStore,
  key: 'redis.sid',
  secret: process.env.SESSION_SECRET
}));

app.get('/', function(req, res){
  res.render('index', {title: '25in25'});
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

export default app;
