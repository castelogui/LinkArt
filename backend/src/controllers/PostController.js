const knex = require("../database");

module.exports = {
  async index(request, response){
    const posts = await knex('posts')
      .select('*');    
    return response.json(posts);
  }
}