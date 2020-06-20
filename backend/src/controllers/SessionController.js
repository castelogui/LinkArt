const knex = require('../database');

module.exports = {
  async index(request, response){
    // Requesita os dados para login
    const { username, password } = request.body;

    // Aguarda a conexão buscando o dados enviados do body
    const user = await knex('users')
      .where('username', username)
      .andWhere('password', password)
      .select('id','name','username','email') // seleciona dados do user em questão
      .first();
    
    // Se não existir um user com aqueles dados
    if(!user){
      return response.status(400).json({ error: 'Username or password invalided!'})
    }

    const message = `Sucessefull login from ${username}`;
    return response.json({ message: message, user});
  }
}