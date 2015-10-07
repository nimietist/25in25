var url = require('url')
var db = url.parse(process.env.DATABASE_URL)
var auth = db.auth.split('@')
var config = {}

config[process.env.NODE_ENV] = {
  username: auth[0],
  password: auth[1],
  database: db.path.substring(1),
  host: db.hostname,
  dialect: 'postgres'
}

module.exports = config
