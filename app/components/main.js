import React from 'react'
import { render } from 'react-dom'
import App from './app'

/**
 * This bootstraps the client side router
 */

require('../css/main.less')
render(<App />, document.getElementById('app'))
