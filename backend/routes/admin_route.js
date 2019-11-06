const express = require('express');
const adminCtrl = require('../controllers/admin-controller');


const router = express.Router();

// create a user
router.post('/admin/v1/create-admin', adminCtrl.createUser)

// user signin
router.post('/admin/v1/signin', adminCtrl.signin)

// user sign out
// router.get('auth/signout', adminCtrl.signout)*/

module.exports = router;