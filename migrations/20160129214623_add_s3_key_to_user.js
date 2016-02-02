
exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.string('s3_key')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('s3_key')
  })
}
