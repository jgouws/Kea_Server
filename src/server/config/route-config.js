(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const usersRoutes = require('../routes/users');
    const userRoutes = require('../routes/user');
    const authRoutes = require('../routes/auth');
    const uploadimageRoutes = require('../routes/uploadimage');
    const uploadedimageRoutes = require('../routes/uploadedimage');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/api/v1/users', usersRoutes);
    app.use('/auth', authRoutes);
    app.use('/', userRoutes);
    app.use('/uploadimage', uploadimageRoutes);
    app.use('/uploadedimage', uploadedimageRoutes);
  };

})(module.exports);
