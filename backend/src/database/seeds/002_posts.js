
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          text: 'Teste de texto para o post',
          archive: '"link do arquivo (foto, video, audio)"',
          user_id: 1
        },
        {
          text: 'Teste de texto para o post',
          archive: '"link do arquivo (foto, video, audio)"',
          user_id: 1
        },
        {
          text: 'Teste de texto para o post',
          archive: '"link do arquivo (foto, video, audio)"',
          user_id: 2
        },
        {
          text: 'Teste de texto para o post',
          archive: '"link do arquivo (foto, video, audio)"',
          user_id: 2
        },
        {
          text: 'Teste de texto para o post',
          archive: '"link do arquivo (foto, video, audio)"',
          user_id: 3
        },
        {
          text: 'Teste de texto para o post',
          archive: '"link do arquivo (foto, video, audio)"',
          user_id: 3
        }
      ]);
    });
};
