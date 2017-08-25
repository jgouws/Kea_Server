exports.up = (knex, Promise) => {
  return knex.schema.createTable('uid', (table) => {
    table.increments();
    table.integer('value').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('uid');
};
