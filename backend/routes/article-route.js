const express = require('express');
const articleCtrl = require('../controllers/article-controller');
const authCtrl = require('../controllers/auth-controller')

const router = express.Router();

//write article
 router.post('/v2/articles/', authCtrl.requireSignin, articleCtrl.createArticle)

// update article
router.patch('/v2/articles/:id', authCtrl.requireSignin, articleCtrl.updateArticle)

// delete article 
router.delete('/v2/articles/:id', authCtrl.requireSignin, articleCtrl.removeArticle)

 // view specific article
 router.get('/v2/articles/:id', authCtrl.requireSignin, articleCtrl.getArticle)


// view articles by category
 router.get('/v2/articles/search?query:id', authCtrl.requireSignin, articleCtrl.getArticle)

// comment on article
 router.put('/v2/articles/:id/comment', authCtrl.requireSignin, articleCtrl.commentArticle)


// view all gif and articles
router.get('/v2/feed/', authCtrl.requireSignin, articleCtrl.feeds)

module.exports = router;
