const moment = require ('moment');
const pool = require ('../database/db');
const Helper = require ('../Helper');
const expressJwt = require('express-jwt')



  async function createAdmin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      admin(
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
      const role = rows[0].jobRole
       if(!role === 'admin') {
        res.status(400).json({message: 'wrong credentials'})
       }
      const id = rows[0].userid
      const token = Helper.generateToken(id);
      return res.status(201)
                .json({ message: "Admin account successfully created",
                        token, id });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ 'message': 'Admin with that EMAIL already exist' })
      }
      return res.status(400).json(error);
    }
  }


  async function signin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM admin WHERE email = $1';
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
        return res.status(200).json({ id, token });
    } catch(error) {
      return res.status(400).json(error)
    }

  }



const requireSignin = expressJwt({
      secret: "MY_SECRET_KEY",
      userProperty: 'auth'
    })


module.exports = { createAdmin, signin, requireSignin }