const pool = require('../database/database')
const uuid = require ('uuid')
const moment = require ('moment')


async function createArticle (req, res) {
    const createQuery = `
    INSERT INTO
      articles(
		    article,			
		    title,
       	authorid,		
		    createdOn				
        )
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.body.article,
      req.body.title,
      req.body.authorid,
      moment(new Date())
    ];

    try {
      const { rows } = await pool.query(createQuery, values);
        return res.status(201).json(rows[0]);
    } catch(error) {
      return res.status(400).json(error);
    }
  }

    async function postByID(req, res, next) {
      const text = 'SELECT * FROM articles WHERE articleId = $1';
      try {
        const { rows } = await pool.query(text, [req.params.articleId]);
        if (!rows[0]) {
        return res.status(404).json({'message': 'article not found'});
      }
      return req.profile = rows[0];
        next();
    } catch(error) {
      return res.status(400).send(error)
    }
  }

async function updateArticle(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE articleId=$1';
    const updateOneQuery =`UPDATE articles
      SET title=$1,article=$2,createdOn=$3
      WHERE articleId=$4 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.articleId]);
      if(!rows[0]) {
        return res.status(404).json({'message': 'article not found'});
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.article || rows[0].article,
        moment(new Date()),
        req.params.articleId,
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200)
                .json({
                  "message": "Article successfully updated",
                  "title": response.rows[0].title,
                  "article": response.rows[0].article
                });
    } catch(err) {
      return res.status(400).json(err);
    }
  }

async function listArticles(req, res) {
    const texts = 'SELECT * FROM articles ORDER BY articleId ASC';
    try {
      const { rows } = await pool.query(texts);
      if (!rows) {
        return res.status(404).json({'message': 'articles not found'});
      }
      return res.status(200).send(rows);
    } catch(error) {
      return res.status(400).send(error)
    }
  }
async function getArticle(req, res) {
    const text = 'SELECT * FROM articles WHERE articleId = $1';
    try {
      const { rows } = await pool.query(text, [req.params.articleId]);
      if (!rows[0]) {
        return res.status(404).json({'message': 'article not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  }

  async function removeArticle(req, res, next) {
    const deleteQuery = `DELETE FROM articles WHERE articleId=$1 RETURNING *`;
    try{
        const { rows } = await pool.query(deleteQuery, [req.params.articleId]);
          if(!rows[0]) {
            return res.status(400).json({'message': 'Article not found'})
          }
          return res.status(204).json({message: 'Article Successfully deleted'})
      } catch(error) {
      return res.status(404).json(error)
    }
  }

async function commentArticle (req, res) {
    const createCommentQuery = `
    INSERT INTO
      a_comments(
        comment,
        title, 
        article,     
        createdOn
        )
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.body.comment,
      req.body.title,
      req.body.article,
      moment(new Date())
    ];

    try {
      const { rows } = await pool.query(createCommentQuery, values);
        return res.status(201).json(rows[0]);
    } catch(error) {
      return res.status(400).json(error);
    }
  }

  const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
}





 module.exports = {createArticle, updateArticle, getArticle, listArticles, removeArticle, commentArticle, hasAuthorization, postByID}