import passport from 'passport'
import {Router} from 'express'

const router = new Router()

const redirect = {
  successRedirect: '/',
  failureRedirect: '/login'
}

// AUTHENTICATION
router.get('/auth/google', passport.authenticate('google', { scope: 'email' }))
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/auth/twitter', passport.authenticate('twitter', {}))

// AUTHORIZATION
router.get('/auth/google/callback', passport.authenticate('google', redirect))
router.get('/auth/facebook/callback', passport.authenticate('facebook', redirect))
router.get('/auth/twitter/callback', passport.authenticate('twitter', redirect))

export default router
