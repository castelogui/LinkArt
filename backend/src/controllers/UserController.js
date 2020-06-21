const knex = require('../database');

module.exports = {
  async index(request, response){
    const { username } = request.params;

    const user = await knex('users')
      .where('username', username)
      .select(
        'id',
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
  
  async update(request, response){ // Controle de updates para dados mais comuns, não sensíveis
    const id = request.headers.authorization; // Requesita o id de autorização no header
    
    const { username } = request.params; // Busca o username do param
    
    const user = await knex('users').where('id', id)
      .select('username').first(); // Busca o username de acordo com o id requesitado do header
   
    if(user.username !== username){ // Confere o username de acordo o id é o mesmo do param
      return response.json({ error: 'Not permitted!'}); // Caso não for, retorna que não é permitido
    }
    
    // Recebe do body como objeto os dados a serem atualizados 
    // **Por enquanto não da pra alterar o USERNAME**
    // Pretendo criar outra rota para tratar de dados mais sensíveis
    const user_update = { name, email, password, occupation, uf, city } = request.body;

    try{
      await knex('users').where('id', id).update(user_update);// Aguarda conexão para atualizar os dados
      return response.json({ update: user_update }); // Retorna os dados que foram atualizados
    }catch(err){
      return response.json(err); // Retorna o erro caso aconteça
    }
  }
}