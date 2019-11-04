const moment = require ('moment');
const uuid = require ('uuid');
const pool = require ('../database/database');
const Helper = require ('../Helper');


  async function createUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(
        userId , first_name, last_name , email, password, jobRole, department, address )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *`;
        const values = [
          default,
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
      const token = Helper.generateToken(rows[0].userId);
      return res.status(201).send({ token });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  }

  async function signin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    const insertQuery = `INSERT INTO 
      login(email, hashed_password) 
      values($1, $2)
      returning *`;
    try {
      const { rows } = await pool.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
        if(!Helper.comparePassword(rows[0].password, req.body.password)) {
          return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
        }
        const token = Helper.generateToken(rows[0].userId);
        const hashedPassword = Helper.hashPassword(req.body.password);
        const values = [
          req.body.email,
          hashedPassword
        ];
        //update login table
        const response = await pool.query(insertQuery, values);
        return res.status(200).send({ token });
    } catch(error) {
      return res.status(400).send(error)
    }

  }


module.exports = { createUser, signin }