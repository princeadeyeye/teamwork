const request = require('supertest');

const app = require('../app.js')


describe("Article Route", () => {


   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM2LCJpYXQiOjE1NzQwMjcyMjgsImV4cCI6MTU3NDExMzYyOH0.MJK9cetGKzER4Qiv3BYJ7bjuczPwJ8TEbIU_YoAg5A0'
  const fakeToken = 'thefaketoken123'
 
  describe("Post Article Route", () => {
    test("should not post empty article", (done) => {
        request(app)
        .post('/api/v1/articles/')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .then((response) => {
         expect(response.statusCode).toBe(400);
        done();
      });
    });

   test("should not post article with fake token", (done) => {
        request(app)
        .post('/api/v1/articles/')
        .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'application/json')
        .send({
          "article": "bullion van are used to pick money",
          "title": "bullion van",
          "createdon": new Date(),
          "userid": 2
        })
        .then((response) => {
         expect(response.statusCode).toBe(401);
        done();
      });
    });
   test("should not post article without authoriztion", (done) => {
        request(app)
        .post('/api/v1/articles/')
        .set('Accept', 'application/json')
        .send({
          "article": "bullion van are used to pick money",
          "title": "bullion van",
          "createdon": new Date(),
          "userid": 2
        })
        .then((response) => {
         expect(response.statusCode).toBe(401);
        done();
      });
    });
  });

describe("Update Article Route", () => {
    test(" should not accept unauthorized and unautheticated user without update", (done) => {
        request(app)
        .patch('/api/v1/articles/1')
        .set('Accept', 'application/json')
        .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });


    test(" should not accept unauthorized user with update", (done) => {
        request(app)
        .patch('/api/v1/articles/1')
         .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({
          "article": "bullion van are used to pick money",
          "title": "bullion van",
          "createdon": new Date(),
          "userid": 1
        })
        .then((response) => {
        expect(response.statusCode).toBe(403);
        done();
      });
    });

    test(" should reject unautheticated and authenticated user ", (done) => {
        request(app)
        .patch('/api/v1/articles/1')
         .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'application/json')
        .send({
          "article": "bullion van are used to pick money",
          "title": "bullion van",
          "createdon": new Date(),
          "userid": 36
        })
        .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

    test(" should reject authorized but not authenticated user ", (done) => {
        request(app)
        .patch('/api/v1/articles/1')
        .set('Accept', 'application/json')
        .send({
          "article": "bullion van are used to pick money",
          "title": "bullion van",
          "createdon": new Date(),
          "userid": 36
        })
        .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
  });

describe("Delete Article Route", () => {
    test("should reject unautheticated delete", (done) => {
      request(app)
      .delete('/api/v1/articles/1')
      .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

    test("should reject authorized delete", (done) => {
      request(app)
      .delete('/api/v1/articles/19')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    test("should reject user without authentication", (done) => {
      request(app)
      .delete('/api/v1/articles/39')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });
  });

describe("Get Article Route", () => {
    test("should get single user", (done) => {
      return request(app)
      .get(`/api/v1/articles/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test("should reject unautheticated access to user single user", (done) => {
      return request(app)
        .get(`/api/v1/articles/1`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.statusCode).toBe(401);
          done();
      });
    });

      test("user not foung", (done) => {
      return request(app)
        .get(`/api/v1/articles/1000`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .set('Accept', 'application/json')
        .then((response) => {
          expect(response.statusCode).toBe(401);
          done();
      });
    });
  });



describe("Put Article Comment ", () => {
    test("it should reject comment by an unautheticated user", (done) => {
      request(app)
      .put('/api/v1/articles/3/comment')
      .set('Accept', 'application/json')
      .send({
          "comment": "Tinubu bullion van is really disburbing ",
          "articleid": "1",
           "userid": 1
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });

   test("it should reject comment without a user", (done) => {
      request(app)
      .put('/api/v1/articles/1/comment')
      .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'application/json')
      .send({
          "comment": "Tinubu bullion van is really disburbing ",
          "articleid": "1"
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });


  });

describe("Get Feed", () => {
    test("get all feeds", (done) => {
      request(app)
      .get('/api/v1/feed/')
        .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test("reject unautheticated user access to feeds", (done) => {
      request(app)
      .get('/api/v1/feed/')
        .set('Authorization', `Bearer ${fakeToken}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
    });


  });

})

