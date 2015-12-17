import { Router } from 'express'
import users from './users'
import artworks from './artworks'
import cloudinary from './cloudinary'
import signS3 from './sign-s3'
import session from './session'

const router = new Router()
router.use('/users', users)
router.use('/artworks', artworks)
router.use('/cloudinary', cloudinary)
router.use('/signS3', signS3)
router.use('/', session)

export default router
