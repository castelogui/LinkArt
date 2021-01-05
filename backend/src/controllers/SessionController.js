const knex = require('../database');

module.exports = {
  async index(request, response){
    // Requesita os dados para login
    const { username, password } = request.body;

    // Aguarda a conexão buscando o dados enviados do body
    const user = await knex('user')
      .where('username_user', username)
      .andWhere('password_user', password)
      .select('id_user','name_user','username_user','email_user') // seleciona dados do user em questão
      .first();
    
    // Se não existir um user com aqueles dados
    if(!user){
      return response.status(400).json({ error: 'Username or password invalided!'})
    }

    const message = `Sucessefull login from ${username}`;
    return response.json({ message: message, user});
  }
}