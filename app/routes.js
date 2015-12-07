import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './containers/app'
import Home from './components/home'
import Account from './components/account'
import About from './components/about'
import Signup from './components/signup'
import Login from './components/login'
import Forgot from './components/forgot'
import Reset from './components/reset'
import UserPage from './components/user-page'
import Upload from './components/upload'
// import NotFound from './components/not-found'

// TODO: Add Unauthorized wrapper
// TODO: Add incomplete profile wrapper
export default (
  <Route component={App} >
    <IndexRoute component={Home} />
    <Route activeHref='/about' path='/about' component={About} />
    <Route path='/account' component={Account} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
    <Route path='/forgot' component={Forgot} />
    <Route path='/reset' component={Reset} />
    <Route path='/user/:username' component={UserPage} />
    <Route path='/upload' component={Upload} />
    <Route path='*' component={Home} />
  </Route>
)
