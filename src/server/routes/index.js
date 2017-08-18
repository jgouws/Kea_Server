const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go';
  res.render('index', renderObject);
});

router.get('/about', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go';
  res.render('index', renderObject);
});

router.get('/data', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go Data';
  res.render('data', renderObject);
});

router.get('/gallery', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go Gallery';
  res.render('gallery', renderObject);
});

router.get('/map', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Kaka Go Map';
  res.render('map', renderObject);
});

router.get('/login', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Please Log-in to continue';
  res.render('login', renderObject);
});

router.get('/register', (req, res, next)  => {
  res.render('register', {title: 'Register'});
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
        handleResponse(res, 200, 'success');
        res.redirect('/');
      });
    }
  })(req, res, next);
});

router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  handleResponse(res, 200, 'success');
});

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
