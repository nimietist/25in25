import { Router } from 'express'
import { apiAuth } from '../middleware'

const session = Router()

session.post('/login', apiAuth, (req, res) => {
  res.send(req.user.info())
})

session.get('/logout', function (req, res) {
  req.logout()
  res.send({success: true})
})

session.get('/session', (req, res) => {
  res.send(req.session || {})
})

export default session
