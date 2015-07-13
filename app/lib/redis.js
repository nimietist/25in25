import url from 'url';
import expressSession from 'express-session';
import connect from 'connect-redis';

let RedisStore = connect(expressSession);

let config = url.parse(process.env.REDIS_URL);
let auth = (config.auth || '').split(':');

export default new RedisStore({
  host: config.hostname,
  port: config.port,
  db: auth[0] || 0,
  pass: auth[1] || ''
});
