module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      // Informações do banco de dados local
      database: 'linkart',
      user:     'linkart',
      password: 'LinkArt'
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};
