import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class Home extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object
  }
  handleClick = (e) => {
    const { actions } = this.props
    actions.fetchUsers()
    e.preventDefault()
  }
  render () {
    return (
      <div>
        <Link to='/404'>
          <img src='http://img15.deviantart.net/f5da/i/2007/121/d/3/cousin_katamari_by_zetallis.jpg' />
        </Link>
        <a href='#' onClick={this.handleClick} >
          <img src={require('../img/chris.jpg')} />
        </a>
      </div>
    )
  }
}
