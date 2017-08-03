process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

const server = require('../../src/server/app');
const knex = require('../../src/server/db/knex');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : user', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
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

  describe('GET /admin', () => {
    it('should return a success', (done) => {
      passportStub.login({
        username: 'kelly',
        password: 'passwordtwo'
      });
      chai.request(server)
      .get('/admin')
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
    it('should throw an error if a user is not an admin', (done) => {
      passportStub.login({
        username: 'michael',
        password: 'password'
      });
      chai.request(server)
      .get('/admin')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('You are not authorized');
        done();
      });
    });
  });

});
