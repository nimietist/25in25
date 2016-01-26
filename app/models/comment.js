import User from './user'
import Artwork from './artwork'
import { Model } from './database'

const Comment = Model.extend({
  tableName: 'artworks',
  hasTimestamps: true,
  info: function () {
    return this.toJSON()
  },
  user () {
    return this.belongsTo(User)
  },
  artwork () {
    return this.belongsTo(Artwork)
  }
})

export default Comment
