import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form'
import {Input, Button} from 'react-bootstrap'

const fields = ['email']
const validate = values => {
  const errors = {}
  return errors
}
@reduxForm({form: 'forgot', fields, validate})
export default class Forgot extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    fields: PropTypes.object,
    forgotSent: PropTypes.bool
  }
  constructor (props) {
    super(props)
  }
  componentWillUnmount (nextProps) {
    this.props.actions.resetForgotSent()
  }
  sendEmail = (e) => {
    e.preventDefault()
    this.props.actions.sendForgotPassword(this.props.fields.email)
  }
  renderForm () {
    const {fields: {email}} = this.props
    return (
      <div>
        <p>
          No sweat. Let us know the email address you registered with and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={this.sendEmail}>
          <Input className='form-control' type='email' name='email' placeholder='Email' {...email}/>
          <Button type='submit'>Send</Button>
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