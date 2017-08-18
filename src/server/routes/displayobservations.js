const express = require('express');
const router = express.Router();
const knex = require('../../../src/server/db/knex');

const indexController = require('../controllers/displayobservations');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express! displayobservations';
  renderObject.list = ['a','b','c'];
  renderObject.rows = [];

  var query = knex.select('*').from('observations').then(function(result) {
      for (var i = 0 ; i < result.length; i++) {
        var newRow = [result[i].id, result[i].species, result[i].description, result[i].image_url];
        renderObject.rows.push(newRow);
      }

      res.render('displayobservations', renderObject);
    });
  //console.log(query);

});

module.exports = router;
