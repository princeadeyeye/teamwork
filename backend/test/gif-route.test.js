const request = require('supertest');
const app = require('../app.js')


describe("Gif Route", () => {

  const fakeToken = 'thefaketoken123'
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU3Mzg3MzQyOCwiZXhwIjoxNTczOTU5ODI4fQ.gUQfTH257Yffp0BpKG9yHWEy7Ql_6X7ecz_2w9_20bQ`

const testImage = `${__dirname}/../files/images/photo.gif`



  describe("Post gif Route", () => {
    test("should post gif successfully", (done) => {
        request(app)
            .post('/api/v2/gifs/')
            .set('Authorization', `Bearer ${token}`)
            .set('content-type', 'application/octet-sream')
            .attach("photo", testImage)
            .field({ userid: 2})
            .then((response) => {
              expect(response.statusCode).toBe(201);
        done();
      });
    });

   test("should not allow unauthorized user to post", (done) => {
        request(app)
            .post('/api/v2/gifs/')
            .set('Authorization', `Bearer ${fakeToken}`)
            .set('content-type', 'application/octet-sream')
            .attach("photo", testImage)
            .field({ userid: 2})
            .then((response) => {
              expect(response.statusCode).toBe(401);
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
      .delete('/api/v2/gifs/1')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'image/json')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });
  });

describe("Get Gif Route", () => {
    test("should get single user", (done) => {
      return request(app)
      .get(`/api/v2/gifs/1`)
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
           "userid": 2
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
           "userid": 2
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
  });
})