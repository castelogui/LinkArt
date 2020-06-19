exports.up = knex => knex.schema.createTable('posts', table =>  {
  table.increments('id');
  table.string('username').unique().notNullable();
  table.timestamp('created_post').defaultTo(knex.fn.now());
  table.timestamp('updated_post').defaultTo(knex.fn.now());
  table.text('text');
  table.string('archive');
});

exports.down = knex => knex.schema.dropTable('posts');
