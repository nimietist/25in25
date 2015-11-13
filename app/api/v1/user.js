import passport from 'passport'
require('../middleware')
import { Router } from 'express'

const users = new Router()

users.post('/', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.send(req.user)
})

users.get('/:id', (req, res) => {
  res.send(req.params.id)
})

export default users
