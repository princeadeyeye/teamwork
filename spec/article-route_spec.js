const request = require('request');
const server = require('../backend/server')
const base_url = 'http://localhost:5000/'


describe("Article Post", function() {


  describe("Post Article /", function() {
    it("returns status code 201", function(done) {
      request.post(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });

describe("Update Article /", function() {
    it("returns status code 200", function(done) {
      request.patch(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

describe("Delete Article /", function() {
    it("returns status code 204", function(done) {
      request.delete(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(204);
        done();
      });
    });
  });


})