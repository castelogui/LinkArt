module.exports = {
  development: {
    client: 'mysql',
    connection: {
      // Informações do banco de dados local
      host: 'endereço do host do banco',
      database: 'banco',
      user:     'usuário',
      password: 'senha do usuário'
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};
