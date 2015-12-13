import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ArtGrid from './art-grid'
import { get } from 'lodash'
import * as actions from '../actions'

@connect(state => ({
  artworks: state.artworks.artworks,
  hasMore: state.artworks.hasMore,
  currentUser: state.currentUser
}))
export default class UserPage extends React.Component {
  static propTypes = {
    artworks: PropTypes.array,
    dispatch: PropTypes.func,
    currentUser: PropTypes.object,
    params: PropTypes.object
  }
  componentDidMount () {
    // TODO: load user and artworks from this.props.params.username
    this.props.dispatch(actions.getUser(this.props.params.username))
    this.props.dispatch(actions.getArtworks({
      username: this.props.params.username
    }))
  }
  renderProfileImage () {
    // TODO: component image profile
    return (
      <div className='text-center'>
        <img className='avatar avatar-lg' src={this.props.currentUser.image_url || require('../img/chris.jpg')} />
      </div>
    )
  }
  render () {
    return (
      <div className='user-page'>
        {this.renderProfileImage()}
        <h2 className='text-center'>
          {get(this, 'props.currentUser.username')}'s Portfolio
        </h2>
        <ArtGrid artworks={this.props.artworks || []} />
      </div>
    )
  }
}
