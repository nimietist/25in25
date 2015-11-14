import React from 'react'
import { Route } from 'react-router'
import App from './containers/app'
import Home from './components/home'
import Account from './components/account'
import About from './components/about'

export default (
  <Route component={App} >
    <Route path='/' component={Home} />
    <Route path='/me' component={Account} />
    <Route path='/about' component={About} />
    <Route path='*' component={Home} />
  </Route>
)
