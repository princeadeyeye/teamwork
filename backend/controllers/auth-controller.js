const moment = require ('moment');
const pool = require ('../database/db');
const Helper = require ('../Helper');
const expressJwt = require('express-jwt')
require('dotenv').config()




  async function createUser(req, res) {
 // const bearerToken = process.env.ADMINTOKEN
    const bearerToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU3NDA5OTYwMiwiZXhwIjo4NjU1NzQwOTk2MDJ9.BMrtz_oWheGi7owGli-X3zfJ56F-2kI7uqLW_Ktt-nQ`
    
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader == 'undefined') {
      return res.status(403)
                  .json({ 
                    "status": "error",
                    "error": "Unauthorized "
                  });
    }
        var bearer = bearerHeader.split(" ");
        if (!(bearerToken === bearer[1])) {
             return res.status(403)
                  .json({ 
                    "status": "error",
                    "error": "Unauthorized"
                  });
       }
    if (!req.body.email || !req.body.password) {
      return res.status(400)
                  .json({
                    "status": "error",
                    "error": "Some values are missing"
                    
                  });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400)
                    .json({
                      "status": "error",
                        "error": "Please enter a valid email address"
                   });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(
       first_name, last_name , email, password, jobRole, department, address )
        VALUES($1, $2, $3, $4, $5, $6, $7)
        returning *`;
        const values = [
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          hashPassword,
          req.body.jobRole,
          req.body.department,
          req.body.address
    ];

    try {
      const { rows } = await pool.query(createQuery, values);
      const id = rows[0].userid
      const token = Helper.generateToken(id);
      return res.status(201)
                .json({  status: "success", 
                                 "data": {
                                  "message" : "User account successfully created",
                                  "token": token,
                                  "userid": id }
                                  });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400)
                  .json({ 
                    "status": "error",
                    "error": 'users with that EMAIL already exist' 
                  });
      }
      return res.status(400)
                  .json({ 
                    "status": "error",
                    "error": "Unable to create a user"
       
                  });
    }
  }

  async function signin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400)
                  .json({
                     "status": "error",
                      "error": "Some values are missing"
                    });
      }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400)
                    .json({
                     "status": "error",
                      "error": "Enter a valid email passwword"
                    });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await pool.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400)
                    .json({
                     "status": "error",
                    "error": "The credentials you provided is incorrect"
                    });
      }
        if(!Helper.comparePassword(rows[0].password, req.body.password)) {
          return res.status(400)
                        .json({
                          "status": "error",
                          "error": "The password you provided did not match"
                        });
        }
        const id = rows[0].userid
        const token = Helper.generateToken(id);
        return res.status(200)
                       .json({
                          "status": "success",
                          "data": {
                          "token": token,
                          "userId": id
                    }
                 });
    } catch(error) {
      return res.status(400)
                    .json({ 
                    "status": "error",
                    "error": "Unable to signin user"
                  });
    }

  }

     const requireSignin = expressJwt({
      secret: "MY_SECRET_KEY",
      userProperty: 'auth'
    })



module.exports = { createUser, signin, requireSignin }