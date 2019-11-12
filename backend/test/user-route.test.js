const request = require('supertest');
const app = require('../app')


describe("User Route", function() {


describe("Get User Route", () => {
    test("it should returns status code 200", (done) => {
      request(app).get('/').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
})