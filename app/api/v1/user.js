// TODO: add passport
import { Router } from 'express'

let users = Router()

users.get('/', (req, res) => {
  res.send([])
})

users.get('/:id', (req, res) => {
  res.send(req.params.id)
})

export default users
