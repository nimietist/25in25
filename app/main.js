import React from 'react'
import { render } from 'react-dom'
import Root from './containers/root'
import configureStore from './store/configureStore'

require('./css/main.less')

/**
 * This bootstraps the client side router
 */
const store = configureStore(window.INITIAL_STATE)
render(<Root store={store}/>, document.getElementById('app'))
