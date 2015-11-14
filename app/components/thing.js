import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getThings } from '../actions'

@connect(state => ({ things: state.things }))
export default class Thing extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    params: PropTypes.object, // from react-router route
    things: PropTypes.object
  }
  static fetchData (dispatch, getState) {
    return dispatch(getThings())
  }
  constructor (props) {
    super(props)
    this.state = {count: 0}
    if (!Object.keys(this.props.things).length) {
      this.props.dispatch(getThings())
    }
  }
  render () {
    return <div>THING HERE!: {JSON.stringify(this.props.things)} {this.props.params.id}</div>
  }
}
