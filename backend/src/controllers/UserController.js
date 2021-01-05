const knex = require("../database");

module.exports = {
  async index(request, response) {
    const { username } = request.params;

    const user = await knex("user")
      .where("username_user", username)
      .select("*");

    if (user.length === 0) {
      const error = `User '${username}' does not exist`;
      return response.status(400).json({ message: { error } });
    }

    return response.json(user);
  },

  async all(request, response) {
    const user = await knex("user").select("id_user", "username_user");

    const message =
      "Busque dados de apenas um user com a rota '/user/:username'";

    return response.json({ user: user, message: message });
  },

  async create(request, response) {
    const user = ({
      name_user,
      username_user,
      email_user,
      password_user,
      occupation_user,
      uf_user,
      city_user,
    } = request.body);

    try {
      // Primeiro ele tenta inserir os dados
      await knex("user").insert(user);

      return response.json({ username_user });
    } catch (e) {
      // Caso retornar algum erro , significa que já existe um username
      const err = e.detail;
      return response.json({ message: { err, e } });
    }
  },

  async update(request, response) {
    // Controle de updates para dados mais comuns, não sensíveis
    const id = request.headers.authorization; // Requesita o id de autorização no header

    const { username } = request.params; // Busca o username do param

    const user = await knex("user")
      .where("id_user", id)
      .select("username_user")
      .first(); // Busca o username de acordo com o id requesitado do header

    if (user.username_user !== username) {
      // Confere o username de acordo o id é o mesmo do param
      return response.json({ error: "Not permitted!" }); // Caso não for, retorna que não é permitido
    }

    // Recebe do body como objeto os dados a serem atualizados
    // **Por enquanto não da pra alterar o USERNAME**
    // Pretendo criar outra rota para tratar de dados mais sensíveis
    const user_update = ({
      name_user,
      email_user,
      password_user,
      occupation_user,
      uf_user,
      city_user,
    } = request.body);

    try {
      await knex("user").where("id_user", id).update(user_update); // Aguarda conexão para atualizar os dados
      return response.json({ update: user_update }); // Retorna os dados que foram atualizados
    } catch (err) {
      return response.json(err); // Retorna o erro caso aconteça
    }
  },
};
