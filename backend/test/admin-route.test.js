const request = require('supertest');
const app = require('../app')


describe("Admin Route", () => {


  describe("Post Admin Route", () => {
    test("should not be able register successfully ", (done) => {
      request(app)
      .post('/api/v1/auth/create-admin')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect.stringContaining('Some missing values')
        done();
      })
    });

    test("should not be able to register with missing values ", (done) => {
      request(app)
      .post('/api/v1/auth/create-admin')
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
        expect(response.statusCode).toBe(400)
        expect.stringContaining('Some values are missing')
        done();
      })
    });

     describe("Post Admin Route", () => {
    test("should not able to register with invalid email ", (done) => {
      request(app)
      .post('/api/v1/auth/create-admin')
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
        expect(response.statusCode).toBe(400)
        expect.stringContaining('Enter a valid email address')
        done();
      })
    });

  });
 describe("Post Admin Route", () => {
    test("should not able register successfully ", (done) => {
      request(app)
      .post('/api/v1/auth/create-admin')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect.stringContaining('Some values are missing')
        done();
      })
    });

  });
  });


 describe("Signin Admin Route", () => {
    test("create a invalid signin missing request", (done) => {
      request(app)
        .post('/api/v1/auth/admin-signin')
        .set('Accept', 'application/json')
        .send({
          "email": "m@gmail.com",
          "password": "123"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect.stringContaining('The credentials ypu provided is incorrect')
        done();
      })
    });

    test("invalid signin", (done) => {
      request(app)
        .post('/api/v1/auth/admin-signin')
        .send({
          "email": "m12@gmail.com",
          "password": ""
        })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect.stringContaining('The password you provided did not match')
        done();
      })
    });

    test("valid signin", (done) => {
      request(app)
        .post('/api/v1/auth/admin-signin')
        .send({
          "email": "m12@gmail.com",
          "password": "123"
        })
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect.stringContaining('The password you provided did not match')
        done();
      })
    });

    test("invalid signin", (done) => {
      request(app)
        .post('/api/v1/auth/admin-signin')
        .send({
          "email": "m12@gmail.com",
          "password": "12345"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        done();
      })
    });
  });
 test("valid signin", (done) => {
      request(app)
        .post('/v1/auth/admin-signin')
        .send({
          "email": "m12@gmail.com",
          "password": "123"
        })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      })
    });

})

