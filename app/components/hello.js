import React from 'react'
import { Link } from 'react-router'

export default class Hello extends React.Component {
  constructor (props) {
    super(props)
    this.state = {count: 0}
  }
  fetchData () {
    this.props.actions.fetchUsers()
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
