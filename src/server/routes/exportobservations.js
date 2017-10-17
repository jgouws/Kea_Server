const express = require('express');
const router = express.Router();
const knex = require('../../../src/server/db/knex');
const indexController = require('../controllers/exportobservations');
const dataSelected = {};

// Exports the observations database as plain text csv format
router.get('/', function(req, res, next) {
  var csv = '';

  //var selected = req.body.
  //console.log(req.body);

  // Fetch contents of observations database
  var query = knex.select('*').from('observations').then(function(result) {
    // Creating each entry in csv (comma seperated values)
    for (var i = 0; i < result.length; i++) {
      csv += '' + result[i].id + ', ' + result[i].user_id + ', ' + result[i].image_url;
      csv += ', ' + result[i].species + ', ' + result[i].description + ', ' + result[i].approved;
      csv += ', ' + result[i].latitude + ', ' + result[i].longitude + ', ' + result[i].description;
      csv += '\n';
      //renderObject.rows.push(newRow);
    }
    //res.render('displayobservations', renderObject);
    // Display the contents as plain text
    res.write(csv);
    res.end();
    console.log(req.body.getElementsByClassName);
    res.download('/');
  });
});

router.post('/data', function(req, res, next) {
  console.log('checks');
});

function sendSelected() {
  dataSelected.data = [];
  var checks = document.getElementsByClassName('kakaRows');
  console.log(checks);
  console.log('checks');
}

module.exports = router;
