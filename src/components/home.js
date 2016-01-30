import React, { PropTypes } from 'react'
import Countdown from './countdown'
import ArtGrid from './art-grid'

export default class Home extends React.Component {
  static propTypes = {
    artworks: PropTypes.array,
    actions: PropTypes.object,
    children: PropTypes.object,
    user: PropTypes.object
  }
  render () {
    return (
      <div className='home'>
        <Countdown />
        {this.props.children && React.cloneElement(this.props.children, this.props)}
        <ArtGrid />
      </div>
    )
  }
}
