const express = require('express');
const router = express.Router();
const knex = require('../../../src/server/db/knex');
const formidable = require('formidable');

router.post('/', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
  });
});

module.exports = router;
