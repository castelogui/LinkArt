const knex = require("../database");

module.exports = {
  async index(request, response){
    const posts = await knex('users')
      .join('posts', 'users.id', '=', 'posts.user_id')
      .select( 'posts.*', 'users.username', 'users.name');  
    return response.json(posts);
  }
}