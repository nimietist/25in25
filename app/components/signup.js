import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { validateEmail } from 'app/lib/utils'
import { reduxForm } from 'redux-form'
import {Input, Button} from 'react-bootstrap'

const fields = ['username', 'email', 'password']

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.age = 'Required'
  } else if (values.password.length < 3) {
    errors.password = 'Password must be at least 3 characters long'
  }
  return errors
}

@reduxForm({form: 'signup', fields, validate})
export default class Signup extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    fields: PropTypes.object
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
    const {fields: {username, email, password}} = this.props
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
              <Input type='text' name='username' {...username} placeholder='Username'/>
              <Input type='email' name='email' {...email} placeholder='Email'/>
              <Input type='password' name='password' {...password} placeholder='Password'/>
              <Button type='submit'>Sign up!</Button>
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
