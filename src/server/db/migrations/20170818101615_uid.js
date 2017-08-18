exports.up = (knex, Promise) => {
    return knex.schema.createTable('uid', (table) => {
      table.increments();
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('uid');
  };
  