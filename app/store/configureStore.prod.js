import thunkMiddleware from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { reduxReactRouter } from 'redux-router'
// import { createHistory } from 'history'
import createHistory from 'history/lib/createMemoryHistory'
import reducers from '../reducers'
import routes from '../routes'

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ routes, createHistory })
)(createStore)

export default function configureStore (initialState = {}) {
  return finalCreateStore(reducers, initialState)
}
