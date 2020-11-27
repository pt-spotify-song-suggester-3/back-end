// Update with your config settings.
const pgConnection = process.env.DATABASE_URL

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/SSS.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './database/seeds' },
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations",
    }
  }

};
