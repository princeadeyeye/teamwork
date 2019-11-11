const request = require('supertest');
const app = require('../app')


describe("Gif Route", function() {


  describe("Post Gif Route", () => {
    test("it should not returns status code 201", (done) => {
      request(app).post('/v2/gifs').then((response) => {
        expect(response.statusCode).not.toBe(201);
        done();
      });
    });

  });


describe("Delete Gif Route", () => {
    test("it should not returns status code 204", (done) => {
      request(app).delete('/v2/gifs/1').then((response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
  });

describe("Get Gif Route", () => {
    test("it should not returns status code 200", (done) =>{
      request(app).get('/v2/gifs/1').then((response) => {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
  });

describe("Get Gif Route", () => {
    test("it should not returns status code 200", (done) => {
      request(app).put('/v2/gifs/1/comment').then((response) => {
        expect(response.statusCode).not.toBe(201);
        done();
      });
    });
  });

})