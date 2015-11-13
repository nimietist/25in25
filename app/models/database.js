var knex = require('knex')
var bookshelf = require('bookshelf')
var knexfile = require('../../knexfile')

const pg = knex(knexfile[process.env.NODE_ENV])

const db = bookshelf(pg)

export default db
