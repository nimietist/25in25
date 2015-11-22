
exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.string('facebook_id').index()
    t.string('twitter_id').index()
    t.string('google_id').index()
    t.string('image_url').index()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('facebook_id')
    t.dropColumn('twitter_id')
    t.dropColumn('google_id')
    t.dropColumn('image_url')
  })
}
