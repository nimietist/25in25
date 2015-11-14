import { Router } from 'express'
import { User } from 'app/models'
import usersArtworks from './users/artworks'

const users = new Router()

users.use('/:username', usersArtworks)

users.get('/:username', (req, res) => {
  let query = { username: req.params.username }
  if (req.user && req.params.username === 'current') {
    query = {id: req.user.id}
  }
  new User(query).fetch().then(user => {
    if (!user) return res.status(404).send('Not Found')
    res.send(user.info())
  })
})

users.post('/', (req, res) => {
  User.where({username: req.body.username}).fetch().then(function (user) {
    if (user) {
      return res.send(401, 'Already exists')
    }
    User.forge({
      username: req.body.username,
      password: req.body.password
    }).save().then(user => {
      res.status(201).send(user.info())
    })
  })
})

users.get('/', (req, res) => {
  res.send(req.user)
})

export default users
