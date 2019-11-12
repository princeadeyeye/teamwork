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

async function feeds(req, res, next) {
      const feedQuery =`   
       SELECT articleid, title, article, createdOn, userid
       FROM articles
       UNION 
       SELECT gifid, title, imageUrl, createdOn, userid
        FROM gifs
        ORDER BY articleid ASC
       `;
      try {
        const { rows } = await pool.query(feedQuery);
        if (!rows) {
          return res.status(404).json(error)
        }
        return res.status(200)
                    .json({
                        "status": "success",
                          "data": [
                            {
                            "id": rows[0].articleid,
                            "createdOn": rows[0].createdon,
                            "title": rows[0].title,
                            "article/url": rows[0].article,
                            "authorId": rows[0].userid,
                          },
                          {
                            "id": rows[1].articleid,
                            "createdOn": rows[1].createdon,
                            "title": rows[1].title,
                            "article/url": rows[1].article,
                            "authorId": rows[1].userid,
                          }, 
                          {
                            "id": rows[2].articleid,
                            "createdOn": rows[2].createdon,
                            "title": rows[2].title,
                            "article/url": rows[2].article,
                            "authorId": rows[2].userid,
                          },
                          {
                            "id": rows[3].articleid,
                            "createdOn": rows[3].createdon,
                            "title": rows[3].title,
                            "article/url": rows[3].article,
                            "authorId": rows[3].userid,
                          },
                          {
                            "id": rows[4].articleid,
                            "createdOn": rows[4].createdon,
                            "title": rows[4].title,
                            "article/url": rows[4].article,
                            "authorId": rows[4].userid,
                          },
                          {
                            "id": rows[5].articleid,
                            "createdOn": rows[5].createdon,
                            "title": rows[5].title,
                            "article/url": rows[5].article,
                            "authorId": rows[5].userid,
                          }
                        ]
                          
                    });
    } catch(error) {
        return res.status(400).send(error)
    }
  }
async function getDocs(req, res) {
  res.status(200).send('<a href="https://documenter.getpostman.com/view/4934117/SW7T7X52?version=latest>">click here for api documentation</a> ')
  }

module.exports = {listUsers, updateUser, removeUser, feeds, getDocs}