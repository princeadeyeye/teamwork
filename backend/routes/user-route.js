const express = require('express');
const userCtrl = require('../controllers/user-controller');

const router = express.Router();


//list all users
router.get('/', (req, res, next) => {
	res.status(200).send('<a href="https://documenter.getpostman.com/view/4934117/SW7T7X52">click here for api documentation</a> ')
})


//Update a user
router.get('/api/v1/docs', userCtrl.getDocs)



module.exports = router;