/*funct (req, res, next){} Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware in the stack.

renderobject = creates a data obj that talks to the page and inserts to where the tag is eg obj.title for '/'(the homepage), where in the pug file it says #title, the data passed to th teh obj will place it there.

*/

const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

const authHelpers = require('../auth/_helpers');
const passport = require('../auth/local');

const knex = require('../../../src/server/db/knex');

const exportobservations = require('../controllers/exportobservations');

const galleryObject = {};

const dataObject = {};

//Set up pages
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

router.get('/map', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Map';
  renderObject.data = [];
  renderObject.lat = [];
  renderObject.long = [];
  renderObject.latlong = [];
  console.log("in map");
  var query = knex.select('*').from('observations').then(function(result) {
    for (var i = 0 ; i < result.length; i++) {
      renderObject.data.push(result[i]);
      renderObject.lat.push(result[i].latitude);
      renderObject.long.push(result[i].longitude);
      renderObject.latlong.push(result[i].latitude+', '+ result[i].longitude);
      console.log(renderObject.latlong[i]);
    }    
  });
  // var wellington = new google.maps.LatLng(-41.2865,174.7762);
  // map = new google.maps.Map(document.getElementById('map'), {
  //   center: wellington,
  //   zoom: 5,
  //   mapTypeId: 'satellite'
  // });
  // var heatmap = new google.maps.visualization.HeatmapLayer({
  //   data: renderObject.latlong,
  //   radius: 7
  // });
  // heatmap.setMap(map);
  // heatmap.dissipating = false;

  res.render('map', renderObject);
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

//Authenticate logging in and out
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err.stack);
      handleResponse(res, 500, 'error');  //error 500 = internal server error
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

function loadGalleryFilter (req, res, next) {
  console.log("in loadGalleryFilter");
 galleryObject.filtr = []; 
  var filterQuery = knex.select('*').from('observations').then(function(filterResult) {
    for (var i = 0 ; i < filterResult.length; i++) {
      galleryObject.filtr.push(filterResult[i]);
    }  
      return next();
  });
}

function loadGallery (req, res, next) {
  console.log("in loadGallery");
  var fromD = req.body.fromDate+' 00:00:00.573';
  var toD = req.body.toDate+' 23:59:59.573';
  var loc = req.body.locations;
  var ob = req.body.obs;
 
  galleryObject.title = 'Gallery';
  galleryObject.data = [];
  if(fromD == " 00:00:00.573" || toD == " 23:59:59.573" || loc == null || ob == null){
    console.log("no filter statements");
    var query = knex.select('*').from('observations').then(function(result) {
      for (var i = 0 ; i < result.length; i++) {
        galleryObject.data.push(result[i]);
      }
      return next();
    });
  }else{
    console.log("filterstatements");
    var query = knex.select('*').from('observations')
    .modify(function() {
    if(loc != 'All'){
      this.where({longitude:  loc});
    }
    if(ob != "All"){
      this.where({observation_type: ob});
    } 
    if(fromD != " 00:00:00.573" && toD != " 23:59:59.573"){
      this.whereBetween('created_at', [fromD, toD]);
    }
    })
    .then(function(result) {
      for (var i = 0 ; i < result.length; i++) {
        galleryObject.data.push(result[i]);
        console.log(result[i]);
      }
      return next();
    });
  }
}

function renderGalleryPage (req, res) {
  console.log("in renderGalleryPage");
  res.render('gallery', galleryObject);
}

router.get('/gallery', loadGalleryFilter, loadGallery,  renderGalleryPage);
router.post('/gallery', loadGalleryFilter, loadGallery,  renderGalleryPage);

function loadDataFilter (req, res, next) {
  console.log("in loadDataFilter");
  dataObject.filtr = []; 
  var filterQuery = knex.select('*').from('observations').then(function(filterResult) {
    for (var i = 0 ; i < filterResult.length; i++) {
      dataObject.filtr.push(filterResult[i]);
    }  
      return next();
  });
}

function loadData (req, res, next) {
  console.log("in loadData");
  var fromD = req.body.fromDate+' 00:00:00.573';
  var toD = req.body.toDate+' 23:59:59.573';
  var loc = req.body.locations;
  var ob = req.body.obs;

  dataObject.title = 'Data';
  dataObject.data = [];
  
  if(fromD == " 00:00:00.573" || toD == " 23:59:59.573" || loc == null || ob == null){
    console.log("no filter statements");
    var query = knex.select('*').from('observations').then(function(result) {
      for (var i = 0 ; i < result.length; i++) {
        dataObject.data.push(result[i]);
      }
      return next();
    });
  }else{
    var query = knex.select('*').from('observations')
    .modify(function() {
    if(loc != 'All'){
      this.where({longitude:  loc});
    }
    if(ob != "All"){
      this.where({observation_type: ob});
    } 
    if(fromD != " 00:00:00.573" && toD != " 23:59:59.573"){
      this.whereBetween('created_at', [fromD, toD]);
    }
    })
    .then(function(result) {
      for (var i = 0 ; i < result.length; i++) {
        dataObject.data.push(result[i]);        
      }
      return next();
    });
  }
}

function renderDataPage (req, res) {
  console.log("in renderDataPage");
  res.render('data', dataObject);
}

router.get('/data', loadDataFilter, loadData,  renderDataPage);
router.post('/data', loadDataFilter, loadData,  renderDataPage);

function handleResponse(res, code, statusMsg) {
  res.status(code).json({status: statusMsg});
}

module.exports = router;
