const express = require('express');
const adminCtrl = require('../controllers/admin-controller');


const router = express.Router();

// create a user
router.post('/v2/admin/create-admin', adminCtrl.createAdmin)

// user signin
router.post('/v2/admin/signin', adminCtrl.signin)


// router.delete('/v2/articles/:id/comment/commentid', adminCtrl.requireSignin, adminCtrl.removeComment)

// user sign out
// router.get('auth/signout', adminCtrl.signout)*/

module.exports = router;