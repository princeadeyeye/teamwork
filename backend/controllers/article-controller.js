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
		comment, 				
		createdOn				
        )
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.articleId,
      req.body.article,
      req.body.title,
      req.body.comment,
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
      SET article=$1,title=$2,comment=$3,createdOn=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.articleId]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'article not found'});
      }
      const values = [
        req.body.article || rows[0].article,
        req.body.title || rows[0].title,
        req.body.comment || rows[0].comment,
        moment(new Date()),
        req.params.articleId,
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  }

/*const getArticle = (req, res, next) => {
	const id = req.params.articleId;
	client.query('getArticleQuery', (err, result) => {
		if (err) {
			res.status(401).json(err)
		}
		res.status(200).json('result.rows')
	})
}
/*const removeArticle = (req, res, next) => {
	const id = req.params.articleId;
	client.query('removeArticleQuery', [id] , (err, result) => {
		if(err) {
			coonsole.log(err)
			res.status(401).json(err);
		}
		res.status(200).json('Delete successfully')
	})
}*/


/*const commentArticle = (req, res, next) => {
	const comment = [
		req.bodycomments,
		req.body.commentBy,
		req.params.articleId
		]
	client.query('commentArticleQuery', comment, (err, result) => {
		if(err) {
			console.log(err);
			res.status(401).json(err);
		}
		res.status(200).json(`Article modified with ID: ${req.params.articleId} given comment`);
	})*/

 module.exports = {createArticle, updateArticle}