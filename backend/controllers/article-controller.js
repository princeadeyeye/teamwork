const pool = require('../database/database')
const uuid = require ('uuid')
const moment = require ('moment')

async function createArticle (req, res) {
    const createQuery = `
    INSERT INTO
      articles(
      	articleId, 			
		    article,			
		    title,		
		    createdOn				
        )
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuid(),
      req.body.article,
      req.body.title,
      moment(new Date())
    ];

    try {
      const { rows } = await pool.query(createQuery, values);
        return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  }

async function updateArticle(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE articleId=$1';
    const updateOneQuery =`UPDATE articles
      SET article=$1,title=$2,createdOn=$3
      WHERE articleId=$4 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.articleId]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'article not found'});
      }
      const values = [
        req.body.article || rows[0].article,
        req.body.title || rows[0].title,
        moment(new Date()),
        req.params.articleId,
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
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
            return res.status(400).send({'message': 'Article not found'})
          }
          return res.status(204).send({'message': 'Article Deleted'})
      } catch(error) {
      return res.status(404).send(error)
    }
  }

async function commentArticle(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE articleId=$1';
    const updateCommentQuery =`UPDATE comments
      SET comment=$1 WHERE articleId=$2 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.articleId]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'article not found'});
      }
      const values = [
        req.body.comment || rows[0].comment,
        req.params.articleId
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  }


 module.exports = {createArticle, updateArticle, getArticle, listArticles, removeArticle, commentArticle}