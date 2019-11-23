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


    async function getArticles(req, res) {
    const ArtQ = 'SELECT * FROM articles ORDER BY articleid ASC'; 
    try {
      const { rows } = await pool.query(ArtQ);
      if (!rows) {
        return res.status(404)
                    .json({
                      "status": "error",
                        "error": "Articles not found"
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
                      "error": "Unable to get articles"
                  });
    }
  }

  async function getUsers(req, res) {
    const usersQ= 'SELECT * FROM users ORDER BY userid ASC'; 
    try {
      const { rows } = await pool.query(usersQ);
      if (!rows) {
        return res.status(404)
                        .json({
                      "status": "error",
                        "error": "Users not found"
                  });
      }
      rows.password = undefined
      return res.status(200)
                    .json({
                      "status": "success",
                      "data": rows
                    });
    } catch(error) {
      return res.status(400)
                    .json({ 
                      "status": "error",
                      "error": "Unable to get users"
                  });
    }
  }

  async function getUser(req, res) {
    const userQ = `SELECT * FROM users WHERE userid = $1`;
    try {
      const { rows } = await pool.query(userQ, [req.params.id]);
      if (!rows) {
        return res.status(404)
                        .json({
                      "status": "error",
                        "error": "User not found"
                  });
      }
      rows.password = undefined;
      return res.status(200)
                    .json({
                      "status": "success",
                      "data": {
                        "userId": rows[0].userid,
                        "firstName": rows[0].first_name,
                        "lastName": rows[0].last_name,
                        "email": rows[0].email,
                        "jobRole": rows[0].jobrole,
                        "department": rows[0].department,
                        "address": rows[0].address
                      }
                    });
    } catch(error) {
      return res.status(400)
                    .json({ 
                      "status": "error",
                      "error": "Unable to get User"
                  });
    }
  }



module.exports = { getDocs, getGifs, getArticles, getUser, getUsers }