const request = require('supertest');
const app = require('../app')


describe("Admin Route", () => {


  describe("Post Admin Route", () => {
    test("should be able register successfully ", (done) => {
      request(app)
      .post('/v2/admin/create-admin')
      .set('Accept', 'application/json')
      .send({
         "firstName": "taiwo",
         "lastName": "olawale",
          "password": "123",
          "jobRole": "admin",
          "department": "admin",
          "address": "123 conhy street"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

    test("should not be able to register with missing values ", (done) => {
      request(app)
      .post('/v2/admin/create-admin')
      .set('Accept', 'application/json')
      .send({
         "firstName": "",
         "lastName": "",
          "email": "m12@gmail.com",
          "password": "",
          "jobRole": "",
          "department": "admin",
          "address": "123 conhy street"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

     describe("Post Admin Route", () => {
    test("should not able to register with invalid email ", (done) => {
      request(app)
      .post('/v2/admin/create-admin')
      .set('Accept', 'application/json')
      .send({
         "firstName": "taiwo",
         "lastName": "olawale",
          "email": "m12gmail.com",
          "password": "123",
          "jobRole": "Accountant",
          "department": "admin",
          "address": "123 conhy street"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

  });
 describe("Post Admin Route", () => {
    test("should not able register successfully ", (done) => {
      request(app)
      .post('/v2/admin/create-admin')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

  });
  });


 describe("Signin Admin Route", () => {
    test("create a invalid signin missing request", (done) => {
      request(app)
        .post('/v2/admin/signin')
        .set('Accept', 'application/json')
        .send({
          "password": "123"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

    test("invalid signin", (done) => {
      request(app)
        .post('/v2/admin/signin')
        .send({
          "email": "m12@gmail.com",
          "password": ""
        })
      .then((response) => {
        expect(response.statusCode).not.toBe(201);
        done();
      })
    });

  });


})

