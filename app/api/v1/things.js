import { Router } from 'express'

const router = new Router()

router.use('*', function (req, res) {
  res.send({
    something: 'good'
  })
})

export default router
