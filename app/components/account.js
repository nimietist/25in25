import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import * as actions from '../actions'
import { get } from 'lodash'
import {Input, Button, Modal} from 'react-bootstrap'

const fields = ['username', 'email', 'passwordOld', 'passwordNew', 'passwordConfirm']

const validate = values => {
  const errors = {}
  if (values.passwordNew !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match'
  }
  return errors
}

@reduxForm({form: 'account', fields, validate}, state => {
  return {
    initialValues: state.user,
    user: state.user
  }
})
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
  constructor (props) {
    super(props)
    this.state = { isModalOpen: false }
  }
  componentDidMount () {
    this.props.dispatch(actions.getCurrentUser())
  }
  onDeactivateClicked = (e) => {
    // TODO: open modal confirmation
    e.preventDefault()
    this.setState({isModalOpen: true})
  }
  closeModal = () => {
    this.setState({isModalOpen: false})
  }
  deactivateAccount = () => {
    this.props.dispatch(actions.deactivateAccount())
    this.closeModal()
  }
  savePreferences = () => {
    this.props.dispatch(actions.updateUser(this.props.user.id, {
      email: this.props.fields.email.value,
      password: this.props.fields.passwordOld.value,
      passwordNew: this.props.fields.passwordNew.value
    }))
  }
  renderProfileImageUpload () {
    // TODO: add image upload feature
    return null
  }
  renderDeactivateModal () {
    return (
      <Modal
        onHide={this.closeModal}
        show={this.state.isModalOpen}
      >
        <Modal.Body>
          <h2>Deactive account</h2>
          <p>
            Deactivating your account removes your profile information and any content associated with it. We’re sad to see you go, but you can always reactivate your account by logging back in.
          </p>
          <p>
            Are you sure you want to deactivate your account?
          </p>
          <div>
            <Button onClick={this.closeModal}>Cancel</Button>
            <Button onClick={this.deactivateAccount}>Yes</Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  render () {
    const {fields: {email, passwordOld, passwordNew, passwordConfirm}} = this.props
    return (
      <div className='account'>
        <h2>Account Settings</h2>
        Hello {get(this, 'props.user.username')}
        <div>
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
        {this.renderDeactivateModal()}
      </div>
    )
  }
}
