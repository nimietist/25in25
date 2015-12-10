import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Nav, NavBrand, Navbar, NavDropdown, MenuItem } from 'react-bootstrap'

export default class NavBar extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    actions: PropTypes.object,
    user: PropTypes.object
  }
  logOut = (e) => {
    const { actions } = this.props
    actions.logOut()
  }
  avatar = () => {
    let image_url = this.props.user.image_url
    return image_url ? <img className='avatar avatar-sm' src={image_url} /> : <i className='fa fa-bars' />
  }

  handleSelect = () => {}
  userInfo () {
    return (
      <Nav navbar right onSelect={this.handleSelect}>
        <NavDropdown title={this.avatar()} noCaret={true} id='navbar'>
          <li onClick='' eventKey='1'><Link to='/account'>Account</Link></li>
          <MenuItem divider />
          <MenuItem eventKey='4' onClick={this.logOut}>Sign Out</MenuItem>
        </NavDropdown>
      </Nav>
    )
  }
  signInBar () {
    return (
      <div className='navbar-form navbar-right'>
        Not a member? <Link to='/signup'>Sign up</Link> today!
        &nbsp;
        <Link to='/login' className='btn btn-primary' state={{modal: true, returnTo: this.props.location.pathname}}>Log In</Link>
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
          <li><Link activeClassName='active' to='/browse'>Browse</Link></li>
          <li><Link activeClassName='active' to='/about'>About</Link></li>
        </Nav>
        {this.signInSection()}
      </Navbar>
    )
  }
}
