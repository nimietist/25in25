import User from './user'
import Comment from './comment'
import { Model } from './database'

const Artwork = Model.extend({
  tableName: 'artworks',
  hasTimestamps: true,
  whitelist: [],
  info () {
    return this.toJSON()
  },
  user () {
    return this.belongsTo(User)
  },
  comments () {
    return this.hasMany(Comment)
  },
  const: ['image', 'music', 'words', 'video']
})

export default Artwork
