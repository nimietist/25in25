import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import App from './app'

/**
 * This bootstraps the client side router
 */
let store = createStore(reducers, window.INITIAL_STATE)

window.render = render
window.app = <App />

render(<App />,
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  document.getElementById('app')
)

window.store = store
