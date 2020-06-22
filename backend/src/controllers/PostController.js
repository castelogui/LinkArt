const knex = require("../database");

module.exports = {
  async index(request, response){
    const posts = await knex('users')
      .join('posts', 'users.id', '=', 'posts.user_id')
      .select( 'posts.*', 'users.username', 'users.name');  
    return response.json(posts);
  },

  async detail(request, response){
    const { username, id } = request.params;
    
    const [post] = await knex('users')
      .join('posts', `users.id`, '=', `posts.user_id`)
      .where('posts.id', id)
      .andWhere('users.username', username)
      .select('posts.*', 'users.username', 'users.name');
    
    if(!post){
      return response.json({ error: `User ${username} no have this post ${id}` })
    }
    return response.json(post);
  },

  async create(request, response){
    const { username } = request.params;
    const id = request.headers.authorization;

    const { text, archive } = request.body;

    const [ user ] = await knex('users')
      .where('id', id)
      .select('username', 'id');

    if(user.username !== username){
      return response.json({error: 'Error, you are not authorized'});
    }

    await knex('posts')
      .where('user_id', id)
      .insert({text, archive, user_id: id});
    
    return response.json({ message: 'Post created successfully' });
  },

  async update(request, response){
    const { username, id } = request.params; // Busca username do user e o id do post

    const [ user ] = await knex('users')
      .join('posts', 'users.id', '=', 'posts.user_id')
      .where('posts.id', id)
      .select('username'); // Seleciona o username para autenticação

    if(user.username !== username){
      return response.json({error: 'Error, you are not authorized'}); // Retorna um erro de autorização
    }

    const { text } = request.body; // Por enquanto só será possível alterar o texto do post
    const updated_post =  knex.fn.now(); // Atualiza a data de update

    const post_update = await knex('posts')
      .where('id', id)
      .update({ text, updated_post }); // Faz o update no banco
    
    const post = await knex('posts')
      .where('id', post_update)
      .select('*'); // Seleciona o post para visualização dos dados

    return response.json(post);
  }
}