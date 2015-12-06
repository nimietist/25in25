import React, { PropTypes } from 'react'

class Share extends React.Component {
  static propTypes = {
    artwork: PropTypes.object
  }
  render () {
    const {title, username} = this.props.artwork
    return (
      <div className='artwork'>
        <div className='info'>
          <div className='title'>{title}</div>
          <div className='username'>{username}</div>
        </div>
      </div>
    )
  }
}

export default Share
