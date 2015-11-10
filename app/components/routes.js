import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import Home from './home'
import Hello from './hello'
import f404 from './404'
import { fetchUsers } from './actions'

@connect((state) => ({ q: state.router.location.query.q }))
class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.node
  }
  handleClick = (e) => {
    this.props.dispatch(fetchUsers())
  }
  render () {
    return (
      <div onClick={this.handleClick} {...this.props} className='app' />
    )
  }
}

export default (
  <Route component={App} >
    <Route path='/' component={Home} />
    <Route path='/home' component={Home} />
    <Route path='/hello' component={Hello} />
    <Route path='/404' component={f404} />
  </Route>
)
