const pool = require('../database/database')
const uuid = require('uuid')


async function createGif (req, res) {
    const createQuery = `
    INSERT INTO
      gifs(
      	gifId, 			
		image,			
		title,
		imageUrl, 				
		createdOn				
        )
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuid,
      req.body.image,
      req.body.title,
      req.body.imageUrl,
      moment(new Date())
    ];

    try {
      const { rows } = await pool.query(createQuery, values);
        return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  }

  async function listGifs(req, res) {
    const texts = 'SELECT * FROM gifs ORDER BY gifId ASC';
    try {
      const { rows } = await pool.query(texts);
      if (!rows) {
        return res.status(404).json({'message': 'Gifs not found'});
      }
      return res.status(200).send(rows);
    } catch(error) {
      return res.status(400).send(error)
    }
  }
async function getGif(req, res) {
    const text = 'SELECT * FROM gifs WHERE gifId = $1';
    try {
      const { rows } = await pool.query(text, [req.params.gifId]);
      if (!rows[0]) {
        return res.status(404).json({'message': 'Gif not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  }


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

module.exports = {createGif, getGif, listGifs }