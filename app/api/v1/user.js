// import _ from 'lodash'
import { Router } from 'express'
import { User } from 'app/models'

const users = new Router()

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
