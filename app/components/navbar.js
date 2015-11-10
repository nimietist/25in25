import React from 'react'
import { Link } from 'react-router'
import { Button, Input, Nav, NavBrand, NavItem, Navbar } from 'react-bootstrap'

export default class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  logIn = (e) => {
    // alert('TODO: sign in...')
    // this.props.logIn()
    e.preventDefault()
    this.setState({
      user: {
        name: 'john'
      }
    })
  }
  logOut = (e) => {
    // this.props.logOut()
    this.setState({
      user: null
    })
  }
  loggedIn () {
    return (
      <div>
        <a href='#' onClick={this.logOut} >
          <Button>Hi, {this.state.user.name}</Button>
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
      this.state.user ? this.loggedIn() : this.loggedOut()
    )
  }
  render () {
    return (
      <Navbar navbar-fixed-top>
        <NavBrand><a href='#'>25in25</a></NavBrand>
        <Nav>
          <NavItem eventKey={1}><Link to='/home'>Home</Link></NavItem>
          <NavItem eventKey={2}><Link to='/hello'>Hello</Link></NavItem>
          <NavItem eventKey={3}><Link to='/404'>404</Link></NavItem>
        </Nav>
        {this.signInSection()}
      </Navbar>
    )
  }
}
