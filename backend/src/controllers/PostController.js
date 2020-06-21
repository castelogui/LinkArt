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
  }
}