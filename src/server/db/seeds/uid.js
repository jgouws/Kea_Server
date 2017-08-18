
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('uid').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('uid').insert({value: 0})
      ]);
    });
};
