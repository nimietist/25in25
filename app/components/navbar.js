import React, { PropTypes } from 'react'
import ReactMixin from 'react-mixin'
import { Link } from 'react-router'
import { Button, Input, Nav, NavBrand, Navbar, NavDropdown, MenuItem } from 'react-bootstrap'
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
  avatar = () => {
    let image_url = this.props.user.image_url
    return image_url ? <img className='avatar avatar-small' src={image_url} /> : <i className='fa fa-bars' />
  }
  userInfo () {
    return (
      <Nav navbar right>
        <NavDropdown title={this.avatar()} noCaret={true}>
          <MenuItem eventKey='1'><Link to='/me'>Account</Link></MenuItem>
          <MenuItem divider />
          <MenuItem eventKey='4' onClick={this.logOut}>Sign Out</MenuItem>
        </NavDropdown>
      </Nav>
    )
  }
  loginForm () {
    return (
      <form className='navbar-form navbar-right' onSubmit={this.logIn}>
        <Input className='form-control' type='text' name='username' placeholder='Username' valueLink={this.linkState('username')}/>
        <Input className='form-control' type='password' name='password' placeholder='Password' valueLink={this.linkState('password')}/>
        <Button type='submit'>Sign In</Button>
      </form>
    )
  }
  signInBar () {
    return (
      <div className='navbar-form navbar-right'>
        Not a member? <Link to='/signup'>Sign up</Link> today!
        &nbsp;
        <Link to='/login' className='btn btn-primary'>Log In</Link>
      </div>
    )
  }
  signInSection () {
    return (
      this.props.user.id ? this.userInfo() : this.signInBar()
    )
  }
  render () {
    return (
      <Navbar navbar-fixed-top>
        <NavBrand><Link to='/' href='#' >25in25</Link></NavBrand>
        <Nav>
          <li><Link to='/browse'>Browse</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/modal'>Modal</Link></li>
        </Nav>
        {this.signInSection()}
      </Navbar>
    )
  }
}

ReactMixin(NavBar.prototype, LinkedStateMixin)
