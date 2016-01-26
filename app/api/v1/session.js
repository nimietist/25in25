import { Router } from 'express'
import { auth } from '../middleware'
import {User, PasswordRequest} from 'app/models'
import { queue } from 'app/lib/kue'

const session = Router()

session.post('/login', auth, (req, res) => {
  res.send(req.user.info())
})

session.get('/logout', function (req, res) {
  req.logout()
  res.send({success: true})
})

session.get('/session', (req, res) => {
  res.send(req.session || {})
})

session.post('/forgot', function (req, res) {
  User.where({email: req.body.email}).fetch().then(user => {
    if (!user) { return res.status(404).send('Not Found') }
    PasswordRequest.forge().save({user_id: user.id}).then(passwordRequest => {
      queue.create('email', {
        user_id: user.id,
        request_hash: passwordRequest.get('uuid'),
        to: user.get('email'),
        template: 'forgot'
      }).save()
      res.send({success: true})
    })
  })
})

session.post('/reset-password', function (req, res) {
  PasswordRequest.where({uuid: req.body.request_hash})
    .fetch({withRelated: ['user']})
    .then(passwordRequest => {
      if (!passwordRequest) return res.status(401).send('Unauthorized')
      const user = passwordRequest.related('user')
      user.savePassword(req.body.password)
      user.save().then(user => {
        res.send({success: true})
      }).catch(err => {
        console.err(err)
        res.send({error: 'Could not save password'})
      })
    })
})

export default session
