process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

const server = require('../../src/server/app');
const knex = require('../../src/server/db/knex');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : users', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe('GET /api/v1/users', () => {
    it('should respond with all users', (done) => {
      chai.request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.status.should.eql('success');
        res.body.data.length.should.eql(1);
        res.body.data[0].should.include.keys(
          'id', 'username', 'email', 'password', 'admin', 'created_at'
        );
        done();
      });
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should respond with a single user', (done) => {
      chai.request(server)
      .get('/api/v1/users/1')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 user object}
        res.body.data[0].should.include.keys(
          'id', 'username', 'email', 'created_at'
        );
        done();
      });
    });
  });

  describe('POST /api/v1/users', () => {
    it('should throw an error when a username is not provided', (done) => {
      chai.request(server)
      .post('/api/v1/users')
      .send({
        username: null,
        email: '111111'
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.eql('Validation failed');
        res.body.failures.length.should.eql(2);
        // ensure the user was not added
        knex('users')
        .select('*')
        .where({
          email: '111111'
        })
        .then((user) => {
          user.length.should.eql(0);
          done();
        });
      });
    });
    it('should respond with a success message along with a single user that was added', (done) => {
      chai.request(server)
      .post('/api/v1/users')
      .send({
        username: 'ryan',
        password: 'rassword',
        email: 'ryan@ryan.com'
      })
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 201 status code
        // (indicating that something was "created")
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 user object}
        res.body.data[0].should.include.keys(
          'id', 'username', 'email', 'created_at'
        );
        done();
      });
    });
  });

  describe('PUT /api/v1/users', () => {
    it('should respond with a success message along with a single user that was updated', (done) => {
      knex('users')
      .select('*')
      .then((user) => {
        const userObject = user[0];
        chai.request(server)
        .put(`/api/v1/users/${userObject.id}`)
        .send({
          username: 'updatedUser',
          email: 'updated@user.com'
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 user object}
          res.body.data[0].should.include.keys(
            'id', 'username', 'email', 'created_at'
          );
          // ensure the user was in fact updated
          var newUserObject = res.body.data[0];
          newUserObject.username.should.not.eql(userObject.username);
          newUserObject.email.should.not.eql(userObject.email);
          // redundant
          newUserObject.username.should.eql('updatedUser');
          newUserObject.email.should.eql('updated@user.com');
          done();
        });
      });
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should throw an error if the user id is null', (done) => {
      chai.request(server)
      .get(`/api/v1/users/${null}`)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.eql('Validation failed');
        res.body.failures.length.should.eql(1);
        done();
      });
    });
    it('should respond with a success message along with a single user that was deleted', (done) => {
      knex('users')
      .select('*')
      .then((users) => {
        const userObject = users[0];
        const lengthBeforeDelete = users.length;
        chai.request(server)
        .delete(`/api/v1/users/${userObject.id}`)
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 user object}
          res.body.data[0].should.include.keys(
            'id', 'username', 'email', 'created_at'
          );
          // ensure the user was in fact deleted
          knex('users').select('*')
          .then((updatedUsers) => {
            updatedUsers.length.should.eql(lengthBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

});
