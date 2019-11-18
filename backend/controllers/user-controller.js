const pool = require('../database/db')


async function getDocs(req, res) {
  res.status(200).send('<a href="https://documenter.getpostman.com/view/4934117/SW7T7X52">click here for api documentation</a> ')
  }


    async function getGifs(req, res) {
    const gifQ = 'SELECT * FROM gifs ORDER BY gifid ASC'; 
    try {
      const { rows } = await pool.query(gifQ);
      if (!rows) {
        return res.status(404)
                    .json({
                      "status": "error",
                      "data": {
                        "message": "Gifs not found"
                      }
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
                      "data": {
                      "message": error
                      }
                  });
    }
  }


    async function getArticles(req, res) {
    const ArtQ = 'SELECT * FROM articles ORDER BY articleid ASC'; 
    try {
      const { rows } = await pool.query(ArtQ);
      if (!rows) {
        return res.status(404)
                    .json({
                      "status": "error",
                      "data": {
                        "message": "Articles not found"
                      }
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
                      "data": {
                      "message": error
                      }
                  });
    }
  }

module.exports = { getDocs, getGifs, getArticles }