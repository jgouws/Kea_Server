const express = require('express');
const router = express.Router();
const knex = require('../../../src/server/db/knex');

const indexController = require('../controllers/displayobservations');

router.get('/', function (req, res, next) {
  
  //window.onload.alert("Hi there");
  const renderObject = {};
  renderObject.title = 'Export Data';
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
