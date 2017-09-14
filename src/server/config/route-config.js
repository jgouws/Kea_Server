(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const usersRoutes = require('../routes/users');
    const userRoutes = require('../routes/user');
    // const authRoutes = require('../routes/auth');
    const uploadimageRoutes = require('../routes/uploadimage');
    const uploadedimageRoutes = require('../routes/uploadedimage');
    const displayobservationsRoutes = require('../routes/displayobservations');
    const exportobservationsRoutes = require('../routes/exportobservations');
    const testpostRoutes = require('../routes/testpost');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/api/v1/users', usersRoutes);
    app.use('/', userRoutes);
    app.use('/uploadimage', uploadimageRoutes);
    app.use('/uploadedimage', uploadedimageRoutes);
    app.use('/displayobservations', displayobservationsRoutes);
    app.use('/exportobservations', exportobservationsRoutes);
    app.use('/testpost', testpostRoutes);
  };

})(module.exports);
