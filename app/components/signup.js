import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { validateEmail } from 'app/lib/utils'
import { reduxForm } from 'redux-form'
import {Input, Button} from 'react-bootstrap'
import SocialButtons from './social-buttons'

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
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool.isRequired
  }
  signUp = (e) => {
    const {fields: {username, email, password}} = this.props
    return this.props.actions.signUp({
      email: email.value,
      username: username.value,
      password: password.value
    })
  }
  render () {
    const {fields: {username, email, password}, submitting} = this.props
    return (
      <div className='modal-padding'>
        <h2 className='col-sm-12'>Start creating today! Sign up below.</h2>
        <div className='row'>
          <SocialButtons />
          <div className='col-sm-7'>
            <form ref='signupForm' onSubmit={this.props.handleSubmit(this.signUp)}>
              <Input type='text' {...username} placeholder='Username'/>
              <Input type='email' {...email} placeholder='Email'/>
              <Input type='password' {...password} placeholder='Password'/>
              <Button bsStyle='primary' block disabled={submitting} type='submit'>Sign up!</Button>
            </form>
            <div>
              Already have an account? <Link to='/login' state={{modal: true}}>Log in</Link>.
            </div>
          </div>
        </div>
        <div>
          By joining 25in25, I acknowledge that I have read and agreed to the <a href='#'>TOS</a> + <a href='#'>Privacy Policy</a>
        </div>
      </div>
    )
  }
}
