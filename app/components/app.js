import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { reduxReactRouter, ReduxRouter } from 'redux-router'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { devTools } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import { createHistory } from 'history'
import reducer from './reducers'

import routes from './routes'

const store = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({
    routes,
    createHistory
  }),
  devTools()
)(createStore)(reducer, window.INITIAL_STATE)

export default class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func
  }
  render () {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>{routes}</ReduxRouter>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }
}
