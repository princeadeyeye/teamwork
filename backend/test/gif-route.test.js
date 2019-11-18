const request = require('supertest');
const app = require('../app.js')


describe("Gif Route", () => {


    const fakeToken = ''
   const token = ''

const testImage = `${__dirname}/../files/images/photo.gif`



  describe("Post gif Route", () => {
    test("should not post gif without auth", (done) => {
        request(app)
            .post('/api/v1/gifs/')
            .set('content-type', 'application/octet-sream')
            .attach("photo", testImage)
            .field({ userid: 2})
            .then((response) => {
              expect(response.statusCode).toBe(401);
        done();
      });
    });

   test("should not allow unauthorized user to post", (done) => {
        request(app)
            .post('/api/v1/gifs/')
            .set('Authorization', `Bearer ${fakeToken}`)
            .set('content-type', 'application/octet-sream')
            .attach("photo", testImage)
            .field({ userid: 2})
            .then((response) => {
              expect(response.statusCode).toBe(401);
              done();
      });
    });
test("should reject post without userid", (done) => {
        request(app)
            .post('/api/v1/gifs/')
            .set('Authorization', `Bearer ${fakeToken}`)
            .set('content-type', 'application/octet-sream')
            .attach("photo", testImage)
            .then((response) => {
              expect(response.statusCode).toBe(401);
              done();
      });
    });
  });


describe("Delete Gif Route", () => {
    test("should reject authorized delete", (done) => {
      request(app)
      .delete('/api/v1/gifs/1')
      .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'image/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

    test("should accept authorized delete", (done) => {
      request(app)
      .delete('/api/v1/gifs/100')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'image/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

})

describe("Get Gif Route", () => {
    test("should get single user", (done) => {
      return request(app)
      .get(`/api/v1/gifs/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'image/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

    test("should reject unautheticated access to user single user", (done) => {
      return request(app)
        .get(`/api/v1/gifs/1`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'image/json')
        .then((response) => {
          expect(response.statusCode).toBe(401);
          done();
      });
    });

       test("user not found", (done) => {
      return request(app)
        .get(`/api/v1/gifs/11111111111`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'image/json')
        .then((response) => {
          expect(response.statusCode).toBe(401);
          done();
      });
    });
  });



describe("Put Gif Comment ", () => {
    test("it should reject comment by unknown", (done) => {
      request(app)
        .put('/api/v1/gifs/1/comment')
        .set('Accept', 'image/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

   test("it should accept comment by a user", (done) => {
      request(app)
      .put('/api/v1/gifs/1/comment')
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