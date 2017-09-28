const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const knex = require('../../../src/server/db/knex');

router.get('/', function (req, res, next) {

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log('--------- files  --------');
    console.log(files);
    console.log('--------- feilds --------');
    console.log(fields);
  });
});

module.exports = router;
