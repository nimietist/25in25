import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from '../actions'

import ReactSwipe from 'react-swipe'
import { Button } from 'react-bootstrap'
import { HotKeys } from 'react-hotkeys'
import { findIndex } from 'lodash'

@connect(state => ({
  artworks: state.artworks.artworks,
  currentArtwork: state.artwork
}), dispatch => ({actions: bindActionCreators(actions, dispatch)}))
export default class Artwork extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    artwork: PropTypes.object,
    currentArtwork: PropTypes.object,
    artworks: PropTypes.array,
    modal: PropTypes.bool,
    params: PropTypes.object
  }
  static fetchData () {

  }
  constructor (props, context) {
    super(props, context)
    if (!this.props.modal) {
      this.props.actions.getArtwork(this.props.params.artworkSlug)
    }
  }
  componentDidMount () {
    this.refs.next && this.refs.next.focus()
  }
  prev = () => {
    this.refs.swiper.swipe.prev()
  }
  next = () => {
    this.refs.swiper.swipe.next()
  }
  handlers = {
    'left': this.prev,
    'right': this.next
  }

  renderSwiper () {
    let start = findIndex(this.props.artworks, artwork => artwork.id === this.props.currentArtwork.id)
    return (
      <HotKeys ref='keys' handlers={this.handlers}>
        <ReactSwipe ref='swiper' startSlide={start}>
          {this.props.artworks.map((artwork, i) => (
            <Artwork
              key={`artwork-swipe-${i}`}
              artwork={artwork}
              modal={false}
              params={this.props.params}
            />
          ))}
        </ReactSwipe>
        <Button onClick={this.prev}>Prev</Button>
        <Button ref='next' onClick={this.next}>Next</Button>
      </HotKeys>
    )
  }
  render () {
    if (this.props.modal) {
      return this.renderSwiper()
    }
    const artwork = this.props.artwork || this.props.currentArtwork
    const {title, username, image_url, description, color} = artwork
    return (
      <div className='artwork col-xs-12'>
        <div>
          <img className='large' src={image_url} />
        </div>
        <div className='info'>
          <div className={'meta ' + color}>
            <span className='title'>{title}</span> by <span className='username'>
              <Link to={`/user/${username}/`}>
                {username}
              </Link>
            </span>:
            <div className='description'>
              {description}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
