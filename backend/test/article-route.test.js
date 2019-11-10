const request = require('supertest');
const server = require('../app.js')


describe("Article Route", () => {


  describe("Post Article Route", () => {
    test("it should returns status code 201", (done) => {
        request(app).post('/v2/articles/').then((response) => {
         expect(response.statusCode).toBe(201);
        done();
      });
    });
  });

describe("Update Article Route", () => {
    test("it should returns status code 200", (done) => {
        request(app).patch('/v2/articles/:id').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

describe("Delete Article Route", () => {
    test("it should returns status code 204", (done) => {
      request(app).delete('/v2/articles/:id').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

describe("Get Article Route", () => {
    test("it should returns status code 200", (done) => {
      request(app).get('/v2/articles/:id').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });


describe("Put Article Comment ", () => {
    test("it should returns status code 200", (done) => {
      request(app).put('/v2/articles/:id/comment').then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });
  });

describe("Get Feed", () => {
    test("it should returns status code 200", function(done) {
      request(app).get('/v2/feed/').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

})