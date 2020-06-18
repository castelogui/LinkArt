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
        'state',
        'city'
      );
    
    if (!user) {
      return response.status(400)
      .json({ error: 'No USER found with this username' });
    }

    return response.json(user)
  },
  
  async create(request, response){
    const user = {
      name,
      username,
      email,
      password,
      occupation,
      state,
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