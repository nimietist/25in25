import React from 'react'
import { ReduxRouter } from 'redux-router'
import { Provider } from 'react-redux'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import configureStore from '../store/configureStore.dev'

const store = configureStore()

export default class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <ReduxRouter />
          <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
          </DebugPanel>
        </div>
      </Provider>
    )
  }
}
