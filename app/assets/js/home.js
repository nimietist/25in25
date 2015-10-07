import React from 'react'
import { Link } from 'react-router'
import { fetchUsers } from './actions'

export default React.createClass({
  propTypes: {
    users: React.PropTypes.array,
    dispatch: React.PropTypes.func
  },
  goToError () {
    window.location.assign(404)
  },
  getInitialState () {
    return {}
  },
  componentDidMount () {
    let { dispatch } = this.props
    dispatch(fetchUsers)
  },
  render () {
    const { users } = this.props
    return (
      <Link to='/404'>
        <img src='http://lorempixel.com/400/400' />
        {users}
      </Link>
    )
  }
})
