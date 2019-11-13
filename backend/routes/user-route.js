const express = require('express');
const userCtrl = require('../controllers/user-controller');

const router = express.Router();


//list all users
router.get('/', (req, res, next) => {
	res.status(200).send('<a href="https://documenter.getpostman.com/view/4934117/SW7T7X52?version=latest>">click here for api documentation</a> ')
})

// get all users
router.get('/api/v3/feeds', userCtrl.feeds)

//Update a user
router.get('/api/docs', userCtrl.getDocs)

/*
//delete a user
router.delete('api/v1/users/:userId', userCtrl.removeUser)

// view all gif and articles
router.get('/api/v1/feed/', userCtrl.feeds)

*/


module.exports = router;