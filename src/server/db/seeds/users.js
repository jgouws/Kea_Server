const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('password', salt);
    return Promise.join(
      knex('users').insert({
        username: 'michael',
        email: 'michael@kotlyar.org',
        password: hash
      })
    );
  });
};
