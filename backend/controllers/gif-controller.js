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

  async function updateGif(req, res) {
    const findOneQuery = 'SELECT * FROM gifs WHERE gifId=$1';
    const updateOneQuery =`UPDATE gifs
      SET image=$1, title=$2, imageUrl=$3, createdOn=$4
      WHERE gifId=$5 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.articleId]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'Gif not found'});
      }
      const values = [
        req.body.image || rows[0].image,
        req.body.title || rows[0].title,
        req.body.imageUrl || rows[0].imageUrl,
        moment(new Date()),
        req.params.articleId,
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  }


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

module.exports = {createGif, getGif, listGifs, updateGif }