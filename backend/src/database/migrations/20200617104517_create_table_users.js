exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.string('username').unique().notNullable();
  table.string('email').notNullable();
  table.string('password').notNullable();
  table.string('occupation').notNullable();
  table.string('uf').notNullable();
  table.string('city').notNullable();
});

exports.down = knex => knex.schema.dropTable('users');
