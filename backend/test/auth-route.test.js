const request = require('supertest');
const app = require('../app')


describe("Auth Route", () => {


describe("Post Auth Route", () => {
  test("should resgister valid employee", (done) => {
   request(app)
   .post('/auth/v2/create-user/')
   .then((response) => {
        expect(response.statusCode).not.toBe(201);
        done();
      });
    });

  });

describe("Sign in to  Auth Route", () => {
  test("should sign in valid employee", (done) => {
   request(app)
   .post('/auth/v2/signin')
   .then((response) => {
        expect(response.statusCode).not.toBe(201);
        done();
      });
    });

  });


})