const request = require('supertest');
const app = require('../app')


describe("Employee Route", () => {



const faketoken = ``
 const token = ``

  describe("Post Employee Route", () => {
    test("should not be able register successfully ", (done) => {
      request(app)
      .post('/api/v1/auth/create-user/')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401)
        expect.stringContaining('Some values are missing')
        expect.stringContaining('Bad Request')

        done();
      })
    });
/*
        test("should be able register successfully ", (done) => {
          request(app)
          .post('/api/v1/auth/create-user/')
          .set('Accept', 'application/json')
          .send({
             "firstName": "mario",
             "lastName": "gamee",
              "jobRole": "employee",
              "department": "techinian",
              "address": "123 conhy street"
            })
          .then((response) => {
            expect(response.statusCode).toBe(401)
            done();
          })
    });

    test("should not be able to register with missing values ", (done) => {
      request(app)
      .post('/api/v1/auth/create-user/')
      .set('Authorization', `Bearer ${token}`)
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
        expect(response.statusCode).toBe(401)
        expect.stringContaining('Some values are missing')
        expect.stringContaining('Bad Request')
        done();
      })
    });

     describe("Post auth Route", () => {
    test("should not be able to register with invalid email ", (done) => {
      request(app)
      .post('/api/v1/auth/create-user/')
      .set('Authorization', `Bearer ${token}`)
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
        expect(response.statusCode).toBe(401)
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
      .set('Authorization', `Bearer ${faketoken}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      })
    });

  });*/
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

/*    test("invalid signin missing password", (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });

   test("invalid signin, missing email", (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    }); 

     test("invalid signin, wrong password", (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      })
    });*/

  });


})

