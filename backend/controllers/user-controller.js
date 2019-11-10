const pool = require('../database/db')

const listUsers =  (req, res, next) => {
    pool.query('SELECT * FROM users ORDER BY userId ASC',  (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).json(result);
         
    });

}


const updateUser = (req, res, next) => {
	const user = [req.body.name, req.body.email, req.params.userId]
	pool.query('UPDATE users SET name = $1, email = $2 WHERE userId = $3', user, (err, result) => {
		if(err) {
			console.log(err);
			res.status(401).json(err);
		}
		res.status(200).json(`User modified with ID: ${req.params.userId}`);
	})
}
 async function removeUser(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE userId=$1 returning *';
    try {
      const { rows } = await pool.query(deleteQuery, [req.user.userId]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }

async function readUser(req, res, next) {
    const text = 'SELECT * FROM users WHERE userid = $1';
    try {
      const { rows } = await pool.query(text, [req.params.articleId]);
      if (!rows[0]) {
        return res.status(404).json({'message': 'article not found'});
      }
      return res.status(200).json(rows[0]);
 
    } catch(error) {
      return res.status(400).send(error)
    }
  }
async function feeds(req, res) {
      const feedQuery = `SELECT * FROM articles a, gifs g
                          ORDER BY a.articleid, g.gifid ASC
                          WHERE a.authorid = g.authorid`;
      try {
        const { rows } = await pool.query(feedQuery);
        if (!rows) {
          return res.status(404).json(error)
        }
        return res.status(200).send(rows);
    } catch(error) {
        return res.status(400).send(error)
    }
  }

module.exports = {listUsers, readUser, updateUser, removeUser, feeds}