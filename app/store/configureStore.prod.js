import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'
import routes from '../routes'

var {reduxReactRouter} = require('redux-router/server')
var createHistory = require('history/lib/createMemoryHistory')
if (typeof window !== 'undefined') {
  reduxReactRouter = require('redux-router').reduxReactRouter
  createHistory = require('history').createHistory
}

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ routes, createHistory })
)(createStore)

export default function configureStore (initialState = {}) {
  return finalCreateStore(reducers, initialState)
}
