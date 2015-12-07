import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Countdown from './countdown'
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
  componentDidMount () {
    this.props.actions.getArtworks()
  }
  render () {
    return (
      <div className='home'>
        <Countdown />
        <ArtGrid artworks={this.props.artworks} />
      </div>
    )
  }
}
