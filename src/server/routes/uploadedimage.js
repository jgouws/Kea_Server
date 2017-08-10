const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const router = express.Router();

const indexController = require('../controllers/uploadedimage');

router.post('/', function (req, res, next) {
  //const renderObject = {};
  //renderObject.title = 'Welcome to Express!';

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    console.log("saved " + files.filetoupload.path);
    var newpath = './pictures/' + files.filetoupload.name;

    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();

      //res.render('uploadedimage', renderObject);

    });
  });

});

module.exports = router;
