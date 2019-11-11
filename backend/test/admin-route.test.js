const request = require('supertest');
const app = require('../app')


describe("Admin Route", () => {


  describe("Post Admin Route", () => {
    test("it should not returns status code 201", (done) => {
      request(app)
      .post('/admin/v2/create-admin')
      .then((response) => {
      	expect(response.statusCode).not.toBe(201);
        done();
      })
    });

  });


  describe("Signin Admin Route", () => {
    test("create a valid in", (done) => {
      request(app)
      .post('/admin/v2/signin')
      .then((response) => {
      	expect(response.statusCode).not.toBe(201);
        done();
      })
    });

  });
})

