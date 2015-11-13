import { pick } from 'lodash'
import bcrypt from 'bcrypt'
import { Model } from './database'

const User = Model.extend({
  tableName: 'users',
  initialize: function () {
    this.on('creating', this.initPassword, this)
  },
  whitelist: [
    'username', 'email', 'created_at', 'uuid'
  ],
  info () {
    return pick(this.toJSON(), this.whitelist)
  },
  initPassword (model, attrs, options) {
    model.savePassword(model.get('password'))
  },
  savePassword (password = '') {
    this.set('salt', bcrypt.genSaltSync(10))
    this.set('password', this.createPassword(password))
  },
  createPassword (password = '') {
    return bcrypt.hashSync(password, this.get('salt'))
  },
  verifyPassword (password) {
    return this.get('password') === this.createPassword(password)
  }
})

export default User
