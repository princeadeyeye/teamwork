const pool = require('../database/db')
const moment = require ('moment')
const expressJwt = require('express-jwt')
const jwt = require ('jsonwebtoken')



async function createArticle (req, res) {
    const createQuery = `
    INSERT INTO
      articles(
        title,
		    article,			
       	userid,		
		    createdOn				
        )
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.body.title,
      req.body.article,
      req.body.userid,
      moment(new Date())
    ];

    try {
      const { rows } = await pool.query(createQuery, values);
        return res.status(201)
                  .json({
                    "status": "success",
                    "data": {
                    "message": "Article successfully created",
                    "articleId": rows[0].articleid,
                    "createdOn": rows[0].createdOn,
                    "title": rows[0].title
                    }
                    });
    } catch(error) {
      return res.status(400)
                    .json({ 
                      "status": "error",
                      "data": {
                      "message": error
                      }
                  });
    }
  }

async function updateArticle(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE articleid=$1';
    const updateOneQuery =`UPDATE articles
      SET title=$1,article=$2, userid=$3, createdOn=$4
      WHERE articleid=$5 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404)
                      .json({
                      "status": "error",
                      "data": {
                        "message": "Article not found"
                      }
                    });
      }
        let profile = rows;
          const authorized = profile && req.auth && profile[0].userid == req.auth.userId
            if (!(authorized)) {
           return res.status(403)
                        .json({
                            "status": "error",
                            "data": {
                              "message": "User is not authorized"
                            }
                        })
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.article || rows[0].article,
        req.body.userid || rows[0].userid,
        moment(new Date()),
        req.params.id
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200)
                .json({
                  "message": "Article successfully updated",
                  "title": response.rows[0].title,
                  "article": response.rows[0].article
                });
    } catch(err) {
      return res.status(400)
                    .json({ 
                      "status": "error",
                      "data": {
                      "message": error
                      }
                  });
    }
  }

async function listArticles(req, res) {
    const articlesQ = 'SELECT * FROM articles WHERE title = $1'; 
    try {
      const { rows } = await pool.query(articlesQ, [req.query.title]);
      if (!rows) {
        return res.status(404)
                      .json({
                      "status": "error",
                      "data": {
                        "message": "Articles not found"
                      }
                  });
      }
      if(rows === []) {
        return res.status(404)
                    .send({ 
                      "status": "error",
                      "data": {
                        "message": "Category not found"
                      }
                    })
      }
      return res.status(200)
                    .json({
                      "status": "success",
                      "data" : rows
                    });
    } catch(error) {
      return res.status(400)
                    .json({ 
                      "status": "error",
                      "data": {
                      "message": error
                      }
                  });
    }
  }
async function getArticle(req, res) {
    const articleCommentQ = `SELECT articles.articleid, title, article, articles.createdOn, 
                           articlecomments.userid, commentid, comment
                            FROM articles
                              INNER JOIN articlecomments ON articlecomments.articleid = articles.articleid 
                            WHERE articles.articleid = $1`;
          const articleQ = `SELECT * FROM articles WHERE articleid = $1`;
    try {
      const { rows } = await pool.query(articleCommentQ, [req.params.id]);
      if (!rows[0]) {
          const response = await pool.query(articleQ, [req.params.id]);
          if(!response.rows[0]){
            return res.status(404)
                        .json({
                          "status": "error",
                          "data": {
                            "message": "article not found"
                          }
                        });
          }
              return res.status(200)
                        .json({
                            "status": "success",
                            "data": {
                            "id": response.rows[0].articleid,
                            "createdOn": response.rows[0].createdOn,
                            "title": response.rows[0].title,
                            "article": response.rows[0].article,
                            "comments": "Comment is not yet available",
                    }
                        })
      }
      return res.status(200)
               .json({
                            "status": "success",
                            "data": {
                            "id": rows[0].articleid,
                            "createdOn": rows[0].createdon,
                            "title": rows[0].title,
                            "article": rows[0].article,
                            "comments": [
                              {
                                "commentId":rows[0].commentid,
                                "comment":rows[0].comment,
                                "authorId": rows[0].userid,
                              }
            
                            ]
                    }
                  })
    } catch(error) {
      return res.status(400)
                    .json({ 
                      "status": "error",
                      "data": {
                      "message": error
                      }
                  });
    }
  }


  async function removeArticle(req, res, next) {
    const deleteQuery = `DELETE FROM articles WHERE articleid=$1 RETURNING *`;
    try{
        const { rows } = await pool.query(deleteQuery, [req.params.id]);
          if(!rows[0]) {
            return res.status(400)
                        .json({
                          "status": "error",
                          "data": {
                          "message": "Article not found"
                      }
                  });
          }
            let profile = rows;
                const authorized = profile && req.auth && profile[0].userid == req.auth.userId
                  if (!(authorized)) {
                 return res.status(403)
                              .json({
                                "status": "error",
                                 "data": {
                                "message": "User is not authorized"
                            }
                        })
            }
          return res.status(200)
                    .send({
                      "status": "success",
                      "data": {
                          "message": "Article Successfully deleted"
                      }
                    })
      } catch(error) {
      return res.status(404)
                    .json({ 
                      "status": "error",
                      "data": {
                      "message": error
                      }
                  });
    }
  }

