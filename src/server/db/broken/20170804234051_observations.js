exports.up = (knex, Promise) => {
  return knex.schema.createTable('observations', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE').index();
    table.string('image_url').unique().notNullable();
    table.string('species').notNullable();
    table.string('description').notNullable();
    table.boolean('approved').notNullable().defaultTo(false);
    table.double('latitude').notNullable();
    table.double('longitude').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('observations');
};
