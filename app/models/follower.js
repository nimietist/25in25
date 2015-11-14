import { Model } from './database'

const Follower = Model.extend({
  tableName: 'followers',
  hasTimestamps: true
})

export default Follower
