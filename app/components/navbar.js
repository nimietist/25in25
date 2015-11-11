import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Button, Input, Nav, NavBrand, Navbar } from 'react-bootstrap'

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
    // alert('TODO: sign in...')
    const { actions } = this.props
    // this.props.logIn()
    e.preventDefault()
    actions.logIn()
  }
  logOut = (e) => {
    const { actions } = this.props
    actions.logOut()
  }
  loggedIn () {
    return (
      <div>
        <a href='#' onClick={this.logOut} >
          <Button>Hi, {this.props.user.name}</Button>
        </a>
      </div>
    )
  }
  loggedOut () {
    return (
      <form className='form' onSubmit={this.logIn}>
        <Input type='text' ref='input' placeholder='Username'/>
        <Input type='password' ref='input' placeholder='Password'/>
        <Button type='submit'>Sign In</Button>
      </form>
    )
  }
  signInSection () {
    return (
      this.props.user.name ? this.loggedIn() : this.loggedOut()
    )
  }
  render () {
    return (
      <Navbar navbar-fixed-top>
        <NavBrand><a href='#'>25in25</a></NavBrand>
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
