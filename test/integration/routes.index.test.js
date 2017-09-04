process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

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

  describe('GET /', () => {
    it('should render the index', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(200);
        res.type.should.equal('text/html');
        // res.text.should.contain('<h1>Kaka Go</h1>');
        done();
      });
    });
  });

  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
      .get('/404')
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.message.should.eql('Not Found');
        done();
      });
    });
  });

  describe('POST /login', () => {
    it('should login a user', (done) => {
      chai.request(server)
      .post('/login')
      .send({
        username: 'michael',
        // email: 'michael@kotlyar.org',
        password: 'password'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(1);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        // res.body.status.should.eql('success');
        done();
      });
    });
    it('should not login an unregistered user', (done) => {
      chai.request(server)
      .post('/login')
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

  describe('GET /logout', () => {
    it('should logout a user', (done) => {
      passportStub.login({
        username: 'michael',
        password: 'password'
      });
      chai.request(server)
      .get('/logout')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        done();
      });
    });
  });
  it('should throw an error if a user is not logged in', (done) => {
    chai.request(server)
    .get('/logout')
    .end((err, res) => {
      should.exist(err);
      res.redirects.length.should.eql(0);
      res.status.should.eql(401);
      res.type.should.eql('application/json');
      res.body.status.should.eql('Please log in');
      done();
    });
  });

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
