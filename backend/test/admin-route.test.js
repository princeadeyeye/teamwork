const request = require('request');
const server = require('../routes/admin-route')
const base_url = 'http://localhost:5000/'


describe("Admin Route", function() {


  describe("Post Admin Route", function() {
    test("it should returns status code 201", function(done) {
      request.post(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });
})