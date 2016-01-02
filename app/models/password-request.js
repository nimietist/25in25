import uuid from 'uuid'
import { Model } from './database'

const Follower = Model.extend({
  tableName: 'followers',
  hasTimestamps: true,
  initialize: function () {
    this.on('creating', (model, attrs, options) => {
      model.set('uuid', uuid.v4())
    }, this)
  }
})

export default Follower
