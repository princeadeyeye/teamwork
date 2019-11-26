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
      rows[0].password = undefined;
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


  async function updateUser(req, res) {
    const findOneQuery = 'SELECT * FROM users WHERE userid=$1';
    const updateOneQuery =`UPDATE users
      SET first_name=$1, last_name=$2, email=$3, password=$4,
      jobRole=$5, department=$6, address= $7
      WHERE userid=$8 returning *`;
    try {
      const { rows } = await pool.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404)
                      .json({
                      "status": "error",
                        "error": "User not found"
                    });
      }
        let profile = rows;
          const authorized = profile && req.auth && profile[0].userid == req.auth.userId
            if (!(authorized)) {
           return res.status(403)
                        .json({
                            "status": "error",
                              "error": "User is not authorized"
                        })
      }
       const values = [
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.password,
          req.body.jobRole,
          req.body.department,
          req.body.address,
          req.params.id
    ];
      const response = await pool.query(updateOneQuery, values);
      return res.status(200)
                .json({
                  "status": "success",
                  "data": {
                      "message": "User successfully updated",
                  }
                });
    } catch(err) {
      return res.status(400)
                    .json({ 
                      "status": "error",
                      "error": "Unable to query database"
                  });
    }
  }


module.exports = { getDocs, getGifs, getArticles, getUser, getUsers, updateUser }