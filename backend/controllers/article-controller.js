const pool = require('../database/database')
const uuidv4 = require ('uuid/v4')
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
      uuidv4(),
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


/*const listArticles = (req, res, next) => {
	client.query('listArticlesQuery', (err, result) => {
		if (err) {
			res.status(401).json(err)
		}
		res.status(200).json('result.rows')
	})
}*/

/*const getArticle = (req, res, next) => {
	const id = req.params.articleId;
	client.query('getArticleQuery', (err, result) => {
		if (err) {
			res.status(401).json(err)
		}
		res.status(200).json('result.rows')
	})
}*/

/*const updateArticle = (req, res, next) => {
	const article = [
		req.body.articleId,
		req.body.input,
		req.bodycomments,
		req.body.postedBy,
		req.body.created,
		req.body.postedDate,
		req.params.articleId
		]
	client.query('updateArticleQuery', article, (err, result) => {
		if(err) {
			console.log(err);
			res.status(401).json(err);
		}
		res.status(200).json(`Article modified with ID: ${req.params.articleId}`);
	})
}*/
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

 module.exports = {createArticle}