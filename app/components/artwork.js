import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import * as actions from '../actions'
import { pushState } from 'redux-router'

import { Button, Input } from 'react-bootstrap'
import { HotKeys } from 'react-hotkeys'
import { findIndex } from 'lodash'

const fields = ['title', 'description', 'image']
const validate = values => {
  const errors = {}
  return errors
}

@reduxForm({form: 'artwork', fields, validate}, state => ({
  artworks: state.artworks.artworks,
  currentArtwork: state.artwork,
  router: state.router
}), dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  pushState: bindActionCreators(pushState, dispatch)
}))
export default class Artwork extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    artwork: PropTypes.object,
    artworks: PropTypes.array,
    currentArtwork: PropTypes.object,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    modal: PropTypes.bool,
    params: PropTypes.object,
    pushState: PropTypes.func,
    submitting: PropTypes.bool
  }
  static fetchData () {

  }
  constructor (props, context) {
    super(props, context)
    this.props.actions.getArtwork(this.props.params.artworkSlug)
    this.state = {
      editing: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.actions.getArtwork(nextProps.params.artworkSlug)
    }
  }
  // TODO: focus next button
  prev = () => {
    this.props.pushState({modal: true}, this.refs.prev.props.to)
  }
  next = () => {
    this.props.pushState({modal: true}, this.refs.next.props.to)
  }
  handlers = {
    'left': this.prev,
    'right': this.next
  }
  toggleEditing = () => {
    this.setState({editing: !this.state.editing})
  }
  updateArtwork () {
    // TODO: updateartwork action
  }

  renderSwiper () {
    let {artworks, params, currentArtwork} = this.props
    let swipeIndex = findIndex(artworks, artwork => artwork.slug === params.artworkSlug)
    let artwork = artworks[swipeIndex] || currentArtwork
    if (!artwork) { return null }

    let prev = artworks[(swipeIndex + artworks.length - 1) % artworks.length]
    let next = artworks[(swipeIndex + 1) % artworks.length]
    return (
      <HotKeys handlers={this.handlers}>
        <div ref='swiper'>
          {this.renderContainer()}
        </div>
      </HotKeys>
    )
  }
  renderView () {
    const artwork = this.props.artwork || this.props.currentArtwork
    const {title, username, description} = artwork
    return (
      <div>
        <span className='title'>{title}</span> by <span className='username'>
          <Link to={`/user/${username}/`}>
            {username}
          </Link>
        </span>:
        <div className='description'>
          {description}
        </div>
        <Button bsStyle='link' onClick={this.toggleEditing}>
          <i className='fa fa-ellipsis-v' />
        </Button>
      </div>
    )
  }
  renderForm () {
    const artwork = this.props.artwork || this.props.currentArtwork
    const {fields: {title, description}} = this.props
    return (
      <form onSubmit={this.props.handleSubmit(this.updateArtwork)}>
        <Input type='text' className='title' {...title} value={artwork.title}/> by <span className='username'>{artwork.username}
        </span>:
        <Input type='textarea' className='description' {...description} value={artwork.description}/>
        <Button block type='submit' bsStyle='primary'>Update</Button>
        <Button className='share-button' bsStyle='link' onClick={this.toggleEditing}>
          <i className='fa fa-close' />
        </Button>
      </form>
    )
  }
  renderNav () {
    if (!this.props.modal) return null
    let {artworks, params, currentArtwork} = this.props
    let swipeIndex = findIndex(artworks, artwork => artwork.slug === params.artworkSlug)
    let artwork = artworks[swipeIndex] || currentArtwork
    if (!artwork) { return null }

    let prev = artworks[(swipeIndex + artworks.length - 1) % artworks.length]
    let next = artworks[(swipeIndex + 1) % artworks.length]
    return (
      <div className='art-nav-container'>
        <Link className='art-nav art-nav-left' ref='prev' to={`/artwork/${prev.slug}`} state={{modal: true}}></Link>
        <Link className='art-nav art-nav-right' ref='next' to={`/artwork/${next.slug}`} state={{modal: true}}></Link>
      </div>
    )
  }
  renderContainer () {
    const artwork = this.props.artwork || this.props.currentArtwork
    const {image_url, color} = artwork
    return (
      <div className='artwork'>
        <div>
          <img className='large' src={image_url} />
          {this.renderNav()}
        </div>
        <div className='info'>
          <div className={'meta ' + color}>
            {this.state.editing ? this.renderForm() : this.renderView()}
          </div>
        </div>
      </div>
    )
  }
  render () {
    if (this.props.modal) {
      return this.renderSwiper()
    }
    return this.renderContainer()
  }
}
