const express = require('express');
const router = express.Router();
const knex = require('../../../src/server/db/knex');

const indexController = require('../controllers/displayobservations');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express! displayobservations';
  renderObject.rows = [];

  var query = knex.select('*').from('observations').then(function(result) {
    var temp = [];
    for (var i = 0 ; i < result.length; i++) {
      temp.push(result[i]);
    }
    renderObject.rows = temp;
    res.render('displayobservations', renderObject);

  });

});

module.exports = router;
