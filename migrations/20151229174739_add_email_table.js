
exports.up = function (knex, Promise) {
  return Promise.all(
    knex.schema.createTable('emails', function (t) {
      t.increments()
      t.timestamps()
      t.uuid('uuid')
      t.string('job_id').unique()
      t.string('to')
      t.string('from')
      t.string('subject')
      t.string('template')
      t.string('reason')
      t.smallint('status').default(0)
      t.integer('user_id').index().references('id').inTable('users')
    }),
    knex.schema.createTable('password_requests', function (t) {
      t.increments()
      t.timestamps()
      t.uuid('uuid').unique()
      t.integer('user_id').index().references('id').inTable('users')
    })
  )
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('emails')
}
