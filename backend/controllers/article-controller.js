const pool = require('../database/database')

/*const writeArticle = (req, res, next) => {
	const article = [
		req.body.articleId,
		req.body.input,
		req.bodycomments,
		req.body.postedBy,
		req.body.created,
		req.body.postedDate 	
	]
	client.query('writeArticleQuery', (err, result) => {
		if (err) {
			res.status(401).json(err)
		}
		res.status(200).json('Suceessfully add article')
	})
}*/

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

// module.exports = {writeArticle, listArticles, getArticle, updateArticle, removeArticle, commentArticle }