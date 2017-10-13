const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const knex = require('../../../src/server/db/knex');

router.post('/', function(req, res, next) {

  bodydata = req.body;
  app_description = bodydata.description;
  console.log('description=' + app_description);

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log('--------- files  --------');
    console.log(files);
    console.log('--------- feilds --------');
    console.log(fields);

    knex('uid').select('value').then(function(result) {
      // Storage location for saved images
      image_folder = '/uploaded/';
      uid = result[0].value;
      // check if the right value
      console.log('uid=' + uid);

      // Insert observation text with the rest default values
      knex('observations').insert({
        user_id: 1,
        image_url: uid,
        species: 'spooky skeleton via IOS',
        description: app_description,
        approved: false,
        latitude: '41.2865',
        longitude: '174.7762',
        created_at: new Date()

      }).then(function(result) {
        console.log('inserted value');
        // Update the UID value in the database
        knex('uid').where('id', '=', '1').update({
          value: uid + 1
        }).then();
      });

      res.write('Observation successfully submitted');
      res.end();
    });
  });
});
module.exports = router;
