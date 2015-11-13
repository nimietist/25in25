require('envc')()

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 1, max: 5 }
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
