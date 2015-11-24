import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

const fields = ['username', 'email', 'password', 'passwordConfirm']

const validate = values => {
  const errors = {}
  return errors
}

@reduxForm({form: 'reset', fields, validate})
export default class Forgot extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    forgotSent: PropTypes.bool
  }
  componentWillUnmount (nextProps) {
    this.props.actions.resetForgotSent()
  }
  updatePassword = (e) => {
    e.preventDefault()
    this.props.actions.updatePassword(this.state.email)
  }
  renderForm () {
    return (
      <div>
        <p>
          No sweat. Let us know the email address you registered with and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={this.updatePassword}>
          <input type='password' name='password' placeholder='New Password' valueLink={this.linkState('password')}/>
          <input type='password' name='password-confirm' placeholder='Confirm Password' valueLink={this.linkState('passwordConfirm')}/>
          <button type='submit'>Send</button>
        </form>
      </div>
    )
  }
  completeMessage () {
    return <p>
      Thanks! Your password reset link is on its way.
      <br />
      If you don’t receive the link within 30 minutes, send a message to <a mailto='help@25in25.org'>help@25in25.org</a>.
    </p>
  }
  render () {
    return (
      <div>
        <h2>Reset Password</h2>
        {this.props.forgotSent ? this.completeMessage() : this.renderForm()}
      </div>
    )
  }
}
