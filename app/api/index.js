// TODO: import v1 controllers

import { Router } from 'express'
import users from './v1/user'
import session from './v1/session'

let router = new Router()
router.use('v1', users)
router.use('v1', session)

export default router
