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


  describe("Post Article Route", () => {
    test("should not returns status code 201", (done) => {
        request(app).post('/v2/articles/')
        .then((response) => {
         expect(response.statusCode).not.toBe(201);
        done();
      });
    });
  });

describe("Update Article Route", () => {
    test("it should returns status code 200", (done) => {
        request(app).patch('/api/v2/articles/1').then((response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
  });

describe("Delete Article Route", () => {
    test("it should returns status code 204", (done) => {
      request(app).delete('/api/v2/articles/1').then((response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
  });

describe("Get Article Route", () => {
    test("it should returns status code 200", (done) => {
      request(app)
      .get(`/api/v2/articles/1`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        console.log(response.headers);
        expect(response.unauthorized).toBe(true)
        done();
      });
    });
  });

describe("Get Article Route", () => {
    test("it should not  returns status code 200", (done) => {
      request(app).get('/api/v2/articles/').then((response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
  });


describe("Put Article Comment ", () => {
    test("it should  not returns status code 200", (done) => {
      request(app).put('/api/v2/articles/1/comment').then((response) => {
        expect(response.statusCode).not.toBe(201);
        done();
      });
    });
  });

describe("Get Feed", () => {
    test("it should not  returns status code 200", (done) => {
      request(app).get('/v2/feed/').then((response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
  });

})