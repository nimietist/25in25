import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class NavBar extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    actions: PropTypes.object,
    user: PropTypes.object
  }
  state = {expanded: false}
  logOut = (e) => {
    const { actions } = this.props
    actions.logOut()
  }
  avatar = () => {
    let image_url = this.props.user.image_url
    return image_url ? <img className='avatar avatar-sm' src={image_url} />
      : <i className='fa fa-bars' />
  }

  handleSelect = (e) => {
    this.setState({ expanded: false })
  }
  onToggle = (expanded) => {
    this.setState({ expanded })
  }
  userInfo () {
    return (
      <Nav navbar pullRight onSelect={this.handleSelect}>
        <LinkContainer to='/account'>
          <MenuItem className='visible-xs' eventKey='1'>Account</MenuItem>
        </LinkContainer>
        <MenuItem className='visible-xs' eventKey='4' onClick={this.logOut}>Sign Out</MenuItem>
        <NavDropdown
          className='hidden-xs'
          title={this.avatar()}
          noCaret={true}
          id='navbar'
        >
          <LinkContainer to='/account'><MenuItem eventKey='1'>Account</MenuItem></LinkContainer>
          <MenuItem divider />
          <MenuItem eventKey='4' onClick={this.logOut}>Sign Out</MenuItem>
        </NavDropdown>
      </Nav>
    )
  }
  signInBar () {
    return (
      <div className='navbar-form navbar-right'>
        Not a member? <Link to='/signup' state={{modal: true}}>
          Sign up
        </Link> today!
        &nbsp;
        <Link to='/login'
          className='btn btn-primary'
          state={{
            modal: true,
            returnTo: this.props.location.pathname
          }}
        >
          Log In
        </Link>
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
      <Navbar navbar-fixed-top fluid expanded={this.state.expanded} onToggle={this.onToggle}>
        <Navbar.Header>
          <Navbar.Brand><Link to='/'>25in25</Link></Navbar.Brand>
          <Navbar.Toggle>
            {this.avatar()}
          </Navbar.Toggle>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={this.handleSelect}>
            <LinkContainer activeClassName='active' to='/browse'><NavItem>Browse</NavItem></LinkContainer>
            <LinkContainer activeClassName='active' to='/about'><NavItem>About</NavItem></LinkContainer>
            {
              this.props.user &&
              <LinkContainer activeClassName='active' to='/dashboard'>
                <NavItem>Dashboard</NavItem>
              </LinkContainer>
            }
          </Nav>
          {this.signInSection()}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
