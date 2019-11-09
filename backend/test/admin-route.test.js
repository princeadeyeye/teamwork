const request = require('request');
const server = require('../backend/server')
const base_url = 'http://localhost:5000/'


describe("Admin Route", function() {


  describe("Post Admin Route", function() {
    it("returns status code 201", function(done) {
      request.post(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });
})