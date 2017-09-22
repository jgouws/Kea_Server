const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const router = express.Router();
const knex = require('../../../src/server/db/knex');
const indexController = require('../controllers/uploadedimage');

// Expects a web form to process, submitted by user from upload page
router.post('/', function(req, res, next) {

  // Parse the web form uoloaded by the user
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    
    // Checking file name to see if they uploaded a image
    var filetype = files.filetoupload.type;
    var allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/gif'
    ];

    var found = allowedTypes.indexOf(filetype);
    if (found < 0) {
      // invalid file, not found in list
      res.write('Invlaid file type');
      res.end();
    } else {
      // Rename temp filename to the name used when uploaded
      var oldpath = files.filetoupload.path;
      console.log('saved ' + files.filetoupload.path);

      var uid = null;
      // Clean up path to file
      var filename = files.filetoupload.name;
      filename = filename.replace('/', '');

      // Debugging - lists contents user uploaded
      console.log(filename);
      console.log('feilds');
      console.log(fields);
      console.log('FILES');
      console.log(files);

      // Fetch a UID from uid database.
      // UID appened to image name to prevent duplicates.
      knex('uid').select('value').then(function(result) {
        uid = result[0].value;

        // Add users observation details to the database
        knex('observations').insert({
          user_id: 1,
          image_url: uid + filename,
          species: fields.species,
          description: fields.description,
          approved: true,
          latitude: '41.2865',
          longitude: '174.7762'
        }).then(function(result) {
          // Path to saved image on the server
          var newpath = './src/client/uploaded/' + uid + filename;
          console.log(newpath);

          // Update the UID value in the database
          knex('uid').where('id', '=', '1').update({
            value: uid + 1
          }).then();

          // Rename the temp file, move to storage location
          fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
            // Display confirmation text page for user
            res.write('File uploaded and moved!');
            res.end();
          });
        });
      });
    }
  });
});

module.exports = router;
