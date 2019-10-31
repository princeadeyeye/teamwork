const express = require('express');
const gifCtrl = require('../controllers/gif-controller');

const router = express.Router();

//write & share article
// router.post('/api/articles/:articleId', authCtrl.requireSignin, gifCtrl.writeGif)

// edit articles
// router.put('api/articles/:articleId', authCtrl.requireSignin, gifCtrl.editGif)

// delete articles 
// router.delete('/api/articles/:artcleId', authCtrl.requireSignin, gifCtrl.deleteGif)

// view all articles
// router.get('/api/articles/query?ASC', authCtrl.requireSignin, gifCtrl.listGif)

// view specific article
// router.get('api/articles/:articleId', authCtrl.requireSignin, gifCtrl.getGif)

// comment on article
// router.put('api/articles/comment', authCtrl.requireSignin, gifCtrl.commentGif)

module.exports = router;