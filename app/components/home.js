import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Jumbotron } from 'react-bootstrap'
import ArtGrid from './art-grid'
import * as actions from '../actions'

@connect(state => ({ artworks: state.artworks }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
export default class Home extends React.Component {
  static propTypes = {
    artworks: PropTypes.array,
    actions: PropTypes.object,
    user: PropTypes.object
  }
  handleClick = (e) => {
    e.preventDefault()
  }
  componentDidMount () {
    this.props.actions.getArtworks()
  }
  render () {
    return (
      <div className='home'>
        <Jumbotron>
          Lorem Ipsum
          <div>
            Countdown here
          </div>
        </Jumbotron>
        <ArtGrid artworks={this.props.artworks} />
        <Link to='/about'>
          <img src='http://img15.deviantart.net/f5da/i/2007/121/d/3/cousin_katamari_by_zetallis.jpg' />
        </Link>
        <a href='#' onClick={this.handleClick} >
          <img src={require('../img/chris.jpg')} />
        </a>
      </div>
    )
  }
}
