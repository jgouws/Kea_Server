const express = require('express');
const router = express.Router();
const knex = require('../../../src/server/db/knex');

const indexController = require('../controllers/exportobservations');

router.get('/', function (req, res, next) {
  var csv = '';

  var query = knex.select('*').from('observations').then(function(result) {
      for (var i = 0 ; i < result.length; i++) {
        csv += '' + result[i].id + ', ' + result[i].user_id + ', /uploaded/' + result[i].image_url;
        csv += ', ' + result[i].species + ', ' + result[i].description + ', ' + result[i].approved;
        csv += ', ' + result[i].latitude + ', ' + result[i].longitude + ', ' + result[i].description;
        csv += '\n';
        //renderObject.rows.push(newRow);
      }

      //res.render('displayobservations', renderObject);
      res.write(csv);
      res.end();

    });
});

module.exports = router;