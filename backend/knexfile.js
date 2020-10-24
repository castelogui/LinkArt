module.exports = {
  development: {
    client: 'mysql',
    connection: {
      // Informações do banco de dados local
      host: 'localhost:3306',
      database: 'linkart',
      user:     'root',
      password: 'admin'
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};
