import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import SocialButtons from './social-buttons'
import { reduxForm } from 'redux-form'
import {Input, Button} from 'react-bootstrap'

const fields = ['username', 'password']

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

@reduxForm({form: 'login', fields, validate})
export default class Login extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired
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
    const {fields: {username, password}} = this.props
    return (
      <div className='container'>
        <h2 className='row'>Start creating today! Sign up below.</h2>
        <div className='row'>
          <SocialButtons />
          <div className='column'>
            <form ref='loginForm' onSubmit={this.logIn}>
              <Input type='text' {...username} placeholder='Username'/>
              <Input type='password' {...password} placeholder='Password'/>
              <Button type='submit'>Log In</Button>
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
