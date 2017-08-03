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
  })
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('passwordtwo', salt);
    return Promise.join(
      knex('users').insert({
        username: 'kelly',
        email: 'kelly@mate.org',
        password: hash,
        admin: true
      })
    );
  });
};
