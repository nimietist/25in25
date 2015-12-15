import React from 'react'
import { Route } from 'react-router'
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
import Artwork from './components/artwork'

// TODO: Add Unauthorized wrapper
// TODO: Add incomplete profile wrapper
export default (
  <Route component={App} >
    <Route activeHref='/about' path='/about' component={About} />
    <Route path='/account' component={Account} />
    <Route path='/artwork/:artworkSlug' component={Artwork} />
    <Route path='/signup' component={Signup} />
    <Route path='/login' component={Login} />
    <Route path='/forgot' component={Forgot} />
    <Route path='/reset' component={Reset} />
    <Route path='/user/:username' component={UserPage} />
    <Route path='/browse' component={Home} />
    <Route path='/' component={Home}>
      <Route path='/dashboard' component={Upload} />
      <Route path='' component={Upload} />
    </Route>
  </Route>
)
