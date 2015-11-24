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
@reduxForm({form: 'account', fields, validate})
export default class Account extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
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
  render () {
    const {fields: {email}} = this.props
    return (
      <div>
        <h2>Account Settings</h2>
        Hello {get(this, 'props.user.username')}
        <div className='col-md-4'>
          <form>
            <Input label='Change Email' type='email' {...email} placeholder='Email' />
            <Button type='submit'>Update Settings</Button>
          </form>
        </div>
      </div>
    )
  }
}
