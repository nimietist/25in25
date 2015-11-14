import { Router } from 'express'
import users from './user'
import session from './session'

const router = new Router()
router.use('/users', users)
router.use('/things', require('./things'))
router.use('/', session)

export default router
