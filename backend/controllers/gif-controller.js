const pool = require('../database/database')

/*const writeGif = (req, res, next) => {
	const gif = [
		req.body.gifId,
		req.body.gif,
		req.gif_comment,
		req.body.gif_by,
		req.body.posted_gif_Date 	
	]
	pool.query('writeGifQuery', gif (err, result) => {
		if (err) {
			res.status(401).json(err)
		}
		res.status(200).json('Suceessfully add gif')
	})
}*/

/*const listGifs = (req, res, next) => {
	pool.query('listGifs', (err, result) => {
		if (err) {
			res.status(401).json(err)
		}
		res.status(200).json('result.rows')
	})
}*/

/*const getGif = (req, res, next) => {
	const id = req.params.gifId;
	pool.query('getGifQuery', (err, result) => {
		if (err) {
			res.status(401).json(err)
		}
		res.status(200).json('result.rows')
	})
}*/

/*const updateGif = (req, res, next) => {
	const gif = [
		req.body.gifId,
		req.body.gif,
		req.gif_comment,
		req.body.gif_by,
		req.body.posted_gif_Date,
		req.params.articleId
		]
	pool.query('updateGifQuery', article, (err, result) => {
		if(err) {
			console.log(err);
			res.status(401).json(err);
		}
		res.status(200).json(`Gif modified with ID: ${req.params.articleId}`);
	})
}*/
/*const removeGif = (req, res, next) => {
	const id = req.params.gifId;
	pool.query('removeGifQuery', [id] , (err, result) => {
		if(err) {
			coonsole.log(err)
			res.status(401).json(err);
		}
		res.status(200).json('Delete successfully')
	})
}*/


/*const commentGif = (req, res, next) => {
	const comment = [
		req.bodycomments,
		req.body.commentBy,
		req.params.articleId
		]
	pool.query('commentGifQuery', comment, (err, result) => {
		if(err) {
			console.log(err);
			res.status(401).json(err);
		}
		res.status(200).json(`Article modified with ID: ${req.params.articleId} given comment`);
	})*/

// module.exports = {writeGif, listGifs, getGif, updateGif, removeGif, commentGif }