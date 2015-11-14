import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class Hello extends React.Component {
  static propTypes = {
    children: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {count: 0}
  }
  render () {
    return (
      <div>
        hello {this.state.name}
        <Link to='/hello/123'>thing</Link>
        {this.props.children}
      </div>
    )
  }
}
