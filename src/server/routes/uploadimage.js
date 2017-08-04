const express = require('express');
const router = express.Router();

const indexController = require('../controllers/uploadimage');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  res.render('uploadimage', renderObject);
});

module.exports = router;
