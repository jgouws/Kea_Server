const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

const knex = require('../../../src/server/db/knex');

const exportobservations = require('../controllers/exportobservations');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Home';
  res.render('index', renderObject);
});

router.get('/about', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'About';
  res.render('about', renderObject);
});

router.get('/data', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Data';
  renderObject.data = [];
  var query = knex.select('*').from('observations').then(function(result) {
    for (var i = 0 ; i < result.length; i++) {
      renderObject.data.push(result[i]);
    }
    res.render('data', renderObject);
  });
});

router.get('/gallery', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Gallery';
  renderObject.data = [];
  var query = knex.select('*').from('observations').then(function(result) {
    for (var i = 0 ; i < result.length; i++) {
      renderObject.data.push(result[i]);
    }
    res.render('gallery', renderObject);
  });
});

router.get('/map', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Map';
  renderObject.data = [];
  var query = knex.select('*').from('observations').then(function(result) {
    for (var i = 0 ; i < result.length; i++) {
      renderObject.data.push(result[i]);
    }
    res.render('map', renderObject);
  });
});

router.get('/projects', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Projects';
  res.render('projects', renderObject);
});

router.get('/register', (req, res, next)  => {
  res.render('register', {title: 'Register'});
});

router.get('/login', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Login';
  res.render('login', renderObject);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err.stack);
      handleResponse(res, 500, 'error');
    }
    if (!user) { handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, function (err) {
        if (err) { handleResponse(res, 500, 'error'); }
        res.status(200);
        res.redirect('/');
      });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
