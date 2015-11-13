import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'
import routes from '../routes'
import DevTools from '../containers/devtools'

var {reduxReactRouter} = require('redux-router/server')
var createHistory = require('history/lib/createMemoryHistory')
if (typeof window !== 'undefined') {
  reduxReactRouter = require('redux-router').reduxReactRouter
  createHistory = require('history').createHistory
}

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ routes, createHistory }),
  DevTools.instrument()
)(createStore)

export default function configureStore (initialState = {}) {
  const store = finalCreateStore(reducers, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
