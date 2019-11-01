const express = require('express');
const authCtrl = require('../controllers/auth-controller');


const router = express.Router();

/*router.post('/auth/create-user', authCtrl.createUser)
router.post('/auth/signin', authCtrl.signin)
router.get('auth/signout', authCtrl.signout)*/

module.exports = router;