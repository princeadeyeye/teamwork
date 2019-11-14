const request = require('supertest');
const app = require('../app.js')


describe("Gif Route", () => {

    
      // declare the token variable in a scope accessible
      // by the entire test suite
  
 /*   let token;

    beforeAll((done) => {
      request(app)
        .post('/auth/v2/signin')
        .send({
          email: "m2@gmail.com",
          password: 123
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          console.log(response.data)
          done();
        });
    });*/

   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3MzcyNjg2OSwiZXhwIjoxNTczODEzMjY5fQ.GgFJAcLmo4WIRfp7la02okl0cpGB-rWFQuV0SU3nuxE'
  const fakeToken = 'thefaketoken123'

const testImage = `${__dirname}/../files/images/photo.gif`



  describe("Post gif Route", () => {
    test("should not post empty gif", (done) => {
        request(app)
            .post('/api/v2/gifs/')
            .set('Authorization', `Bearer ${token}`)
            .set('content-type', 'application/octet-sream')
            .attach("photo", testImage)
            .field({ userid: 1})
            .then((response) => {
              expect(response.statusCode).toBe(201);
        done();
      });
    });

    test("should not post empty gif", (done) => {
        request(app)
            .post('/api/v2/gifs/')
            .set('Authorization', `Bearer ${token}`)
            .set('content-type', 'application/octet-sream')
            .attach("photo", testImage)
            .field({ userid: ''})
            .then((response) => {
             expect(response.statusCode).toBe(400);
        done();
      });
    });   


  });


describe("Delete Gif Route", () => {
    test("should reject authorized delete", (done) => {
      request(app)
      .delete('/api/v2/gifs/1')
      .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'image/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

    test("should accept authorized delete", (done) => {
      request(app)
      .delete('/api/v2/gifs/19')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'image/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });
  });

describe("Get Gif Route", () => {
    test("should get single user", (done) => {
      return request(app)
      .get(`/api/v2/gifs/10`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'image/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test("should reject unautheticated access to user single user", (done) => {
      return request(app)
        .get(`/api/v2/gifs/1`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'image/json')
        .then((response) => {
          expect(response.statusCode).toBe(401);
          done();
      });
    });
  });



describe("Put Gif Comment ", () => {
    test("it should accept comment by a user", (done) => {
      request(app)
        .put('/api/v2/gifs/1/comment')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'image/json')
        .send({
          "comment": "Tinubu bullion van is really disburbing ",
          "gifid": "1",
           "userid": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
    });

   test("it should accept comment by a user", (done) => {
      request(app)
      .put('/api/v2/gifs/1/comment')
      .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'application/json')
      .send({
          "comment": "Tinubu bullion van is really disburbing ",
          "gifid": "1",
           "userid": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
  });
})