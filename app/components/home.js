import React from 'react'
import { Link } from 'react-router'

export default class Home extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    sendUserAction: React.PropTypes.func
  }
  goToError () {
    window.location.assign(404)
  }
  componentDidMount () {

  }
  handleClick = (e) => {
    console.error(this.props)
    // this.props.sendUserAction()
    e.preventDefault()
  }
  render () {
    const { user } = this.props
    return (
      <div>
        <Link to='/404'>
          <img src='http://img15.deviantart.net/f5da/i/2007/121/d/3/cousin_katamari_by_zetallis.jpg' />
          {user}
        </Link>
        <a href='#' onClick={this.handleClick} >
          <img src={require('../img/chris.jpg')} />
        </a>
      </div>
    )
  }
}
