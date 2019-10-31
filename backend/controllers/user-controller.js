const client = require('../models/database')

const listUsers =  (req, res, next) => {
    client.query('SELECT * FROM users ORDER BY id ASC',  (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).json(result.rows);
         
    });

}

const createUser = (req, res, next) => {
	const user = [req.body.name, req.body.email]
	 client.query ('INSERT INTO users(name, email) values($1, $2) RETURNING *', user, 
	 			(err, result) => {
	 				if(err) {
	 					res.status(400).json(err)
	 			} 
	 			res.status(201).json('Successfully Reagistered')
	 		});

}

const readUser = (req, res, next) => {
	const id = req.params.userId;
	client.query('SELECT * FROM users WHERE id = $1', [id],   (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).json(result.rows);
         
    });
}

const updateUser = (req, res, next) => {
	const user = [req.body.name, req.body.email, req.params.userId]
	client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', user, (err, result) => {
		if(err) {
			console.log(err);
			res.status(401).json(err);
		}
		res.status(200).json(`User modified with ID: ${req.params.userId}`);
	})
}
const removeUser = (req, res, next) => {
	const id = req.params.userId;
	client.query('DELETE FROM users WHERE id=$1', [id] , (err, result) => {
		if(err) {
			coonsole.log(err)
			res.status(401).json(err);
		}
		res.status(200).json('Delete successfully')
	})
}
module.exports = {listUsers, createUser, readUser, updateUser, removeUser}