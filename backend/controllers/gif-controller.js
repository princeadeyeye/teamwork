const pool = require('../database/database')
//IMPORT CLOUDINARY CONFIG HERE
const cloudinary = require('../cloudinaryConfig.js');


async function createGif (req, res)  {

const file = req.files.photo;
console.log(file)
  const createQuery = `INSERT INTO
      gifs(title, imageUrl, userid, createdOn )
      VALUES($1, $2, $3, $4)
      returning *`;
   
cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
 if (err) {
  return res.status(401).send({error: err})
 }
  const values = [
      file.name,
      result.url,
      req.body.userid,
      result.created_at
    ];

pool.query(createQuery, values, (err, results) => {
  if(err) {
    return res.status(401).send({error: err})
  }
  return res.status(201).send({success: true, data: results.rows[0]});
      }); 
    })
}

/*
     async function postByID(req, res, next) {
      const text = 'SELECT * FROM gifs WHERE gifid = $1';
      try {
        const { rows } = await pool.query(text, [req.params.articleId]);
        if (!rows[0]) {
        return res.status(404).json({'message': 'gif not found'});
      }
      return req.profile = rows[0];
        next();
    } catch(error) {
      return res.status(400).json(error)
    }
  }*/

  // To be comment out
  async function listGifs(req, res) {
    const gifQ = 'SELECT * FROM gifs ORDER BY gifid ASC'; 
    try {
      const { rows } = await pool.query(gifQ);
      if (!rows) {
        return res.status(404).json({'message': 'gifs not found'});
      }
      return res.status(200).json(rows);
    } catch(error) {
      return res.status(400).json(error)
    }
  }
async function getGif(req, res) {
    const gifCommentQ = `SELECT gifs.gifid, title, imageUrl, gifs.createdOn, 
                              commentid, comment, a_comments.userid
                            FROM gifs
                              INNER JOIN gifcomments ON gifcomments.gifid = gifs.gifid 
                            WHERE gifs.gifid = $1`;
          const gifQ = `SELECT * FROM gifs WHERE gifid = $1`;
    try {
      const { rows } = await pool.query(gifCommentQ, [req.params.id]);
      if (!rows[0]) {
          const response = await pool.query(gifQ, [req.params.id]);
          if(!response.rows[0]){
            return res.status(404).json({'message': 'article not found'});
          }
              return res.status(200).json(response.rows[0])
      }
      return res.status(200).json(rows[0]);
    } catch(error) {
      return res.status(400).json(error)
    }
  }


  async function removeGif(req, res, next) {
    const deleteQuery = `DELETE FROM gifs WHERE gifs=$1 RETURNING *`;
    try{
        const { rows } = await pool.query(deleteQuery, [req.params.id]);
          if(!rows[0]) {
            return res.status(400).json({'message': 'Gif not found'})
          }
          return res.status(204).send({'message': 'Gif Successfully deleted'})
      } catch(error) {
      return res.status(404).json(error)
    }
  }

async function commentGif (req, res) {
      const insertCommentq = `
    INSERT INTO
      gifcomments(
        comment,     
        gifid,
        createdOn      
        )                   
      VALUES($1, $2, $3)
      returning *`;
    let insertvalue = [
      req.body.comment,
      req.body.gifid,
      moment(new Date())
    ];

    const findOneQ = 'SELECT * FROM gifcomments WHERE gifid=$1';
    const updateOneQ =`UPDATE gifcomments
                        SET comment = $1, createdOn=$2 
                        returning *`;
    const commentArticleQ = `SELECT title, gifcomments.createdOn, comment
                            FROM gifs
                              INNER JOIN gifcomments ON gifcomments.gifid = articles.articleid 
                            WHERE articles.gifid = $1`;
    let values = [
      req.body.comment,
      moment(new Date())
    ];

    try {
    const { rows } = await pool.query(insertCommentq, insertvalue);
    const find = await pool.query(findOneQ, [req.params.id])
      if(!find.rows[0]) {
        res.status(400).json({message: "Article not found"})
      }
        const response = await pool.query(updateOneQ, values);
        if(!response.rows[0]) {
          res.status(400).json({message: "Unable to comment on article"})
        }
        const message = await pool.query(commentArticleQ, [req.params.id]);
       return res.status(201).json(message.rows[0]);
    } catch(error) {
      return res.status(400).json(error);
    }
  }


module.exports = {createGif, getGif, listGifs, removeGif, commentGif }