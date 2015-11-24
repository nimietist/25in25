global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVTOOLS__ = true

require('babel/register')()
require('rootpath')()
require('./app').serve()
