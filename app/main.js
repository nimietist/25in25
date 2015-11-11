import React from 'react'
import { render } from 'react-dom'
import Root from './containers/root'

require('./css/main.less')

/**
 * This bootstraps the client side router
 */
render(<Root />, document.getElementById('app'))
