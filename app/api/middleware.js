import passport from 'passport'
import LocalStrategy from 'passport-local'
import { User } from '../models'

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

export const auth = passport.use(new LocalStrategy(
  function (username, password, done) {
    console.error('auth', username, password)
    User.where({ username: username }).fetch().then(function (user) {
      if (!user) { return done(null, false) }
      if (!user.verifyPassword(password)) { return done(null, false) }
      return done(null, user)
    })
  }
))
