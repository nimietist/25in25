import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import InfiniteScroll2 from 'react-infinite-scroll2'
import { groupBy } from 'lodash'
import ArtSquare from './art-square'
import * as actions from '../actions'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const InfiniteScroll = InfiniteScroll2(React, ReactDOM)

@connect(state => ({
  artworks: state.artworks.artworks,
  hasMore: state.artworks.hasMore
}))
class ArtGrid extends React.Component {
  static propTypes = {
    artworks: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    context: PropTypes.object,
    hasMore: PropTypes.bool,
    group: PropTypes.bool,
    dispatch: PropTypes.func
  }
  componentDidMount () {
    this.props.dispatch(actions.getArtworks(this.props.context || {}))
  }
  loadMore = (page) => {
    let context = {...(this.props.context || {}), page}
    this.props.dispatch(actions.getArtworks(context))
  }
  renderGroupedSquares () {
    let grouped = groupBy(this.props.artworks || [], art => {
      let date = new Date(art.created_at)
      let month = `0${date.getMonth()}`.slice(-2)
      return `${date.getFullYear()}-${date.getMonth()}`
    })
    let sortedKeys = Object.keys(grouped).sort().reverse()
    return (
      <div>
        {sortedKeys.map(key => {
          let [year, month] = key.split('-')
          let title = `${months[month]} ${year}`
          return this.renderSquares(grouped[key], title)
        })}
      </div>
    )
  }
  renderSquares (artworks, title) {
    artworks = artworks || []
    return (
      <div key={title}>
        {title && <h2>{title}</h2>}
        {artworks.map((artwork, i) => (
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
        {this.props.group ? this.renderGroupedSquares(): this.renderSquares(this.props.artworks)}
      </InfiniteScroll>
    )
  }
}

export default ArtGrid
