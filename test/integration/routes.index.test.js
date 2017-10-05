/*
The traditional way to deal with asynchronous calls in JavaScript has been with callbacks.
.then = calls the sucess OR error handler once the asynchronous task finishes

.post = Loads data from server using HTTP POST

.get = Loads data from server using HTTP GET eg. sends a get request and returns the result

.send = Sends a request

.end = finishes chain of functions

.request = Initiates a HTTP request to the given URL. eg. .request(method, url, data, settings)

.require = require(m) loads the module m. A module is like a library.

.res = req is an object containing information about the HTTP request that raised the event. In response to req, you use res to send back the desired HTTP response.

describe = provides a simple method for testing asynchronous and synchronous code within JavaScript projects. eg. describe( groupName, tests[, options] );

.json = json is a data interchange format. Sort of like an alternative to XML
*/

process.env.NODE_ENV = 'test';

//Initialisations
const chai = require('chai'); //for assertion tests
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');  //for login

const server = require('../../src/server/app');
const knex = require('../../src/server/db/knex');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : index', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  // Tests for directing user to homepage
  describe('GET /', () => {
    it('should render the index', (done) => {
      chai.request(server)
      .get('/')   //link to homepage
      .end((err, res) => {
        res.redirects.length.should.equal(0);   //equals 0 means no redirection, all other numbers means redirected to somewhere else
        res.status.should.equal(200); //200 means success
        res.type.should.equal('text/html'); //file type html
        // res.text.should.contain('<h1>Kaka Go</h1>');
        done();
      });
    });
  });

  // Tests for directing user to error page
  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
      .get('/404')  //link to error page
      .end((err, res) => {
        res.redirects.length.should.equal(0);   //no redirection
        res.status.should.equal(404); //404 means an not found
        res.type.should.equal('application/json');  //file type is json
        res.body.message.should.eql('Not Found');
        done();
      });
    });
  });

  // Tests for directing user when attempting to login.
  //Tests sucessful login for registered user and unsucessful for non registered user
  describe('POST /login', () => {
    it('should login a user', (done) => {
      chai.request(server)
      .post('/login')   //link to login page
      .send({   //sends to the rendered page
        username: 'michael',
        // email: 'michael@kotlyar.org',
        password: 'password'
      })
      .end((err, res) => {
        should.not.exist(err);  //should be no error since this is a registered user
        res.redirects.length.should.eql(1);   //redirect to homepage
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        // res.body.status.should.eql('success');
        done();
      });
    });
    it('should not login an unregistered user', (done) => { //if not registered user, then throw error and don't redirect
      chai.request(server)
      .post('/login') //link to login page
      .send({
        username: 'michael',
        password: 'johnson123'
      })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.status.should.eql('User not found');
        done();
      });
    });
  });

  // Tests for directing user when attempting to logout
  //Tests sucessful logout for registered user and unsucessful for non registered user
  describe('GET /logout', () => {
    it('should logout a user', (done) => {  //sucessful logout
      passportStub.login({
        username: 'michael',
        password: 'password'
      });
      chai.request(server)
      .get('/logout')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(1);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        done();
      });
    });
  });
  it('should throw an error if a user is not logged in', (done) => {  //unsuccessful logout should throw error
    chai.request(server)
    .get('/logout')
    .end((err, res) => {
      should.exist(err);
      res.redirects.length.should.eql(0);
      res.status.should.eql(401);   //401 = unauthorised access
      res.type.should.eql('application/json');
      res.body.status.should.eql('Please log in');
      done();
    });
  });

  //May delete the below stuff
  describe('GET /user', () => {
    it('should return a success', (done) => {
      passportStub.login({
        username: 'michael',
        password: 'password'
      });
      chai.request(server)
      .get('/user')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      });
    });
    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
      .get('/user')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Please log in');
        done();
      });
    });
  });

});
