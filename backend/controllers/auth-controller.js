const moment = require ('moment');
const pool = require ('../database/db');
const Helper = require ('../Helper');
const expressJwt = require('express-jwt')




  async function createUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      employee(
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
                .json({  "status": "success", 
                                 "data": {
                                  "message" : "User account successfully created",
                                  token,
                                  "userid": id }
                                  });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  }

  async function signin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM employee WHERE email = $1';
    try {
      const { rows } = await pool.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({'message': 'The credentials you provided is incorrect'});
      }
        if(!Helper.comparePassword(rows[0].password, req.body.password)) {
          return res.status(400).json({ 'message': 'The credentials you provided is incorrect' });
        }
        const id = rows[0].userid
        const token = Helper.generateToken(id);
        return res.status(200).json({ 
                                "status": "success", 
                                 "data": {
                                  token,
                                  "userid": id } 
                                });
    } catch(error) {
      return res.status(400).json(error)
    }

  }




const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

     const requireSignin = expressJwt({
      secret: "MY_SECRET_KEY",
      userProperty: 'auth'
    })


module.exports = { createUser, signin, requireSignin }