exports.up = (knex, Promise) => {
  return knex.schema.createTable('observations', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.string('image_url').unique().notNullable();
    table.string('observation_type').notNullable();
    table.string('description').notNullable();
    table.boolean('approved').notNullable().defaultTo(false);
    table.string('latitude').notNullable();
    table.string('longitude').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('observations');
};
