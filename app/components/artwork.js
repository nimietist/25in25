import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from '../actions'

@connect(state => ({artwork: state.artwork}), dispatch => bindActionCreators(actions, dispatch))
class Artwork extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    artwork: PropTypes.object,
    params: PropTypes.object
  }
  static fetchData () {
  }
  constructor (props) {
    super(props)
    this.props.actions.getArtwork(this.props.params.artworkSlug)
  }
  render () {
    const {title, username, image_url, description} = this.props.artwork
    return (
      <div className='artwork'>
        <div className='col-xs-12'>
          <img className='large wow animated fadeIn' src={image_url} />
        </div>
        <div className='info'>
          <div className={'meta ' + this.props.artwork.color}>
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

export default Artwork
