
exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.boolean('email_setting')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('email_setting')
  })
}
