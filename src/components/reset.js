import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Button, Input } from 'react-bootstrap'
import { Link } from 'react-router'

const fields = ['username', 'email', 'password', 'passwordConfirm']

const validate = values => {
  const errors = {}
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords do not match'
  }
  return errors
}

@reduxForm({form: 'reset', fields, validate}, state => ({
  request_hash: state.router.location.query.request_hash
}))
export default class Forgot extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool.isRequired,
    forgotSent: PropTypes.bool,
    request_hash: PropTypes.string
  }
  componentWillUnmount (nextProps) {
    this.props.actions.resetForgotSent()
  }
  updatePassword = (e) => {
    return this.props.actions.updatePassword({
      password: this.props.fields.password.value,
      request_hash: this.props.request_hash
    })
  }
  renderForm () {
    const {fields: {password, passwordConfirm}, submitting} = this.props
    return (
      <div>
        <p>
          No sweat. Let us know the email address you registered with and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={this.props.handleSubmit(this.updatePassword)}>
          <Input type='password' {...password} placeholder='New Password' />
          <Input type='password' {...passwordConfirm} placeholder='Confirm Password' />
          <input type='hidden' value={this.props.request_hash} />
          <Button bsStyle='primary' block disabled={submitting} type='submit'>Send</Button>
        </form>
      </div>
    )
  }
  completeMessage () {
    return <p>
      Thanks! Your password is not reset.
      <br/>
      <Link to='/login'>You can login with your password here.</Link>
    </p>
  }
  render () {
    return (
      <div className='col-sm-8 col-sm-offset-2'>
        <h2>Reset Password</h2>
        {this.props.forgotSent ? this.completeMessage() : this.renderForm()}
      </div>
    )
  }
}
