(function(appConfig) {

  'use strict';

  // *** main dependencies *** //
  const expressValidator = require('express-validator');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
  const session = require('express-session');
  const flash = require('connect-flash');
  const morgan = require('morgan');
  const sassMiddleware = require('node-sass-middleware');
  const passport = require('passport');

  // *** load environment variables *** //
  require('dotenv').config();

  appConfig.init = function(app, express) {

    // *** view engine *** //
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));

    // *** app middleware *** //
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'));
    }
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());
    app.use(sassMiddleware({
      src: path.join(__dirname, '..', '..', 'client'),
      dest: path.join(__dirname, '..', '..', 'client'),
      indentedSyntax: true, // true = .sass and false = .scss
      sourceMap: true
    }));
    // uncomment if using express-session
    // app.use(session({
    //   secret: process.env.SECRET_KEY,
    //   resave: false,
    //   saveUninitialized: true
    // }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(express.static(path.join(__dirname, '..', '..', 'client')));

  };

})(module.exports);
