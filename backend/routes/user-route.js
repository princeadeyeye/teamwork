const express = require('express');
const userCtrl = require('../controllers/user-controller');

const router = express.Router();


//get documentation
router.get('/', userCtrl.getDocs)

//sample articles
router.get('/api/v1/sample/articles', userCtrl.getArticles)


//sample gifs
router.get('/api/v1/sample/gifs', userCtrl.getGifs)

//get user

router.get('/api/v1/users/:id', userCtrl.getUser)


router.get('/api/v1/users/', userCtrl.getUsers)
module.exports = router;