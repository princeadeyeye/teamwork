const request = require('supertest');

const app = require('../app.js')


describe("Article Route", () => {

  const fakeToken = 'thefaketoken123'
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU3Mzg3MzQyOCwiZXhwIjoxNTczOTU5ODI4fQ.gUQfTH257Yffp0BpKG9yHWEy7Ql_6X7ecz_2w9_20bQ`
 
  describe("Post Article Route", () => {
    test("should not post empty article", (done) => {
        request(app)
        .post('/api/v2/articles/')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .then((response) => {
         expect(response.statusCode).toBe(400);
        done();
      });
    });

    test("should post article successfully", (done) => {
        request(app)
        .post('/api/v2/articles/')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({
          "article": "bullion van are used to pick money",
          "title": "bullion van",
          "createdon": new Date(),
          "userid": 2
        })
        .then((response) => {
         expect(response.statusCode).toBe(201);
        done();
      });
    });
  });

describe("Update Article Route", () => {
    test(" should not accept unauthorized and unautheticated user without update", (done) => {
        request(app)
        .patch('/api/v2/articles/1')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
    });


    test(" should not accept  authenticated user with update", (done) => {
        request(app)
        .patch('/api/v2/articles/1')
         .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({
          "article": "bullion van are used to pick money",
          "title": "bullion van",
          "createdon": new Date(),
          "userid": 1
        })
        .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
    });

    test(" should reject unautheticated and authenticated user with update", (done) => {
        request(app)
        .patch('/api/v2/articles/1')
         .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'application/json')
        .send({
          "article": "bullion van are used to pick money",
          "title": "bullion van",
          "createdon": new Date(),
          "userid": 1
        })
        .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
  });

describe("Delete Article Route", () => {
    test("should reject authorized delete", (done) => {
      request(app)
      .delete('/api/v2/articles/1')
      .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

    test("should accept authorized delete", (done) => {
      request(app)
      .delete('/api/v2/articles/19')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });
  });

describe("Get Article Route", () => {
    test("should get single user", (done) => {
      return request(app)
      .get(`/api/v2/articles/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test("should reject unautheticated access to user single user", (done) => {
      return request(app)
        .get(`/api/v2/articles/1`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.statusCode).toBe(401);
          done();
      });
    });
  });



describe("Put Article Comment ", () => {
    test("it should accept comment by a user", (done) => {
      request(app)
      .put('/api/v2/articles/1/comment')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send({
          "comment": "Tinubu bullion van is really disburbing ",
          "articleid": "1",
           "userid": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

   test("it should accept comment by a user", (done) => {
      request(app)
      .put('/api/v2/articles/1/comment')
      .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'application/json')
      .send({
          "comment": "Tinubu bullion van is really disburbing ",
          "articleid": "1",
           "userid": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });


  });

describe("Get Feed", () => {
    test("get all feeds", (done) => {
      request(app)
      .get('/api/v2/feed/')
        .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test("reject unautheticated user access to feeds", (done) => {
      request(app)
      .get('/api/v2/feed/')
        .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });


  });

})