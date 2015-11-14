import { Router } from 'express'
import users from './users'
import artworks from './artworks'
import session from './session'

const router = new Router()
router.use('/users', users)
router.use('/artworks', artworks)
router.use('/things', require('./things'))
router.use('/', session)

export default router
