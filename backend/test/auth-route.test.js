const request = require('supertest');
const app = require('../app')
require('dotenv').config()


describe("User Route", () => {

// const token = process.env.ADMINTOKEN
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3NDA5OTYwMiwiZXhwIjo4NjU1NzQwOTk2MDJ9.BMrtz_oWheGi7owGli-X3zfJ56F-2kI7uqLW_Ktt-nQ`
const ADMINTOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTU3NDE4MDAxMiwiZXhwIjo4NjU1NzQxODAwMTJ9.a1zlB4jcVzLK-UTqU4d2rrdE45oNTjLWRaqRekJ40PI`
  const fakeToken = 'thefaketoken123'


  describe("Post User Route", () => {
    test("should not be able register successfully ", (done) => {
      request(app)
      .post('/api/v1/auth/create-user/')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(403)
        expect.stringContaining('user not recognized')
        expect.stringContaining('Bad Request')
        done();
      })
    });

        test("should return authorized ", (done) => {
          request(app)
          .post('/api/v1/auth/create-user/')
          .set('Accept', 'application/json')
          .send({
             "firstName": "mario",
             "lastName": "gamee",
              "jobRole": "techinian",
              "department": "IT",
              "address": "123 conhy street"
            })
          .then((response) => {
            expect(response.statusCode).toBe(401)
            expect.stringContaining('unauthorized')
            done();
          })
    });

    test("should not be able to register with missing values ", (done) => {
      request(app)
      .post('/api/v1/auth/create-user/')
      .set('Authorization', `Bearer ${ADMINTOKEN}`)
      .set('Accept', 'application/json')
      .send({
         "firstName": "",
         "lastName": "",
          "email": "m12@gmail.com",
          "password": "",
          "jobRole": "",
          "department": "techinian",
          "address": "123 conhy street"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect.stringContaining('some values are missing')
        expect.stringContaining('Bad Request')
        done();
      })
    });

     describe("Post auth Route", () => {
    test("should not be able to register with invalid email ", (done) => {
      request(app)
      .post('/api/v1/auth/create-user/')
      .set('Authorization', `Bearer ${ADMINTOKEN}`)
      .set('Accept', 'application/json')
      .send({
         "firstName": "taiwo",
         "lastName": "olawale",
          "email": "m12gmail.com",
          "password": "123",
          "jobRole": "Accountant",
          "department": "auth",
          "address": "123 conhy street"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400)
        expect.stringContaining('Please enter a valid email address')
        expect.stringContaining('Bad Request')
        done();
      })
    });

  });
 describe("Post auth Route", () => {
    test("should not be able register successfully ", (done) => {
      request(app)
      .post('/api/v1/auth/create-user/')
      .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      })
    });

  });
  });


 describe("Signin auth Route", () => {
    test("create a valid in", (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

    test("invalid signin missing password", (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send({
          "email": "m12@gmail.com",
          "password": " "
        })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

   test("invalid signin, missing email", (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send({
          "email": "   ",
          "password": "123"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    }); 

     test("invalid signin, wrong password", (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send({
          "email": "m2@gmail.com",
          "password": "1349"
        })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

  });


})

