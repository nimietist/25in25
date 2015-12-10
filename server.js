global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVTOOLS__ = false

require('babel/register')()
require('rootpath')()
require('./app').serve()
