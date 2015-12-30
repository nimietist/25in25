import User from './user'
import Comment from './comment'
import { Model } from './database'
import { extend } from 'lodash'
// import cloudinary from 'cloudinary'

const Artwork = Model.extend({
  tableName: 'artworks',
  hasTimestamps: true,
  whitelist: [],
  info () {
    console.error('user', this.user())
    return extend(this.toJSON(), {
      username: this.related('user').get('username'),
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
    let key = this.get('s3_key')
    return key ? `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/images/${key}` : ''
  },
  const: ['image', 'music', 'words', 'video']
})

export default Artwork

// cloudinary.config({
//   cloud_name: 'twentyfive',
//   api_key: '478151949962355',
//   api_secret: 'frPFTdQxsCaZezVn6SFQA831bBc'
// })
