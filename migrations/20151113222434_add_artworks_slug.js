
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (t) {
      t.text('biography')
    }),
    knex.schema.table('artworks', function (t) {
      t.string('slug').unique()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (t) {
      t.dropColumn('biography')
    }),
    knex.schema.table('artworks', function (t) {
      t.dropColumn('slug')
    })
  ])
}
