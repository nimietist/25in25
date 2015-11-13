exports.seed = function (knex, Promise) {
  return Promise.join(
    knex('users').del(),
    knex('users').insert({id: 1, username: 'name1'}),
    knex('users').insert({id: 2, username: 'name2'}),
    knex('users').insert({id: 3, username: 'name3'})
  )
}
