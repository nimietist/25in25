
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (t) {
    t.increments()
    t.timestamps()
    t.uuid('uuid')
    t.string('username').unique()
    t.string('password')
    t.string('email').unique()
    t.index('username')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
