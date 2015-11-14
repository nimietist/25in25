import React, { PropTypes } from 'react'
import ReactMixin from 'react-mixin'
import { Link } from 'react-router'
import { Button, Input, Nav, NavBrand, Navbar } from 'react-bootstrap'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

export default class NavBar extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  logIn = (e) => {
    e.preventDefault()
    const { actions } = this.props
    if (!this.state.username) {
      actions.notify({
        type: 'warning',
        message: 'Username required'
      })
      return
    }
    if (!this.state.password) {
      actions.notify({
        type: 'warning',
        message: 'Password required'
      })
      return
    }
    actions.logIn({
      username: this.state.username,
      password: this.state.password
    })
  }
  logOut = (e) => {
    const { actions } = this.props
    actions.logOut()
  }
  userInfo () {
    return (
      <div>
        <a href='#' onClick={this.logOut} >
          <Button>Hi, {this.props.user.username}</Button>
        </a>
      </div>
    )
  }
  loginForm () {
    return (
      <form className='form' onSubmit={this.logIn}>
        <Input type='text' name='username' placeholder='Username' valueLink={this.linkState('username')}/>
        <Input type='password' name='password' placeholder='Password' valueLink={this.linkState('password')}/>
        <Button type='submit'>Sign In</Button>
      </form>
    )
  }
  signInSection () {
    return (
      this.props.user.username ? this.userInfo() : this.loginForm()
    )
  }
  render () {
    return (
      <Navbar navbar-fixed-top>
        <NavBrand><Link to='/' href='#' >25in25</Link></NavBrand>
        <Nav>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/hello'>Hello</Link></li>
          <li><Link to='/404'>404</Link></li>
        </Nav>
        {this.signInSection()}
      </Navbar>
    )
  }
}

ReactMixin(NavBar.prototype, LinkedStateMixin)
