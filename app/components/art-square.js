import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class ArtSquare extends React.Component {
  static propTypes = {
    artwork: PropTypes.object
  }
  render () {
    const {title, username, image_url, slug} = this.props.artwork
    return (
      <div className='artwork col-md-5ths col-sm-4 col-xs-6'>
        <div className='dummy' />
        <div className='info'>
          <Link to={`/artwork/${slug}`}
            state={{modal: true}}
            params={{artwork: this.props.artwork}}
          >
            <img className='thumb' src={image_url} />
          </Link>
          <div className='meta'>
            <div className='title'>{title}</div>
            <div className='username'>
              <Link to={`/user/${username}`}>
                {username}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArtSquare
