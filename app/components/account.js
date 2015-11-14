import React, { PropTypes } from 'react'
import ReactMixin from 'react-mixin'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import * as actions from '../actions'
import { get } from 'lodash'

export default class Account extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    params: PropTypes.object, // from react-router route
    user: PropTypes.object
  }
  static fetchData (dispatch, getState) {
    // return dispatch(actions.getCurrentUser())
  }
  constructor (props) {
    super(props)
    this.state = {email: ''}
  }
  componentDidMount () {
    this.props.dispatch(actions.getCurrentUser())
  }
  render () {
    return (
      <div>
        <h2>Account Settings</h2>
        Hello {get(this, 'props.user.username')}
        <div className='col-md-4'>
          <form>
            <label>Change Email</label>
          <input type='text' valueLink={this.linkState('email')} />

          </form>
        </div>
      </div>
    )
  }
}

ReactMixin(Account.prototype, LinkedStateMixin) // Can't decorate bc of this guy
export default connect(state => ({ user: state.user }))(Account)
