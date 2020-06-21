const knex = require("../database");
const { where } = require("../database");

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
  }
}