const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const knex = require('../../../src/server/db/knex');

const fs = require('fs');

router.post('/', function(req, res, next) {
  //console.log(res.fields);

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    //console.log('--------- files  --------');
    //console.log(files.filetoupload);
    //console.log('--------- feilds --------');
    //console.log(files.fields);

    var filename = files.fields.path;

    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) throw err;
      //console.log('OK: ' + filename);
      console.log(data);

      // Checking file name to see if they uploaded a image
      var filetype = files.filetoupload.type;
      var allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
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
        console.log(oldpath);

        var uid = null;
        // Clean up path to file
        var filename = files.filetoupload.name;
        filename = filename.replace('/', '');

        // Fetch a UID from uid database.
        // UID appened to image name to prevent duplicates.
        knex('uid').select('value').then(function(result) {
          // Storage location for saved images
          image_folder = '/uploaded/';
          uid = result[0].value;
          console.log('UID: ' + uid);
          knex('observations').insert({
            user_id: 1,
            image_url: image_folder + uid + filename,
            observation_type: 'bird',
            description: data,
            approved: false,
            latitude: '41.2865',
            longitude: '174.7762',
            created_at: new Date()
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
              console.log('File uploaded and moved!');
              res.write('File uploaded and moved!');
              res.end();
            });
          });
        });
      }

    });

  });

});

module.exports = router;
