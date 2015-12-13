import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import InfiniteScroll2 from 'react-infinite-scroll2'
import ArtSquare from './art-square'
import * as actions from '../actions'

const InfiniteScroll = InfiniteScroll2(React, ReactDOM)

@connect(state => ({
  artworks: state.artworks.artworks,
  hasMore: state.artworks.hasMore
}))
class ArtGrid extends React.Component {
  static propTypes = {
    artworks: PropTypes.array,
    context: PropTypes.object,
    hasMore: PropTypes.bool,
    dispatch: PropTypes.func
  }
  componentDidMount () {
    // this.props.dispatch(actions.getArtworks(this.props.context || {}))
  }
  loadMore = (page) => {
    let context = {...(this.props.context || {}), page}
    this.props.dispatch(actions.getArtworks(context))
  }
  renderSquares () {
    return (
      <div>
        {this.props.artworks.map((artwork, i) => (
          <ArtSquare key={i} artwork={artwork} />
        ))}
      </div>
    )
  }
  render () {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        hasMore={this.props.hasMore}
        loader={<div className='loader'>Loading ...</div>}
      >
        {this.renderSquares()}
      </InfiniteScroll>
    )
  }
}

export default ArtGrid
