process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/knex');

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'jeff@lmao.com',
        email:'uce@gmail.com',
        password: 'kot'
      })
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

  // describe('POST /auth/login', () => {
  //   it('should login a user', (done) => {
  //     chai.request(server)
  //     .post('/auth/login')
  //     .send({
  //       username: 'michael',
  //       email:'password',
  //       password: 'michael@kotlyar.org'
  //     })
  //     .end((err, res) => {
  //       should.not.exist(err);
  //       res.redirects.length.should.eql(0);
  //       res.status.should.eql(200);
  //       res.type.should.eql('application/json');
  //       res.body.status.should.eql('success');
  //       done();
  //     });
  //   });
  // });

});
