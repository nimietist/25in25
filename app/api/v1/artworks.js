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
    orderBy: ['created_at', 'DESC'],
    limit: Number(limit),
    offset: (Number(page) - 1) * limit
  }

  if (req.params.username) {
    query.username = req.params.username
  }
  Artwork.collection().query(query).fetch({withRelated: ['user']}).then(artworks => {
    if (!artworks) { return res.send(401, 'Not found') }
    res.send(artworks.map(a => a.info()))
  })
})

router.get('/:id', (req, res) => {
  Artwork.where({slug: req.params.id}).fetch({withRelated: ['user']}).then(artwork => {
    if (!artwork) { return res.status(404).send('Not Found') }
    res.send(artwork.info())
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
      slug
      // type
    }).save().then(artwork => {
      res.status(201).send(artwork.info())
    })
  })
})

function getUniqueSlug (slug, count) {
  return new Artwork({ slug }).fetch({withRelated: ['user']}).then(artwork => {
    if (!artwork) {
      return slug
    } else {
      count = count || 0
      count += 1
      return getUniqueSlug(slug + count, count)
    }
  })
}

router.put('/:id', (req, res) => {
  Artwork.where({slug: req.params.id}).fetch().then(artwork => {
    if (!artwork) { return res.status(404).send('Not Found') }
    if (artwork.user_id !== req.user.id) { return res.status(403).send('Forbidden') }
    res.send(artwork.info())
  })
})

export default router
