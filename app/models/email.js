import { Model } from './database'
import User from './user'

const Email = Model.extend({
  tableName: 'emails',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(User)
  }
})

export default Email
