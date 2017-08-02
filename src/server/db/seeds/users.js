exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() => {
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({
        username: 'michael',
        password: 'password',
        email: 'michael@kotlyar.org'
      }),
      knex('users').insert({
        username: 'michaeltwo',
        password: 'passwordtwo',
        email: 'michael@kakakotlyar.org'
      })
    ]);
  });
};
