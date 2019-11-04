const pool = require('../database/database')
const uuid = require('uuid')


async function createGif (req, res) {
    const createQuery = `
    INSERT INTO
      gifs(
      gifId, 			
		  title,
		  imageUrl, 				
		  createdOn				
        )
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      default,
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
      const { rows } = await pool.query(findOneQuery, [req.params.gifId]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'Gif not found'});
      }
      const values = [
        req.body.image || rows[0].image,
        req.body.title || rows[0].title,
        req.body.imageUrl || rows[0].imageUrl,
        moment(new Date()),
        req.params.gifId,
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  }


 async function removeGif(req, res, next) {
    const deleteQuery = `DELETE FROM gifs WHERE gifId=$1 RETURNING *`;
    try{
        const { rows } = await pool.query(deleteQuery, [req.params.gifId]);
          if(!rows[0]) {
            return res.status(400).send({'message': 'Gif not found'})
          }
          return res.status(204).send({'message': 'Gif Deleted'})
      } catch(error) {
      return res.status(404).send(error)
    }
  }


async function commentGif(req, res) {
    const findOneQuery = 'SELECT * FROM gifs WHERE gifId=$1';
    const updateCommentQuery =`UPDATE comments
      SET comment=$1 WHERE gifId=$2 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.gifId]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'Gif not found'});
      }
      const values = [
        req.body.comment || rows[0].comment,
        req.params.gifId
      ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  }
module.exports = {createGif, getGif, listGifs, updateGif, removeGif, commentGif }