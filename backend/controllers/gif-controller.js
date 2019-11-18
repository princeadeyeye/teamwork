const pool = require('../database/db')
//IMPORT CLOUDINARY CONFIG HERE
const cloudinary = require('../cloudinaryConfig.js');
const moment = require ('moment')



async function createGif (req, res)  {
const file = req.files.photo;
  const createQuery = `INSERT INTO
      gifs(title, imageUrl, userid, createdOn )
      VALUES($1, $2, $3, $4)
      returning *`;
   
const result = await cloudinary.uploader.upload(file.tempFilePath)
  const values = [
      file.name,
      result.url,
      req.body.userid,
      result.created_at
    ];
  try {
      const { rows } = await pool.query(createQuery, values);
        return res.status(201)
                  .json({
                    "status": "success",
                    "data": {
                      "message": "Gif successfully created",
                      "gifId": rows[0].gifid,
                      "createdOn": rows[0].createdon,
                      "title": rows[0].title,
                      "imageUrl" : rows[0].imageurl,
                      }
                    });
    } catch(error) {
      return res.status(400)
                  .json({ 
                      "status": "error",
                      "error": "Unable to create gifs"
                  });
    }

}



  // To be comment out
  async function listGifs(req, res) {
    const gifQ = 'SELECT * FROM gifs ORDER BY gifid ASC'; 
    try {
      const { rows } = await pool.query(gifQ);
      if (!rows) {
        return res.status(404)
                        .json({
                      "status": "error",
                        "error": "Gifs not found"
                  });
      }
      return res.status(200)
                    .json({
                      "status": "success",
                      "data": rows
                    });
    } catch(error) {
      return res.status(400)
                    .json({ 
                      "status": "error",
                      "error": "Unable to get gifs"
                  });
    }
  }
async function getGif(req, res) {
    const gifCommentQ = `SELECT gifs.gifid, title, imageUrl, gifs.createdOn, 
                              commentid, comment, gifcomments.userid
                            FROM gifs
                              INNER JOIN gifcomments ON gifcomments.gifid = gifs.gifid 
                            WHERE gifs.gifid = $1`;
          const gifQ = `SELECT * FROM gifs WHERE gifid = $1`;
    try {
      const { rows } = await pool.query(gifCommentQ, [req.params.id]);
      if (!rows[0]) {
          const response = await pool.query(gifQ, [req.params.id]);
          if(!response.rows[0]){
            return res.status(404)
                          .json({
                          "status": "error",
                            "error": "Gif not found"
                        });
          }
              return res.status(200)
                          .json({
                            "status": "success",
                            "data": {
                            "id": response.rows[0].gifid,
                            "createdOn": response.rows[0].createdOn,
                            "title": response.rows[0].title,
                            "url": response.rows[0].imageurl,
                            "comments": "Comment is not yet available",
                    }
                        })
      }
      return res.status(200)
                    .json({
                            "status": "success",
                            "data": {
                            "id": rows[0].gifid,
                            "createdOn": rows[0].createdon,
                            "title": rows[0].title,
                            "imageUrl": rows[0].imageurl,
                            "comments": [
                              {
                                "commentId":rows[0].commentid,
                                "authorId": rows[0].userid,
                                "comment":rows[0].comment,
                              },
                              {
                                "commentId": rows[1].commentid,
                                "authorId": rows[1].userid,
                                "comment": rows[1].comment,
                              },
                              {
                                "commentId": rows[2].commentid,
                                "authorId": rows[1].userid,
                                "comment": rows[2].comment,
                              }
                            ]
                    }
                  })
    } catch(error) {
      return res.status(400)
                 .json({ 
                      "status": "error",
                      "error": "unable to get the specific gif"
                  });
    }
  }


  async function removeGif(req, res, next) {
    const deleteQuery = `DELETE FROM gifs WHERE gifid=$1 RETURNING *`;
    try{
        const { rows } = await pool.query(deleteQuery, [req.params.id]);
          if(!rows[0]) {
            return res.status(400)
                         .json({
                          "status": "error",
                          "error": "Gif not found"
                  });
          }
            let profile = rows;
                const authorized = profile && req.auth && profile[0].userid == req.auth.userId
                  if (!(authorized)) {
                 return res.status(403)
                             .json({
                                "status": "error",
                                "error": "User is not authorized"
                        })                      }
                             return res.status(200)
                                .send({
                                 "status": "success",
                                  "data": {
                                  "message": "Gif Successfully deleted"
                            }
                    })
      } catch(error) {
      return res.status(404)
                   .json({ 
                      "status": "error",
                      "error": "Unable to delete gif"
                  });
    }
  }

async function commentGif (req, res) {
      const insertCommentq = `
    INSERT INTO
      gifcomments( comment, gifid, userid, createdOn )                   
      VALUES($1, $2, $3, $4) 
      returning *`;
    let insertvalue = [
      req.body.comment,
      req.body.gifid,
      req.body.userid,
      moment(new Date())
    ];

    const findOneQ = 'SELECT * FROM gifcomments WHERE gifid=$1';
    const updateOneQ =`UPDATE gifcomments
                        SET comment = $1, createdOn=$2 
                        returning *`;
    const commentgifQ = `SELECT title, gifcomments.createdOn, comment
                            FROM gifs
                              INNER JOIN gifcomments ON gifcomments.gifid = gifs.gifid 
                            WHERE gifs.gifid = $1`;
    let values = [
      req.body.comment,
      moment(new Date())
    ];

    try {
    const { rows } = await pool.query(insertCommentq, insertvalue);
    const find = await pool.query(findOneQ, [req.params.id])
      if(!find.rows[0]) {
        res.status(400)
               .json({
                  "status": "error",
                    "error": "Gif not found"
                  });
      }
        const response = await pool.query(updateOneQ, values);
        if(!response.rows[0]) {
          res.status(400)
                .json({
                    "status": "error",
                      "error": "Unable to comment on gif"
                  })

        }
        const message = await pool.query(commentgifQ, [req.params.id]);
       return res.status(201)
                  .json({
                    "status": "success",
                        "data": {
                            "message": "Comment successfully created",
                            "createdOn": message.rows[0].createdon,
                            "gifTitle": message.rows[0].title,
                            "comment": message.rows[0].comment,
                        }
                  });
    } catch(error) {
      return res.status(400)
                      .json({ 
                      "status": "error",
                      "error": "Comment failed"
                  });
    
              }
  }


module.exports = {createGif, getGif, listGifs, removeGif, commentGif }