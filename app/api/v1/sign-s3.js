import { Router } from 'express'
// import { default as debugScope } from 'debug'
import AWS from 'aws-sdk'
import uuid from 'uuid'

// const debug = debugScope('25in25:cloudinary')
const router = new Router()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

router.get('/', (req, res) => {
  if (!req.user) { return res.status(401).send('Unauthorized') }
  let { file_type } = req.query
  let key = uuid.v4()
  let s3 = new AWS.S3({computeChecksums: false})
  let s3_params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `images/${key}`,
    Expires: 60,
    ContentType: file_type,
    ACL: 'public-read'
  }
  s3.getSignedUrl('putObject', s3_params, (err, url) => {
    if (err) { return res.status(401).send(err) }
    let image_url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/images/${key}`
    res.send({ key, url, image_url })
  })
})

export default router
