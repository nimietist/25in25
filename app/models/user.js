import { Model } from './database'

const User = Model.extend({
  tableName: 'users',
  email: {
    type: String,
    index: true
  },
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  verifyPassword (password) {
    return this.attributes.password === password
  }
})

export default User
