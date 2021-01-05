
exports.up = function(knex) {
  return knex.schema
  .createTable('user', table => {
    table.increments('id_user').primary();
    table.string('name_user').notNullable();
    table.string('username_user').unique().notNullable();
    table.string('email_user').notNullable();
    table.string('password_user').notNullable();
    table.string('occupation_user').notNullable();
    table.string('uf_user').notNullable();
    table.string('city_user').notNullable();
  })
  
  .createTable('post', table =>  {
    table.increments('id_post');
  
    table.timestamp('created_post').defaultTo(knex.fn.now());
    table.timestamp('updated_post').defaultTo(knex.fn.now());
    table.text('text_post');
    table.string('archive_post');
  
    table.integer('id_user_fk').unsigned();
    table.foreign('id_user_fk').references('User.id_user');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('post').dropTable('user');
  
};
