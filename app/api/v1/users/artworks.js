import { Router } from 'express'
import { Artwork } from 'app/models'

const router = new Router()

router.get('/:slug', (req, res) => {
  new Artwork({ slug: req.params.slug }).fetch().then(artworks => {
    res.send(artworks.map(a => a.info()))
  })
})

export default router
