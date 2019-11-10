const request = require('supertest');
const server = require('../app')


describe("Gif Route", function() {


  describe("Post Gif Route", () => {
    test("it should returns status code 201", (done) => {
      request(app).post('/gifs').then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });


describe("Delete Gif Route", () => {
    test("it should returns status code 204", (done) => {
      request(app).delete('/v2/gifs/:id').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

describe("Get Gif Route", () => {
    test("it should returns status code 200", (done) =>{
      request(app).get('/v2/gifs/:id').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

describe("Get Gif Route", () => {
    test("it should returns status code 200", (done) => {
      request(app).put('/v2/gifs/:id/comment').then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });
  });

})