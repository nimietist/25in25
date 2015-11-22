import { Router } from 'express'
import { auth } from '../middleware'

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
  // TODO: verify email, save email record, send email confirmation with unique id
  res.send({success: true})
})

export default session
