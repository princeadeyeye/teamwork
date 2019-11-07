const pool = require('../database/database')

//IMPORT CLOUDINARY CONFIG HERE
const cloud = require('../../cloudinaryConfig.js');


const createGif = (req, res) => {
try{
   let imageDetails = {
    title: req.body.title,
    cloudImage: req.files[0].path,
    gifid: ''
  }
// IF ALL THING GO WELL, POST THE IMAGE TO CLOUDINARY
    cloud.uploads(imageDetails.cloudImage)
      .then((result) => {
      let imageDetails = {
        title: req.body.title,
        cloudImage: result.url,
        gifid: result.id
    }
//THEN CREATE THE FILE IN THE DATABASE
      imageModel.create(imageDetails, (err, created)=> {
        if(err){
          res.json({
            err: err,
            message: 'could not upload image, try again'
            })
      }else {
          res.json({
          created: created,
          message: "image uploaded successfully!!"
        })
      }
    })
})

} catch(execptions){
console.log(execptions)
  }
}

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
  }
//comments out after build
  async function listGifs(req, res) {
    const texts = 'SELECT * FROM gifs ORDER BY gifid ASC';
    try {
      const { rows } = await pool.query(texts);
      if (!rows) {
        return res.status(404).json({'message': 'Gifs not found'});
      }
      return res.status(200).json(rows);
    } catch(error) {
      return res.status(400).json(error)
    }
  }
async function getGif(req, res) {
  const text = `SELECT * FROM gifs a, g_comments b
                          WHERE a.title = b.title
                          AND gifid =$1`;
    try {
      const { rows } = await pool.query(text, [req.params.gifid]);
      if (!rows[0]) {
        return res.status(404).json({'message': 'Gif not found'});
      }
      return res.status(200).json(rows[0]);
    } catch(error) {
      return res.status(400).json(error)
    }
  }

 async function removeGif(req, res, next) {
    const deleteQuery = `DELETE FROM gifs WHERE gifId=$1 RETURNING *`;
    try{
        const { rows } = await pool.query(deleteQuery, [req.params.gifId]);
          if(!rows[0]) {
            return res.status(400).json({'message': 'Gif not found'})
          }
          return res.status(204).json({'message': 'Gif Successfully Deleted'})
      } catch(error) {
      return res.status(404).json(error)
    }
  }

async function commentGif (req, res) {
    const createCommentQuery = `
    INSERT INTO
      comments(
        comment,  
        userId, 
        createdOn,  
        gifId      
        )
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      req.body.comment,
      moment(new Date()),
      req.body.userId,
      req.body.gifId
    ];

    try {
      const { rows } = await pool.query(createCommentQuery, values);
        return res.status(201).json(rows[0]);
    } catch(error) {
      return res.status(400).json(error);
    }
  }


module.exports = {createGif, getGif, listGifs, removeGif, commentGif }