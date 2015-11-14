import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../models'

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  new User({ id }).fetch().then(function (user) {
    done(null, user.toJSON())
  })
})

passport.use(new LocalStrategy(
  function (username, password, done) {
    new User({ username }).fetch().then(function (user) {
      if (!user) { return done(null, false) }
      if (!user.verifyPassword(password)) { return done(null, false) }
      return done(null, user)
    })
  }
))

export const auth = passport.authenticate('local', {
  // failureRedirect: '/login'
})

export const apiAuth = passport.authenticate('local', {
  // session: false
})

export const optionalAuth = function (callback) {
  passport.authenticate('local', callback)
}
