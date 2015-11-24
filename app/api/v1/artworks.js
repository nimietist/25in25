import slugger from 'slug'
import { Router } from 'express'
import { Artwork } from 'app/models'

const router = new Router()

router.get('/', (req, res) => {
  if (req.user) {
    // show preferenced artwork
  }
  const { limit = 50, offset = 0 } = req.query
  Artwork.collection().query({
    username: req.params.username, limit, offset
  }).fetch().then(artworks => {
    if (!artworks) { return res.send(401, 'Not found') }
    res.send(artworks.map(a => a.info()))
  })
})

router.post('/', (req, res) => {
  if (!req.user) {
    res.status(401, 'Unauthorized')
  }
  // validation here: public_image_id|soundcloud_track_id|vimeo_id
  const type = req.body.cloudinary_image_id ? 'image' : req.body.soundcloud_track_id ? 'music' : req.body.vimeo_id ? 'video' : 'words'
  let slug = slugger(req.body.title)
  getUniqueSlug(slug).then(slug => {
    Artwork.forge({
      user_id: req.user.id,
      cloudinary_image_id: req.body.cloudinary_image_id,
      soundcloud_track_id: req.body.soundcloud_track_id,
      vimeo_id: req.body.vimeo_id,
      words: req.body.words,
      title: req.body.title,
      description: req.body.description,
      slug: slug,
      type
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