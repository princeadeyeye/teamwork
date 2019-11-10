const request = require('request');
const server = require('../routes/auth-route')
const base_url = 'http://localhost:5000/'


describe("Auth Route", function() {


  describe("Post Auth Route", function() {
    test("it should returns status code 201", function(done) {
      request.post(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });
})