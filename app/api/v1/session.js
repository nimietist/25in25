import { Router } from 'express'
import { apiAuth } from '../middleware'

const session = Router()

session.post('/login', apiAuth, (req, res) => {
  res.send({success: true})
})

session.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

export default session
