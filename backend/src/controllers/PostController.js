const knex = require("../database");

module.exports = {
  async index(request, response) {
    const post = await knex("user")
      .join("post", "user.id_user", "=", "post.id_user_fk")
      .select("post.*", "user.username_user", "user.name_user");
    return response.json(post);
  },

  async onePost(request, response) {
    const { id } = request.params;

    const post = await knex("user")
      .join("post", "user.id_user", "=", "post.id_user_fk")
      .select("post.*", "user.username_user", "user.name_user")
      .where("post.id_post", "=", id);
    return response.json(post);
  },

  async detail(request, response) {
    const { username, id } = request.params;

    const [post] = await knex("user")
      .join("post", `user.id_user`, "=", `post.id_user_fk`)
      .where("post.id_post", id)
      .andWhere("user.username_user", username)
      .select("post.*", "user.username_user", "user.name_user");

    if (!post) {
      return response.json({
        error: `User ${username_user} no have this post ${id_post}`,
      });
    }
    return response.json(post);
  },

  async create(request, response) {
    const { username } = request.params;
    const id = request.headers.authorization;

    const { text_post, archive_post } = request.body;

    const [user] = await knex("user")
      .where("id_user", id)
      .select("username_user", "id_user");

    if (user.username_user !== username) {
      return response.json({ error: "Error, you are not authorized" });
    }

    await knex("post")
      .where("id_user_fk", id)
      .insert({ text_post, archive_post, id_user_fk: id });

    return response.json({ message: "Post created successfully" });
  },

  async update(request, response) {
    const { username, id } = request.params; // Busca username do user e o id do post

    const [user] = await knex("user")
      .join("post", "user.id_user", "=", "post.id_user_fk")
      .select("username_user")
      .where("id_post", id); // Seleciona o username para autenticação

    if (user.username_user !== username) {
      return response.json({ error: "Error, you are not authorized" }); // Retorna um erro de autorização
    } else {
      const { text_post } = request.body; // Por enquanto só será possível alterar o texto do post
      const updated_post = knex.fn.now(); // Atualiza a data de update

      try {
        await knex("post")
          .update({ text_post, updated_post })
          .where("id_post", id); // Faz o update no banco

        const post = await knex("post")
          .select("*")
          .where("id_post", id); // Seleciona o post para visualização dos dados

        return response.json({message: `Post ${id} atualizado com Sucesso!`, update: post});
      } catch (error) {
        return response.json(error);
      }
    }
  },

  async delete(request, response) {
    const { username_user, id_post } = request.params; // Busca username do user e o id do post

    const [user] = await knex("user")
      .join("post", "user.id_user", "=", "post.id_user_fk")
      .where("post.id_post", id_post)
      .select("username_user"); // Seleciona o username para autenticação

    if (user.username_user !== username_user) {
      return response.json({ error: "Error, you are not authorized" }); // Retorna um erro de autorização
    }

    await knex("post").where("id_post", id_post).delete();

    return response.json({ message: "Post deleted!" });
  },
};
