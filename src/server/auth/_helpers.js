const bcrypt = require('bcryptjs');
const knex = require('../db/knex');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash,
    email: req.body.email
  })
  .returning('*');
}

module.exports = {
  comparePass,
  createUser
};
