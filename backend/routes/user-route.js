const express = require('express');
const userCtrl = require('../controllers/user-controller');

const router = express.Router();


//get documentation
router.get('/', userCtrl.getDocs)

//sample articles
router.get('/api/v1/sample/articles', userCtrl.getArticles)


//sample gifs
router.get('/api/v1/sample/gifs', userCtrl.getGifs)





module.exports = router;