import passport from 'passport'
import { get, extend } from 'lodash'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { User } from '../models'

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  new User({ id }).fetch().then(function (user) {
    done(null, user.toJSON())
  })
})

// Local

passport.use(new LocalStrategy(
  function (username, password, done) {
    new User({ username }).fetch().then(function (user) {
      if (!user) { return done(null, false) }
      if (!user.verifyPassword(password)) { return done(null, false) }
      return done(null, user)
    })
  }
))

// Google

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.HOST}/auth/google/callback`
}, function (token, tokenSecret, profile, done) {
  // console.error('profile', profile)
  findUser({ google_id: profile.id }, {
    // email: profile.emails[0].value,
    image_url: get(profile, 'photos[0].value')
  }, done)
}))

// Facebook

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.HOST}/auth/facebook/callback`,
  enableProof: false
}, function (accessToken, refreshToken, profile, done) {
  // console.error('profile', profile)
  findUser({ facebook_id: profile.id }, {
    // email: profile._json.email,
    image_url: `https://graph.facebook.com/${profile.id}/picture?type=large`
  }, done)
}))

// Twitter

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: `${process.env.HOST}/auth/twitter/callback`
}, function (token, tokenSecret, profile, done) {
  // console.error('profile', profile)
  findUser({ twitter_id: profile.id }, {
    username: profile.username,
    image_url: get(profile, 'photos[0].value')
  }, done)
}))

function findUser (args, profile, done) {
  new User(args).fetch().then(function (user) {
    if (!user) {
      User.forge(extend(args, profile)).save().then(user => {
        done(null, user)
      })
    } else {
      user.save(profile).then(() => {
        done(null, user)
      }).catch((err) => {
        console.error(err)
        done(null, false)
      })
    }
  })
}
// Auth methods
export const auth = passport.authenticate('local')
export const apiAuth = passport.authenticate('local', { session: false })

export const optionalAuth = function (callback) {
  passport.authenticate('local', callback)
}
