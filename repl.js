require('envc')()
require('rootpath')()

import { Artwork } from './app/models'

new Artwork({ id: 1 }).fetch({withRelated: ['user']}).then(art => {
  console.log(art.related('user').toJSON())
})
