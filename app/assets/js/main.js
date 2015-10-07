import React from 'react'

import { history } from 'react-router/lib/BrowserHistory'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import routes from './routes'
import App from './app'

/**
 * This bootstraps the client side router
 */
let store = createStore(reducers, window.INITIAL_STATE)
console.error(store);
React.render(
  <Provider store={store}>
    {() => <App history={history} children={routes} />}
  </Provider>,
  document.getElementById('react-root')
)

window.store = store
