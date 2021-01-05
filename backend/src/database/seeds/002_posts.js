
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      // Inserts seed entries
      return knex('post').insert([
        {
          id_post: null,
          created_post: null,
          updated_post: null,
          text_post: 'Teste de texto para o post',
          archive_post: '"link do arquivo (foto, video, audio)"',
          id_user_fk: 1
        },
        {
          id_post: null,
          created_post: null,
          updated_post: null,
          text_post: 'Teste de texto para o post',
          archive_post: '"link do arquivo (foto, video, audio)"',
          id_user_fk: 1
        },
        {
          id_post: null,
          created_post: null,
          updated_post: null,
          text_post: 'Teste de texto para o post',
          archive_post: '"link do arquivo (foto, video, audio)"',
          id_user_fk: 2
        },
        {
          id_post: null,
          created_post: null,
          updated_post: null,
          text_post: 'Teste de texto para o post',
          archive_post: '"link do arquivo (foto, video, audio)"',
          id_user_fk: 2
        },
        {
          id_post: null,
          created_post: null,
          updated_post: null,
          text_post: 'Teste de texto para o post',
          archive_post: '"link do arquivo (foto, video, audio)"',
          id_user_fk: 3
        },
        {
          id_post: null,
          created_post: null,
          updated_post: null,
          text_post: 'Teste de texto para o post',
          archive_post: '"link do arquivo (foto, video, audio)"',
          id_user_fk: 3
        }
      ]);
    });
};
