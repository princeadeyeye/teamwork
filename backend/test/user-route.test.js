const request = require('request');
const server = require('../routes/user-route')
const base_url = 'http://localhost:5000/'


describe("User Route", function() {


  describe("Post User Route", function() {
    test("it should returns status code 201", function(done) {
      request.post(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });

describe("Update User Route", function() {
    test("it should returns status code 200", function(done) {
      request.patch(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

describe("Delete User Route", function() {
    test("it should returns status code 204", function(done) {
      request.delete(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(204);
        done();
      });
    });
  });

describe("Get User Route", function() {
    test("it should returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });


})