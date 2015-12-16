import { Router } from 'express'
import { default as debugScope } from 'debug'
import { Artwork } from 'app/models'

const debug = debugScope('25in25:cloudinary')
const cloudinary = new Router()

cloudinary.all('/', (req, res) => {
  debug('getting', req.query);
  console.error('getting query', req.query)
  console.error('getting params', req.params)
  console.error('getting body', req.body)
  // Artwork.find
  res.send({success: true})
})

export default cloudinary
