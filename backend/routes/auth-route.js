const express = require('express');
const authCtrl = require('../controllers/auth-controller');
const adminCtrl = require('../controllers/admin-controller');


const router = express.Router();

// create a user
router.post('/api/v1/auth/create-user/', adminCtrl.requireSignin, authCtrl.createUser)

// user signin
router.post('/api/v1/auth/signin', authCtrl.signin)

// user sign out
// router.get('auth/signout', authCtrl.signout)*/



module.exports = router;