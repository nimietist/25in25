import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import * as actions from '../actions'
import { get } from 'lodash'
import {Input, Button} from 'react-bootstrap'

const fields = ['username', 'email', 'password', 'passwordConfirm']

const validate = values => {
  const errors = {}
  return errors
}

@connect(state => ({ user: state.user }))
@reduxForm({form: 'account', fields, validate}, state => ({initialValues: state.user.email}))
export default class Account extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    params: PropTypes.object, // from react-router route
    user: PropTypes.object
  }
  static fetchData (dispatch, getState) {
    // return dispatch(actions.getCurrentUser())
  }
  componentDidMount () {
    this.props.dispatch(actions.getCurrentUser())
  }
  onDeactivateClicked () {
    // TODO: open modal confirmation
  }
  deactivateAccount () {
    this.props.dispatch(actions.deactivateAccount())
  }
  savePreferences () {
    this.props.dispatch(actions.updateUser())
  }
  renderProfileImageUpload () {
    // TODO: add image upload feature
    return null
  }
  render () {
    const {fields: {email, passwordOld, passwordNew, passwordConfirm}} = this.props
    return (
      <div>
        <h2>Account Settings</h2>
        Hello {get(this, 'props.user.username')}
        <div className='col-md-4'>
          <form onSubmit={this.props.handleSubmit(this.savePreferences)}>
            <Input label='Change Email' type='email' {...email} placeholder='Email' />
            <Input label='Change Password' type='password' {...passwordOld} placeholder='Old Password' />
            <Input type='password' {...passwordNew} placeholder='New Password' />
            <Input type='password' {...passwordConfirm} placeholder='Confirm Password' />
            <Input label='Email Notifications' />
            <Input label='Opt-in to receive email notifications and other spammy bullshit' type='checkbox'/>
            {this.renderProfileImageUpload}
            <Button type='submit'>Save</Button>
          </form>
        </div>
        <a href='#' onClick={this.onDeactivateClicked}>I want to deactivate my account</a>
      </div>
    )
  }
}
