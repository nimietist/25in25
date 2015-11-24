import React, { PropTypes } from 'react'
import ArtSquare from './art-square'

class ArtGrid extends React.Component {
  static propTypes = {
    artworks: PropTypes.array
  }
  render () {
    return (
      <div>
        {
          this.props.artworks.map(artwork => (
            <ArtSquare
              key={artwork.title}
              artwork={artwork}
              />
          )
        )}
      </div>
    )
  }
}

export default ArtGrid
