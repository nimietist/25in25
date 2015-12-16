if (process.env.SERVER) {
  require('./server')
} else {
  require('./webdevserver')
}
