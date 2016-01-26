import User from './user'
import Comment from './comment'
import { Model } from './database'
import { extend } from 'lodash'

const Artwork = Model.extend({
  tableName: 'artworks',
  hasTimestamps: true,
  whitelist: [],
  info () {
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
