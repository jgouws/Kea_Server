const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const exif = require('exif');
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

        // Try and find any exif data from jpeg for location

        var ExifImage = require('exif').ExifImage;

        exif_latitude = '';
        exif_longitude = '';

        // Only JPEG/JPG files have exif data we can use
        try {
          new ExifImage({
            image: oldpath
          }, function(error, exifData) {
            if (error)
              console.log('Error: ' + error.message);
            else
            if (exifData.gps.GPSLatitude != undefined) {
              console.log('Logging EXIF data');
              exif_latitude = exifData.gps.GPSLatitudeRef + ' ' + exifData.gps.GPSLatitude;
              exif_longitude = exifData.gps.GPSLongitudeRef + ' ' + exifData.gps.GPSLongitude;
              console.log(exif_latitude);
              console.log(exif_longitude);

              // Add users observation details to the database
              knex('observations').insert({
                user_id: 1,
                image_url: image_folder + uid + filename,
                observation_type: fields.species,
                description: fields.description,
                approved: false,
                latitude: exif_latitude,
                longitude: exif_longitude,
                created_at: new Date()
              }).then(function(result) {
                // Path to saved image on the server
                var newpath = './src/client/uploaded/' + uid + filename;
                console.log(newpath);

                // Update the UID value in the database
                knex('uid').where('id', '=', '1').update({
                  value: uid + 1
                }).then();
                console.log('Updated UID')

                // Rename the temp file, move to storage location
                fs.rename(oldpath, newpath, function(err) {
                  if (err) throw err;
                  // Display confirmation text page for user
                  res.write('File uploaded and moved!');
                  res.end();
                });
              });
            }
            console.log(exifData.gps); // Do something with your data!
          });
        } catch (error) {
          console.log('Error: ' + error.message);
        }
      });
    }
  });
});

module.exports = router;
