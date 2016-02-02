import uuid from 'uuid'
import { pick } from 'lodash'
import bcrypt from 'bcrypt'
import { Model } from './database'
import Artwork from './artwork'

const User = Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function () {
    this.on('creating', this.initPassword, this)
  },
  whitelist: [
    'id', 'username', 'email', 'created_at', 'uuid', 'email_setting'
  ],
  info () {
    let lot = pick(this.toJSON(), this.whitelist)
    lot.image_url = this.imageUrl()
    return lot
  },
  imageUrl () {
    let key = this.get('s3_key')
    return key ? `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/images/${key}` : ''
  },

  initPassword (model, attrs, options) {
    model.set('uuid', uuid.v4())
    if (model.get('password')) {
      model.savePassword(model.get('password'))
    }
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
  },

  follows: function () {
    return this.belongsToMany(User, 'followers', 'user_id', 'follower_id')
  },
  followers: function () {
    return this.belongsToMany(User, 'followers', 'follower_id', 'user_id')
  },
  artworks: function () {
    return this.hasMany(Artwork)
  }
})

export default User
