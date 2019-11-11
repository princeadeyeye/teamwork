const express = require('express');
const adminCtrl = require('../controllers/admin-controller');


const router = express.Router();

// create a user
router.post('/admin/v2/create-admin', adminCtrl.createAdmin)

// user signin
router.post('/admin/v2/signin', adminCtrl.signin)


router.delete('/v2/articles/:id/comment/commentid', adminCtrl.requireSignin, adminCtrl.removeComment)

// user sign out
// router.get('auth/signout', adminCtrl.signout)*/

module.exports = router;