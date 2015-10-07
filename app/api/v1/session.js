// TODO: add passport
import { Router } from 'express'

let session = Router()

session.get('/', (req, res) => {
  res.send([])
})

export default session
