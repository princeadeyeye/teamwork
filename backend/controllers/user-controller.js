const pool = require('../database/database')

const listUsers =  (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY userId ASC',  (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).json(result);
         
    });

}

const readUser = (req, res, next) => {
	const id = req.params.userId;
	pool.query('SELECT * FROM users WHERE id = $1', [id],   (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).json(result);
         
    });
}

const updateUser = (req, res, next) => {
	const user = [req.body.name, req.body.email, req.params.userId]
	pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', user, (err, result) => {
		if(err) {
			console.log(err);
			res.status(401).json(err);
		}
		res.status(200).json(`User modified with ID: ${req.params.userId}`);
	})
}

module.exports = {listUsers, readUser, updateUser}