async function commentArticle (req, res) {
      const insertCommentq = `
    INSERT INTO
      articlecomments(
        comment,     
        articleid,
        userid,
        createdOn      
        )
      VALUES($1, $2, $3, $4)
      returning *`;
    let insertvalue = [
      req.body.comment,
      req.body.articleid,
      req.body.userid,
      moment(new Date())
    ];

    const findOneQ = 'SELECT * FROM articlecomments WHERE articleid=$1';
    const updateOneQ =`UPDATE articlecomments
                        SET comment = $1, createdOn=$2 
                        returning *`;
    const commentArticleQ = `SELECT title, article, articlecomments.createdOn, comment
                            FROM articles
                              INNER JOIN articlecomments ON articlecomments.articleid = articles.articleid 
                            WHERE articles.articleid = $1`;
    let values = [
      req.body.comment,
      moment(new Date())
    ];

    try {
    const { rows } = await pool.query(insertCommentq, insertvalue);
    const find = await pool.query(findOneQ, [req.params.id])
      if(!find.rows[0]) {
        res.status(400)
                .json({
                  "status": "error",
                    "data": {
                    "message": "Article not found"
                      }
                  });
      }
        const response = await pool.query(updateOneQ, values);
        if(!response.rows[0]) {
          res.status(400)
                .json({
                    "status": "error",
                    "data": {
                      "message": "Unable to comment on article"
                    }
                  })
        }
        const message = await pool.query(commentArticleQ, [req.params.id]);
       return res.status(201)
                  .json({
                    "status": "success",
                        "data": {
                            "message": "Comment successfully created",
                            "createdOn": message.rows[0].createdon,
                            "articleTitle": message.rows[0].title,
                            "article": message.rows[0].article,
                            "comment": message.rows[0].comment,
                        }
                  });
    } catch(error) {
      return res.status(400)
                     .json({ 
                      "status": "error",
                      "data": {
                      "message": error
                      }
                  });
    }
  }



async function feeds(req, res) {
      const feedQuery =`   
       SELECT articleid, title, article, createdOn, userid
       FROM articles
       UNION 
       SELECT gifid, title, imageUrl, createdOn, userid
        FROM gifs
        ORDER BY articleid ASC
       `;
      try {
        const { rows } = await pool.query(feedQuery);
        if (!rows) {
          return res.status(404)
                      .json({ 
                        "status": "error",
                        "data": {
                        "message": error
                      }
                  });
        }
        return res.status(200)
                    .json({
                        "status": "success",
                          "data": [
                            {
                            "id": rows[0].articleid,
                            "createdOn": rows[0].createdon,
                            "title": rows[0].title,
                            "article/url": rows[0].article,
                            "authorId": rows[0].userid,
                          },
                          {
                            "id": rows[1].articleid,
                            "createdOn": rows[1].createdon,
                            "title": rows[1].title,
                            "article/url": rows[1].article,
                            "authorId": rows[1].userid,
                          }, 
                          {
                            "id": rows[2].articleid,
                            "createdOn": rows[2].createdon,
                            "title": rows[2].title,
                            "article/url": rows[2].article,
                            "authorId": rows[2].userid,
                          },
                          {
                            "id": rows[3].articleid,
                            "createdOn": rows[3].createdon,
                            "title": rows[3].title,
                            "article/url": rows[3].article,
                            "authorId": rows[3].userid,
                          },
                          {
                            "id": rows[4].articleid,
                            "createdOn": rows[4].createdon,
                            "title": rows[4].title,
                            "article/url": rows[4].article,
                            "authorId": rows[4].userid,
                          },
                          {
                            "id": rows[5].articleid,
                            "createdOn": rows[5].createdon,
                            "title": rows[5].title,
                            "article/url": rows[5].article,
                            "authorId": rows[5].userid,
                          }
                        ]
                          
                    });
    } catch(error) {
        return res.status(400)
                       .json({ 
                          "status": "error",
                          "data": {
                          "message": error
                      }
                  });
    }
  }




 module.exports = {createArticle, listArticles, updateArticle, getArticle, removeArticle, commentArticle, feeds }