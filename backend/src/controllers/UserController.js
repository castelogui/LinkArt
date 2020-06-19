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
  }
}