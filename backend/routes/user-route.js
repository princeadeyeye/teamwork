const express = require('express');
const userCtrl = require('../controllers/user-controller');

const router = express.Router();

//create a user
 router.post('/api/v1/users/:userId', userCtrl.createUser)

//list all users
router.get('/api/v1/users/:userId', userCtrl.listUsers)

//get a user
router.get('/api/v1/users/:userId', userCtrl.readUser)

//Update a user
router.patch('/api/v1/users:userId', userCtrl.updateUser)

//delete a user
router.delete('api/v1/users/:userId', userCtrl.removeUser)

module.exports = router;