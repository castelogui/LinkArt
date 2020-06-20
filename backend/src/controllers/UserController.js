const knex = require('../database');

module.exports = {
  async index(request, response){
    const { username } = request.params;

    const user = await knex('users')
      .where('username', username)
      .select(
        'name', 
        'username', 
        'occupation',
        'uf',
        'city'
      );
    
    if (user.length === 0) {
      const error = `User '${username}' does not exist`
      return response.status(400)
      .json({ message: {error} });
    }

    return response.json(user);
  },
  
  async all(request, response){
    const user = await knex('users')
      .select('id','username');
    
    const message = "Busque dados de apenas um user com a rota '/profile/:username'";
    
    return response.json({users: user, message: message});
  },
  
  async create(request, response){
    const user = {
      name,
      username,
      email,
      password,
      occupation,
      uf,
      city
    } = request.body;

    try {
      // Primeiro ele tenta inserir os dados
      await knex('users').insert(user);

      return response.json({ username });
    }catch(e){
      // Caso retornar algum erro , significa que já existe um username
      const err = e.detail
      return response.json({ message: {err, e} });
    }
  },

  async logon(request, response){
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