import React from 'react'
import { Route } from 'react-router'
import App from './containers/app'
import Home from './components/home'
import Hello from './components/hello'
import f404 from './components/404'

export default (
  <Route component={App} >
    <Route path='/' component={Home} />
    <Route path='/home' component={Home} />
    <Route path='/hello' component={Hello} />
    <Route path='/404' component={f404} />
  </Route>
)
