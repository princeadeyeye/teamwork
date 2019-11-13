const request = require('supertest');
const app = require('../app')


describe("tesing unautheticated routes", function() {


describe("Get Documentation", () => {
    test("it should returns status code 200", (done) => {
      request(app).get('/').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

describe("Get all feeds routes", () => {
    test("should get feeds including articles and gifs", (done) => {
      request(app).get('/api/v3/feeds').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
})