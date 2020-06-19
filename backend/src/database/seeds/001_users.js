
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Guilherme Castelo',
          username: 'castelogui',
          email: 'guilherme@gmail.com',
          password: '12345',
          occupation: 'Baterista',
          uf: 'RO',
          city: 'Ariquemes'  
        },
        {
          name: 'Rafael de Melo',
          username: 'rafalopesdemelo',
          email: 'rafael@gmail.com',
          password: '12345',
          occupation: 'Baixista',
          uf: 'SP',
          city: 'São Paulo'  
        },
        {
          name: 'Pedro Souza',
          username: 'pedro',
          email: 'pedro@gmail.com',
          password: '12345',
          occupation: 'Desenhista',
          uf: 'RO',
          city: 'Porto Velho'  
        },
      ]);
    });
};
