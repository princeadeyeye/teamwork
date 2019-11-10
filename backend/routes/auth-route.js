const express = require('express');
const authCtrl = require('../controllers/auth-controller');
const adminCtrl = require('../controllers/admin-controller');


const router = express.Router();

// create a user
router.post('/auth/v2/create-user/', adminCtrl.requireSignin, authCtrl.createUser)

// user signin
router.post('/auth/v2/signin', authCtrl.signin)

// user sign out
// router.get('auth/signout', authCtrl.signout)*/



module.exports = router;