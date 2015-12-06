import React, { PropTypes } from 'react'
import ArtGrid from './art-grid'

export default class UserPage extends React.Component {
  static propTypes = {
    artworks: PropTypes.array,
    actions: PropTypes.object,
    user: PropTypes.object
  }
  componentDidMount () {

  }
  renderProfileImage () {
    // TODO: component image profile
  }
  render () {
    return (
      <div className='user-page'>
        {this.renderProfileImage}
        {this.props.user.username}\'s Portfolio
        <ArtGrid artworks={this.props.artworks} />
      </div>
    )
  }
}
