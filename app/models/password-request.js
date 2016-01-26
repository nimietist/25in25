import uuid from 'uuid'
import { Model } from './database'
import User from './user'

const PasswordRequest = Model.extend({
  tableName: 'password_requests',
  hasTimestamps: true,
  initialize: function () {
    this.on('creating', (model, attrs, options) => {
      model.set('uuid', uuid.v4())
    }, this)
  },
  user () {
    return this.belongsTo(User)
  }
})

export default PasswordRequest
