const express = require('express');
const router = express.Router();

const indexController = require('../controllers/uploadimage');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Upload Observation';
  res.render('uploadimage', renderObject);
});

module.exports = router;
