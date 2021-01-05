
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          name_user: 'Guilherme Castelo',
          username_user: 'castelogui',
          email_user: 'guilherme@gmail.com',
          password_user: '12345',
          occupation_user: 'Baterista',
          uf_user: 'RO',
          city_user: 'Ariquemes'  
        },
        {
          name_user: 'Rafael de Melo',
          username_user: 'rafalopesdemelo',
          email_user: 'rafael@gmail.com',
          password_user: '12345',
          occupation_user: 'Baixista',
          uf_user: 'SP',
          city_user: 'São Paulo'  
        },
        {
          name_user: 'Pedro Souza',
          username_user: 'pedro',
          email_user: 'pedro@gmail.com',
          password_user: '12345',
          occupation_user: 'Desenhista',
          uf_user: 'RO',
          city_user: 'Porto Velho'  
        },
      ]);
    });
};
