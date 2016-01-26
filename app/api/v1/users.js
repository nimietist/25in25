import { Router } from 'express'
import { User } from 'app/models'
import usersArtworks from './users/artworks'

const users = new Router()

users.get('/exists/:username', (req, res) => {
  new User({username: req.params.username}).fetch().then(user => {
    res.send({exists: !!user})
  })
})

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
      username: req.body.username.trim(),
      password: req.body.password
    }).save().then(user => {
      res.status(201).send(user.info())
    })
  })
})

users.put('/:id', (req, res) => {
  if (req.user.id !== Number(req.params.id)) {
    return res.status(401).send('401 Forbidden')
  }
  User.where({ id: req.params.id }).fetch().then(function (user) {
    if (!user) {
      return res.status(404).send('No such user')
    }

    if (req.body.passwordNew && req.body.password) {
      if (user.verifyPassword(req.body.password)) {
        user.savePassword(req.body.passwordNew)
      }
    }
    user.save({
      email: req.body.email,
      email_setting: req.body.email_setting
    }).then(user => {
      res.status(200).send(user.info())
    }).catch(err => {
      console.error(err)
      res.status(401).send({error: 'That email exists already'})
    })
  })
})

users.get('/', (req, res) => {
  res.send(req.user)
})

export default users
