import User from './user'
import Comment from './comment'
import { Model } from './database'
import { extend } from 'lodash'
import cloudinary from 'cloudinary'

const Artwork = Model.extend({
  tableName: 'artworks',
  hasTimestamps: true,
  whitelist: [],
  info () {
    return extend(this.toJSON(), {
      image_url: this.imageUrl()
    })
  },
  user () {
    return this.belongsTo(User)
  },
  comments () {
    return this.hasMany(Comment)
  },
  imageUrl () {
    let url = this.get('cloudinary_image_url')
    return url ? cloudinary.url(url) : ''
  },
  const: ['image', 'music', 'words', 'video']
})

export default Artwork

// cloudinary.config({
//   cloud_name: 'twentyfive',
//   api_key: '478151949962355',
//   api_secret: 'frPFTdQxsCaZezVn6SFQA831bBc'
// })
