const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;


describe('User', () => {
  let token;
  let id;
  let id2;
  const wrongId = '57df94dfe74e460dead6792';
  before((done) => {
    request
      .post('/api/users/login/')
      .send({
        userName: 'riwhiz',
        password: 'olive',
      })
      .end((err, res) => {
        // console.log('THE RESPONSE IS: ', res);
        token = res.body;
        done();
      });
  });
  describe('Authentication', () => {
    it('rejects invalid user', (done) => {
      request
        .post('/api/users/')
        .set({ 'x-access-token': '12345' })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
    it('No token so no authorization', (done) => {
      request
        .post('/api/users/')
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });

  describe('Create', () => {
    it('should POST to api/users and create user', (done) => {
      request
          .post('/api/users/')
          .set({ 'x-access-token': token })
          .send({
            userName: 'Test',
            firstName: 'Test',
            lastName: 'Tester',
            email: 'Tester@example.com',
            password: 'Tester',
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.exist;
            expect(res.body).to.be.a('object');
            done();
          });
    });
    it('validates that the new user is unique', (done) => {
      request
        .post('/api/users/')
        .set({ 'x-access-token': token })
        .send({
          userName: 'riwhiz',
          firstName: 'Olive',
          lastName: 'Nyotu',
          email: 'nyotuo16@gmail.com',
          password: 'olive',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          done();
        });
    });
    it('validates that there\'s a role defined', (done) => {
      request
        .post('/api/users/')
        .set({ 'x-access-token': token })
        .send({
          userName: 'Test3',
          firstName: 'Check',
          lastName: 'Role',
          email: 'roles@test.com',
          password: 'maroles',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.role).to.exist;
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('validate user created both first & last name', (done) => {
      request
        .post('/api/users/')
        .set({ 'x-access-token': token })
        .send({
          userName: 'Test4',
          firstName: 'Check',
          lastName: 'Names',
          email: 'names@test.com',
          password: 'majina',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          expect(res.body.name.first).to.exist;
          expect(res.body.name.last).to.exist;
          done();
        });
    });
  });
  describe('User display', () => {
    it('validates that all users are returned', (done) => {
      request
        .get('/api/users/')
        .set({ 'x-access-token': token })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          expect(res.body.users.length).to.be.equal(12);
          id = res.body.users[0]._id;
          id2 = res.body.users[2]._id;
          done();
        });
    });
  });
  describe('get specific user', () => {
    it('should pick user by id', (done) => {
      request
       .get(`/api/users/${ id }`)
       .set({ 'x-access-token': token })
       .end((err, res) => {
         if (err) {
           return done(err);
         }
         expect(res.status).to.be.equal(201);
         expect(res.body.name.first).to.be.equal('Olive');
         done();
       });
    });
    it('should not pick user when id is wrong', (done) => {
      request
      .get(`/api/users/${wrongId}`)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(404);
        expect(res.body.err).to.exist;
        expect(res.body.name).to.not.exist;
        done();
      });
    });
    it('check documents returned for a specific user', (done) => {
      request
        .get(`/api/users/${id}/documents`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.exist;
          expect(res.body.length).to.be.equal(3);
          done();
        });
    });
  });
  describe('updateUser', () => {
    it('should not update if token is not valid', (done) => {
      request
      .put(`/api/users/${id}`)
      .send({
        email: 'laycee@gmail.com',
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.be.equal(401);
        expect(res.body.message).to.exist;
        expect(res.body.message).to.be.equal('Invalid user');
        done();
      });
    });
    it('should not update if the id is wrong', (done) => {
      request
        .put(`/api/users/${wrongId}`)
        .set({ 'x-access-token': token })
        .send({
          email: 'laycee@gmail.com',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          expect(res.error).to.exist;
          done();
        });
    });
    it('should Successfully update if user exists', (done) => {
      request
        .put(`/api/users/${id}`)
        .set({ 'x-access-token': token })
        .send({
          email: 'laycee@gmail.com',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          expect(res.err).to.not.exist;
          done();
        });
    });
  });
  describe('deleteUser', () => {
    it('should Delete the user with given id', (done) => {
      request
        .delete(`/api/users/${id2}`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not Delete the user with wrong id', (done) => {
      request
        .delete(`/api/users/${wrongId}`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          expect(res.status).to.be.equal(500);
          done();
        });
    });
  });
  describe('logoutUser', () => {
    it('should destroy the token', (done) => {
      request
        .post('/api/users/logout')
        .set({
          'x-access-token': token,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.equal(0);
          done();
        });
    });
    it('should not work without token', (done) => {
      request
        .post('/api/users/logout')
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
