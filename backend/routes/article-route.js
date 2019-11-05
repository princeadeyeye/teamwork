const express = require('express');
const articleCtrl = require('../controllers/article-controller');
const authCtrl = require('../controllers/auth-controller')

const router = express.Router();

//write article
 router.post('/api/v2/articles/', authCtrl.requireSignin, articleCtrl.createArticle)

// update article
router.patch('/api/v2/articles/:articleId', authCtrl.requireSignin, articleCtrl.updateArticle)

// delete article 
router.delete('/api/v1/articles/:articleId', authCtrl.requireSignin, articleCtrl.removeArticle)

 // view specific article
 router.get('/api/v1/articles/:articleId', authCtrl.requireSignin, articleCtrl.getArticle)

// view all articles
 router.get('/api/v1/articles/', authCtrl.requireSignin, articleCtrl.listArticles)

// comment on article
 router.put('/api/v1/articles/:articleId/comment', authCtrl.requireSignin, articleCtrl.commentArticle)

module.exports = router;