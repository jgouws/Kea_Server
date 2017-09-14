const express = require('express');
const router = express.Router();

const indexController = require('../controllers/testpost');

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go';
  res.render('index', renderObject);
});


function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
