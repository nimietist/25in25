import React, { PropTypes } from 'react'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import { Link } from 'react-router'
// import * as bootstrap from 'react-bootstrap'

export default class Signup extends React.Component {
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
  signUp = (e) => {
    // TODO: validate fields
    e.preventDefault()
    this.props.actions.signUp({
      email: this.state.email,
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
          <div className='column'>
            <a href='/auth/facebook' className='btn btn-facebook'>Sign up with Facebook</a>
            <a href='/auth/twitter' className='btn btn-twitter'>Sign up with Twitter</a>
            <a href='/auth/google' className='btn btn-google'>Sign up with Google</a>
          <div className='column'>
            <form ref='signupForm' onSubmit={this.signUp}>
              <input type='text' name='username' valueLink={this.linkState('username')} placeholder='Username'/>
              <input type='email' name='email' valueLink={this.linkState('email')} placeholder='Email'/>
              <input type='password' name='password' valueLink={this.linkState('password')} placeholder='Password'/>
              <button type='submit'>Sign up!</button>
            </form>
            <div>
              Already have an account? <Link to='/login'>Log in</Link>.
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactMixin(Signup.prototype, LinkedStateMixin)
