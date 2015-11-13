import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// import { fetchUsers } from '../actions'

export default class Hello extends React.Component {
  static propTypes = {
    actions: PropTypes.object
  }
  // static fetchData (dispatch) {
  //   console.error('fetchdata', dispatch)
  //   return dispatch(fetchUsers())
  // }
  constructor (props) {
    super(props)
    this.state = {count: 0}
    // this.constructor.fetchData()
  }
  componentDidMount () {
  }
  printer = (e) => {
    this.setState({name: `john${this.state.count}`, count: this.state.count + 1})
  }
  render () {
    return <div id='h' onClick={this.printer}>
      hello {this.state.name} <Link to='/404'>404</Link>
    </div>
  }
}
