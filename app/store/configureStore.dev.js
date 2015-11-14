import { compose, createStore, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'
import routes from '../routes'
import DevTools from '../containers/devtools'

var { reduxReactRouter } = require('redux-router/server')
var createHistory = require('history/lib/createMemoryHistory')

if (__CLIENT__) {
  reduxReactRouter = require('redux-router').reduxReactRouter
  createHistory = require('history').createHistory
}

const middleware = [
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ routes, createHistory })
]

if (__DEVTOOLS__) {
  middleware.push(DevTools.instrument())
}
if (__CLIENT__ && __DEVTOOLS__) {
  middleware.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))
}
const finalCreateStore = compose(...middleware)(createStore)

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
