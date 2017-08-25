const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go';
  res.render('index', renderObject);
});

router.get('/about', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'About Kaka Go';
  res.render('about', renderObject);
});

router.get('/data', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go Data';
  res.render('data', renderObject);
});

router.get('/gallery', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Gallery';
  res.render('gallery', renderObject);
});

router.get('/map', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go Map';
  res.render('map', renderObject);
});

module.exports = router;
