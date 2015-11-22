import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './containers/app'
import Home from './components/home'
import Account from './components/account'
import About from './components/about'
import Modal from './containers/modal'
import Signup from './components/signup'
import Login from './components/login'
import Forgot from './components/forgot'
// import NotFound from './components/not-found'

// TODO: Add Unauthorized wrapper
// TODO: Add incomplete profile wrapper
export default (
  <Route component={App} >
    <IndexRoute component={Home} />
    <Route >
      <Route path='/me' component={Account} />
    </Route>
    <Route path='/about' component={About} >
      <Route path='/modal' component={Modal} >
        <Route path='/modal/:id' component={require('./components/thing')}/>
      </Route>
    </Route>
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
    <Route path='/forgot' component={Forgot} />
    <Route path='*' component={Home} />
  </Route>
)
