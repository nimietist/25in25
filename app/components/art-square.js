import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { OverlayTrigger, Popover, Button } from 'react-bootstrap'

class ArtSquare extends React.Component {
  static propTypes = {
    artwork: PropTypes.object
  }
  renderOverlay () {
    // TODO: Insert share buttons here
    return (
      <Popover id='Share the creativity!' title='Share'>
        <Button>FB</Button>
        <Button>Twitter</Button>
        <Button>Google</Button>
        <Button>Email</Button>
      </Popover>
    )
  }
  render () {
    const {title, username, image_url, slug} = this.props.artwork
    return (
      <div className='artwork col-lg-2 col-md-5ths col-sm-4 col-xs-6'>
        <div className='info'>
          <Link to={`/artwork/${slug}`}
            state={{modal: true}}
            params={{artwork: this.props.artwork}}
          >
            <img className='thumb wow animated fadeIn' src={image_url} />
          </Link>
          <div className={'meta ' + (this.props.artwork.color || 'red')}>
            <div className='title'>{title}</div>
            <div className='username'>
              <Link to={`/user/${username}`}>
                {username}
              </Link>
            </div>
            <OverlayTrigger trigger='click' rootClose placement='bottom' overlay={this.renderOverlay()}>
              <Button className='share-button' bsStyle='link'>
                <i className='fa fa-ellipsis-v'/>
              </Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    )
  }
}

export default ArtSquare
