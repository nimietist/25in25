import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Nav, NavBrand, Navbar, NavDropdown, MenuItem } from 'react-bootstrap'

export default class NavBar extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object
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
        <NavDropdown title={this.avatar()} noCaret={1}>
          <MenuItem eventKey='1'><Link to='/account'>Account</Link></MenuItem>
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
        </Nav>
        {this.signInSection()}
      </Navbar>
    )
  }
}
