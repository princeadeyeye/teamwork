const express = require('express');
const adminCtrl = require('../controllers/admin-controller');


const router = express.Router();

// create a user
router.post('/api/v1/auth/create-admin', adminCtrl.createAdmin)

// user signin
router.post('/api/v1/auth/admin-signin', adminCtrl.signin)


// router.delete('/v2/articles/:id/comment/commentid', adminCtrl.requireSignin, adminCtrl.removeComment)

// user sign out
// router.get('auth/signout', adminCtrl.signout)*/

module.exports = router;