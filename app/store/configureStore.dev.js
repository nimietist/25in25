import thunkMiddleware from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { reduxReactRouter } from 'redux-router'
import { devTools } from 'redux-devtools'
import { createHistory } from 'history'
import reducers from '../reducers'
import routes from '../routes'

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ routes, createHistory }),
  devTools()
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
