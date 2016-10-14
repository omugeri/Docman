const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;

describe('Role', () => {
  let token;
  let id;
  before((done) => {
    request
        .post('/api/users/login/')
        .send({
          userName: 'riwhiz',
          password: 'olive',
        })
        .end((err, res) => {
          token = res.body;
          done();
        });
  });
  describe('Create', () => {
    it('validates that role is created', (done) => {
      request
        .post('/api/roles/')
        .set({ 'x-access-token': token })
        .send({
          title: 'Visitor',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('validates that role is not created without token', (done) => {
      request
        .post('/api/roles/')
        .send({
          title: 'Visitor',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.be.equal('Invalid user');
          done();
        });
    });
    it('validates role title is unique', (done) => {
      request
        .post('/api/roles/')
        .set({ 'x-access-token': token })
        .send({
          title: 'Admin'
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.status).to.be.equal(409);
          expect(res.body.message).to.be.equal('Role already exists!');
          done();
        });
    });
  });
  describe('VIEW', () => {
    it('validates that all roles are displayed', (done) => {
      request
        .get('/api/roles/')
        .set({ 'x-access-token': token })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(5);
          id = res.body[4]._id;
          done();
        });
    });
  });
  describe('EDIT', () => {
    it('updates the role according to the id given', (done) => {
      request
        .put(`/api/roles/${id}`)
        .query({ token })
        .send({
          title: 'Temporary',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not updates the role if no token', (done) => {
      request
        .put(`/api/roles/${id}`)
        .send({
          title: 'Temporary',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.be.equal('Invalid user');
          done();
        });
    });
  });
  describe('DELETE', () => {
    it('deletes the role according to the id given', (done) => {
      request
        .delete(`/api/roles/${id}`)
        .query({ token })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          expect(res.body.message).to.be.equal('Successfully deleted');
          done();
        });
    });
    it('should not delete the role if no token', (done) => {
      request
        .delete(`/api/roles/${id}`)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.be.equal('Invalid user');
          done();
        });
    });
  });
});
describe('USER CREATE', () => {
  let token
  before((done) => {
    request
        .post('/api/users/login/')
        .send({
          userName: 'ganjez',
          password: 'alex',
        })
        .end((err, res) => {
          token = res.body;
          done();
        });
  });

  it('validates that role cannot be created if not admin', (done) => {
    request
      .post('/api/roles/')
      .set({ 'x-access-token': token })
      .send({
        title: 'Visitor',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(403);
        expect(res.body.message).to.be.equal('You dont have permission to do that');
        done();
      });
  });
});
