import { Router } from 'express'
import { default as debugScope } from 'debug'
import { Artwork } from 'app/models'

const debug = debugScope('cloudinary')
const cloudinary = new Router()

cloudinary.get('/', (req, res) => {
  debug('getting', req.query);
  // Artwork.find
  res.send({success: true})
})

export default cloudinary
