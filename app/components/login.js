import React, { PropTypes } from 'react'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import { Link } from 'react-router'
import SocialButtons from './social-buttons'
// import * as bootstrap from 'react-bootstrap'

export default class Login extends React.Component {
  static propTypes = {
    actions: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
  logIn = (e) => {
    // TODO: validate fields
    e.preventDefault()
    this.props.actions.logIn({
      username: this.state.username,
      password: this.state.password
    })
    return false
  }
  render () {
    return (
      <div className='container'>
        <h2 className='row'>Start creating today! Sign up below.</h2>
        <div className='row'>
          <SocialButtons />
          <div className='column'>
            <form ref='loginForm' onSubmit={this.logIn}>
              <input type='text' name='username' valueLink={this.linkState('username')} placeholder='Username'/>
              <input type='password' name='password' valueLink={this.linkState('password')} placeholder='Password'/>
              <button type='submit'>Log In</button>
            </form>
            <div>
              <Link to='/forgot'>I forgot my password.</Link>
            </div>
            <div>
              Don't have an account? <Link to='/signup'>Sign up</Link>.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactMixin(Login.prototype, LinkedStateMixin)
