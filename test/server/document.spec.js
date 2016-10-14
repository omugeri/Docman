const app = require('../../server');
const request = require('supertest')(app);
const expect = require('chai').expect;

describe('Documents', () => {
  let token;
  let id;
  let id2;
  const limit = 4;
  const page = 1;
  const published = '2016-09-26';
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

  describe('CREATE', () => {
    it('should not work if not logged in', (done) => {
      request
        .post('/api/documents/')
        .send({
          title: 'Testing',
          content: 'I am testing that it shall store the date it is published',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.be.equal('Invalid user');
          done();
        });
    });
    it('should create a document and store the publishing date', (done) => {
      request
        .post('/api/documents/')
        .set({ 'x-access-token': token })
        .send({
          title: 'Testing',
          content: 'I am testing that it shall store the date it is published',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.exist;
          expect(res.body.createdAt).to.exist;
          done();
        });
    });
  });

  describe('READ', () => {
    it('should not access documents if not logged in', (done) => {
      request
        .get('/api/documents/')
        .expect('content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.be.equal('Invalid user');
          done();
        });
    });

    it('should give documents equal to the limit', (done) => {
      request
        .get('/api/documents/')
        .set({ 'x-access-token': token })
        .query({
          limit,
        })
        .expect('content-Type', /json/)
        .end((err, res) => {
          expect(res.body.docs.length).to.be.equal(limit);
          done();
        });
    });
    it('should return documents when given a limit and an offset', (done) => {
      request
        .get('/api/documents/')
        .set({ 'x-access-token': token })
        .query({
          limit,
          page,
        })
        .expect('content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.docs.length).to.be.equal(limit);
          expect(res.body.page).to.be.equal(page);
          done();
        });
    });
    it('should return documents in order from the most recent', (done) => {
      request
        .get('/api/documents/')
        .set({ 'x-access-token': token })
        .query({
          limit,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          const first = res.body.docs[0].createdAt;
          const second = res.body.docs[1].createdAt;
          const third = res.body.docs[2].createdAt;
          id = res.body.docs[3]._id;
          id2 = res.body.docs[2]._id;
          expect(first).to.be.above(second);
          expect(second).to.be.above(third);
          done();
        });
    });
    it('should return documents when given a limit, an offset and a date', (done) => {
      request
        .get('/api/documents/')
        .set({ 'x-access-token': token })
        .query({
          limit,
          page,
          published,
        })
        .expect('content-Type', /json/)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.docs[0].createdAt).to.be.at.least(published);
          expect(res.body.docs.length).to.be.equal(limit);
          expect(res.body.page).to.be.equal(page);
          done();
        });
    });
  });
  describe('should get specific document', () => {
    it('should return document with given id', (done) => {
      request
        .get(`/api/documents/${id}`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.title).to.exist;
          done();
        });
    });
  });
  describe('update a document', () => {
    it('should not update if there\'s no token', (done) => {
      request
        .put(`/api/documents/${id}`)
        .send({
          title: 'This is the updated document',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.exist;
          expect(res.body.message).to.be.equal('Invalid user');
          done();
        });
    });

    it('should not update if access is not owner', (done) => {
      request
        .put(`/api/documents/${id}`)
        .set({ 'x-access-token': token })
        .send({
          title: 'This is the updated document',
        })
        .end((err,res) => {
          expect(res.status).to.be.equal(403);
          expect(res.body.message).to.exist;
          expect(res.body.message).to.be.equal('Cannot edit this document!');
          done();
        });
    });

    it('should update if it\'s the owner editing', (done) => {
      request
        .put(`/api/documents/${id2}`)
        .set({ 'x-access-token': token })
        .send({
          title: 'This is the updated document',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.message).to.exist;
          expect(res.body.message).to.be.equal('Document updated!');
          done();
        });
    });
  });
  describe('Delete', () => {
    it('should not delete document if there\'s no token', (done) => {
      request
        .delete(`/api/documents/${id2}`)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body.message).to.be.equal('Invalid user');
          done();
        });
    });
    it('should delete the document with the given Id', (done) => {
      request
        .delete(`/api/documents/${id2}`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.message).to.be.equal('Successfully deleted');
          request
            .get(`/api/documents/${id2}`)
            .set({ 'x-access-token': token })
            .end((err2, response) => {
              expect(response.status).to.be.equal(404);
              expect(response.err2).to.exist;
            });
          done();
        });
    });
  });
});
