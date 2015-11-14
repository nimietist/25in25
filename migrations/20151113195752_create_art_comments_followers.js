
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('artworks', function (t) {
      t.increments()
      t.timestamps()
      t.uuid('uuid')
      t.integer('user_id').index().references('id').inTable('users')
      t.enu('type', ['image', 'music', 'words', 'video'])
      t.string('title')
      t.text('description', 'mediumtext')
      t.text('words', 'longtext')
      t.string('cloudinary_image_id')
      t.string('soundcloud_track_id')
      t.string('vimeo_id')
      t.smallint('private')
    }),
    knex.schema.createTable('followers', function (t) {
      t.increments()
      t.timestamps()
      t.uuid('uuid')
      t.integer('user_id').index().references('id').inTable('users')
      t.integer('follower_user_id').index().references('id').inTable('users')
      t.unique('user_id', 'follower_id')
    }),
    knex.schema.createTable('comments', function (t) {
      t.increments()
      t.timestamps()
      t.uuid('uuid')
      t.integer('user_id').index().references('id').inTable('users')
      t.integer('artwork_id').index().references('id').inTable('artworks')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE artworks CASCADE'),
    knex.raw('DROP TABLE followers CASCADE'),
    knex.raw('DROP TABLE comments CASCADE')
  ])
}
