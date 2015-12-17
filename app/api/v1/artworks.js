import slugger from 'slug'
import { Router } from 'express'
import { Artwork } from 'app/models'

const router = new Router()

router.get('/', (req, res) => {
  if (req.user) {
    // show preferenced artwork
  }
  const { limit = 50, page = 1 } = req.query
  const query = {
    limit: Number(limit),
    offset: (Number(page) - 1) * limit
  }

  if (req.params.username) {
    query.username = req.params.username
  }
  Artwork.collection().query(query).fetch().then(artworks => {
    if (!artworks) { return res.send(401, 'Not found') }
    res.send(artworks.map(a => a.info()))
  })
})

router.post('/', (req, res) => {
  if (!req.user) { return res.status(401).send('Unauthorized') }

  // validation here: public_image_id|soundcloud_track_id|vimeo_id
  // const type = req.body.cloudinary_image_id ? 'image' : req.body.soundcloud_track_id ? 'music' : req.body.vimeo_id ? 'video' : 'words'
  let slug = slugger(req.body.title)
  getUniqueSlug(slug).then(slug => {
    Artwork.forge({
      user_id: req.user.id,
      s3_key: req.body.s3_key,
      // cloudinary_image_id: req.body.cloudinary_image_id,
      // soundcloud_track_id: req.body.soundcloud_track_id,
      // vimeo_id: req.body.vimeo_id,
      words: req.body.words,
      title: req.body.title,
      description: req.body.description,
      type: 'image',
      slug,
      // type
    }).save().then(artwork => {
      res.status(201).send(artwork.info())
    })
  })
})

function getUniqueSlug (slug, count) {
  return new Artwork({ slug }).fetch().then(artwork => {
    if (!artwork) {
      return slug
    } else {
      count = count || 0
      count += 1
      return getUniqueSlug(slug + count, count)
    }
  })
}

export default router
