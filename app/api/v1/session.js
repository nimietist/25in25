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
    PasswordRequest.forge().save(passwordRequest => {
      queue.createJob('email', {
        user_id: user.id,
        request_hash: passwordRequest.uuid,
        to: user.email,
        template: 'forgot'
      })
      res.send({success: true})
    })
  })
})

session.post('/reset-password', function (req, res) {
  // TODO: verify passwords, save to user queried by unique id
  res.send({success: true})
})

export default session
