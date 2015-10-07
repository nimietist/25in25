import React from 'react'
import { Router } from 'react-router'
import { connect } from 'react-redux'

let App = React.createClass({
  propTypes: {
    dispatch: React.propTypes.func
  },
  componentDidMount () {
    let { dispatch } = this.props
    dispatch(require('./actions').fetchUsers())
  },
  render () {
    return (
      <Router {...this.props} />
    )
  }
})

let select = function (state) {
  return {
    users: state.users
  }
}

export default connect(select)(App)
