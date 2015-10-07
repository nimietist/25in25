// Be sure to restart the app server after making changes to this file

import React from 'react'
import { Route } from 'react-router'

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
})

export default (
<Route component={App} >
    <Route path='/' component={require('./home')} />
    <Route path='/home' component={require('./home')} />
    <Route path='/hello' component={require('./hello')} />
    <Route path='/404' component={require('./404')} />
  </Route>
)
