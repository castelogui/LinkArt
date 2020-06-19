
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          username: 'castelogui',
          text: 'Teste de texto para o post',
          archive: '"link do arquivo (foto, video, audio)"'
        },
        {
          username: 'rafalodedemelo',
          text: 'Teste de texto para o post',
          archive: '"link do arquivo (foto, video, audio)"'
        }
      ]);
    });
};
