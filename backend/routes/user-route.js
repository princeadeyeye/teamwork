const express = require('express');
const userCtrl = require('../controllers/user-controller');

const router = express.Router();


//list all users
router.get('/api/v1/users', userCtrl.listUsers)

//get a user
router.get('/api/v1/users/:userId', userCtrl.readUser)

//Update a user
router.patch('/api/v1/users:userId', userCtrl.updateUser)

//delete a user
// router.delete('api/v1/users/:userId', userCtrl.removeUser)

// view all gif and articles
// router.get('/api/v1/feed/', authCtrl.requireSignin, gifCtrl.listGif)

module.exports = router;