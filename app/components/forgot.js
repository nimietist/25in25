import React, { PropTypes } from 'react'
import ReactMixin from 'react-mixin'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

export default class Forgot extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    forgotSent: PropTypes.boolean
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentWillUnmount (nextProps) {
    console.error('didleave');
    this.props.actions.resetForgotSent()
  }
  sendEmail = (e) => {
    e.preventDefault()
    // TODO: validate email
    if (!this.state.email) {
      return this.props.actions.notify({
        message: 'Invalid Email'
      })
    }
    this.props.actions.sendForgotPassword(this.state.email)
  }
  renderForm () {
    return (
      <div>
        <p>
          No sweat. Let us know the email address you registered with and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={this.sendEmail}>
          <input type='email' name='email' placeholder='Email' valueLink={this.linkState('email')}/>
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
        <h2>Forgot your password?</h2>
        {this.props.forgotSent ? this.completeMessage() : this.renderForm()}
      </div>
    )
  }
}

ReactMixin(Forgot.prototype, LinkedStateMixin)
