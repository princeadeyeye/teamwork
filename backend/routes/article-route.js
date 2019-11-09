const express = require('express');
const articleCtrl = require('../controllers/article-controller');
const authCtrl = require('../controllers/auth-controller')

const router = express.Router();

//write article
 router.post('/api/v1/articles/', authCtrl.requireSignin, articleCtrl.createArticle)

// update article
router.patch('/api/v1/articles/:id', authCtrl.requireSignin, articleCtrl.updateArticle)

// delete article 
router.delete('/api/v1/articles/:id', authCtrl.requireSignin, articleCtrl.removeArticle)

 // view specific article
 router.get('/api/v1/articles/:id', authCtrl.requireSignin, articleCtrl.getArticle)

// view all articles
 router.get('/api/v1/articles/', authCtrl.requireSignin, articleCtrl.listArticles)

// comment on article
 router.put('/api/v1/articles/:id/comment', authCtrl.requireSignin, articleCtrl.commentArticle)


// view all gif and articles
router.get('/api/v1/feed/', authCtrl.requireSignin, articleCtrl.feeds)

module.exports = router;
