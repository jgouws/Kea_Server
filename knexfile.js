const databaseName = 'kakago';

module.exports = {
  aws_env: {
    client: 'pg',
    connection: {
      host: 'kakagodbinstance.co9uyqykwiln.us-west-1.rds.amazonaws.com',
      port: 5432,
      user: 'kakagoadmin',
      password: 'kkg12345',
      database: 'kakago'
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  development: {
    client: 'postgresql',
    connection: `postgres://localhost:5432/${databaseName}`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: `postgres://localhost:5432/${databaseName}_test`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
