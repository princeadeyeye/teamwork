const request = require('request');
const server = require('../routes/gif-route')
const base_url = 'http://localhost:5000/'


describe("Gif Route", function() {


  describe("Post Gif Route", function() {
    test("it should returns status code 201", function(done) {
      request.post(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });

describe("Update Gif Route", function() {
    test("it should returns status code 200", function(done) {
      request.patch(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

describe("Delete Gif Route", function() {
    test("it should returns status code 204", function(done) {
      request.delete(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(204);
        done();
      });
    });
  });

describe("Get Gif Route", function() {
    test("it should returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });


})