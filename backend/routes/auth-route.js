const express = require('express');
const authCtrl = require('../controllers/auth-controller');


const router = express.Router();

// create a user
router.post('/auth/create-user', authCtrl.createUser)

// user sign in
router.post('/auth/signin', authCtrl.signin)

// user sign out
// router.get('auth/signout', authCtrl.signout)*/

module.exports = router;