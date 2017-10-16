const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const router = express.Router();
const knex = require('../../../src/server/db/knex');

router.post('/', function(req, res, next) {

  //console.log('got');
  //console.log(req.body);

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    //console.log(files);
    //console.log(files.fields.path);
    ///*
    fs.readFile(files.fields.path, 'utf8', function(err, data) {
      if (err) throw err;
      //console.log('OK: ' + filename);
      console.log(data)
      //var lines = data.split(/\r?\n/);
      // check file to make sure it's a image file, only uses file extension
      var filetype = files.filetoupload.type;
      var allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif'
      ];
      var found = allowedTypes.indexOf(filetype);
      if (found < 0) {
        // invalid file
        res.write('Invlaid file type');
        res.end();
      } else {
        var oldpath = files.filetoupload.path;
        console.log('saved ' + files.filetoupload.path);

        var uid = null;
        var filename = files.filetoupload.name;
        filename = filename.replace('/', '');
        console.log(filename);
        console.log('feilds');
        console.log(fields);
        console.log('FILES');
        console.log(files);

        knex('uid').select('value').then(function(result) {
          uid = result[0].value;

          knex('observations').insert({
            user_id: 1,
            image_url: uid + filename,
            species: 'bird',
            description: data,
            approved: true,
            latitude: '41.2865',
            longitude: '174.7762'
          }).then(function(result) {
            var newpath = './src/client/uploaded/' + uid + filename;
            console.log(newpath);

            // set UID to new value
            knex('uid').where('id', '=', '1').update({
              value: uid + 1
            }).then();

            fs.rename(oldpath, newpath, function(err) {
              if (err) throw err;
              console.log('File uploaded and moved!');
              res.write('File uploaded and moved!');
              res.end();
            });
          });
        });
      }
    });
    //*/
    //res.write('delicous picture')
    //res.end();
  });
  /*
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
  // check file to make sure it's a image file, only uses file extension
  var filetype = files.filetoupload.type;
  var allowedTypes = [
  'image/png',
  'image/jpeg',
  'image/gif'
];
var found = allowedTypes.indexOf(filetype);
if (found < 0) {
// invalid file
res.write('Invlaid file type');
res.end();
} else {
var oldpath = files.filetoupload.path;
console.log('saved ' + files.filetoupload.path);

var uid = null;
var filename = files.filetoupload.name;
filename = filename.replace('/', '');
console.log(filename);
console.log('feilds');
console.log(fields);
console.log('FILES');
console.log(files);

knex('uid').select('value').then(function(result) {
uid = result[0].value;

knex('observations').insert({
user_id: 1,
image_url: uid + filename,
species: fields.species,
description: fields.description,
approved: true,
latitude: '41.2865',
longitude: '174.7762'
}).then(function(result) {
var newpath = './src/client/uploaded/' + uid + filename;
console.log(newpath);

// set UID to new value
knex('uid').where('id', '=', '1').update({
value: uid + 1
}).then();

fs.rename(oldpath, newpath, function(err) {
if (err) throw err;
res.write('File uploaded and moved!');
res.end();
});
});
});
}
});
*/

});

module.exports = router;
