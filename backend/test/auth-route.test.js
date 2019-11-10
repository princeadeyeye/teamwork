const request = require('supertest');
const server = require('../app')


describe("Auth Route", () => {


describe("Post Auth Route", () => {
  test("it should returns status code 201", (done) => {
   request(app).post('/auth/v2/create-user/').then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });

describe("Sign in to  Auth Route", () => {
  test("it should returns status code 201", (done) => {
   request(app).post('/auth/v2/signin').then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

  });


})