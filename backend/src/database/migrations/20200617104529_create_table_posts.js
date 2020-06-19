exports.up = knex => knex.schema.createTable('posts', table =>  {
  table.increments('id');

  table.timestamp('created_post').defaultTo(knex.fn.now());
  table.timestamp('updated_post').defaultTo(knex.fn.now());
  table.text('text');
  table.string('archive');

  table.integer('user_id').notNullable();

  table.foreign('user_id').references('id').inTable('users');
});

exports.down = knex => knex.schema.dropTable('posts');
