const request = require('supertest');

const app = require('../app.js')


describe("Article Route", () => {

    /*
      declare the token variable in a scope accessible
      by the entire test suite
  
    let token;

    beforeAll((done) => {
      request(app)
        .post('/auth/v2/signin')
        .send({
          username: m2@gmail.com,
          password: 123,
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });*/

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3MzYwNTg1NSwiZXhwIjoxNTczNjkyMjU1fQ.htcjbwkmaK5DW4X9XaX-doqKcOZKFBQFirkIGiwemVk'
  const fakeToken = 'thefaketoken123'

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
          "userid": 1
        })
        .then((response) => {
         expect(response.statusCode).toBe(201);
        done();
      });
    });
  });

describe("Update Article Route", () => {
    test(" should accept unauthorized and unautheticated user without update", (done) => {
        request(app)
        .patch('/api/v2/articles/1')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });


    test(" should accept unautheticated and authenticated user with update", (done) => {
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
        expect(response.statusCode).toBe(200);
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
  });

describe("Get Feed", () => {
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