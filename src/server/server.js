(function() {

  'use strict';

  const app = require('./app');
  const debug = require('debug')('herman-express:server');
  const http = require('http');

  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  const knex = require('../../src/server/db/knex');

  //knex.migrate.latest();
  //knex.seed.run();


/*
var result = knex.schema.createTable('users', (table) => {
  table.increments();
  table.string('username').unique().notNullable();
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
  table.boolean('admin').notNullable().defaultTo(false);
  table.timestamp('created_at').defaultTo(knex.fn.now());
});
*/

  const server = http.createServer(app);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

}());
