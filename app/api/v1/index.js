import { Router } from 'express'
import users from './users'
import artworks from './artworks'
import cloudinary from './cloudinary'
import session from './session'

const router = new Router()
router.use('/users', users)
router.use('/artworks', artworks)
router.use('/cloudinary', cloudinary)
router.use('/', session)

export default router
