const express = require('express');
const articleCtrl = require('../controllers/article-controller');

const router = express.Router();

//write & share article
// router.post('/api/articles/:articleId', authCtrl.requireSignin, articleCtrl.writeArticle)

// edit article
// router.put('api/articles/:articleId', authCtrl.requireSignin, articleCtrl.editArticle)

// delete article 
// router.delete('/api/articles/:artcleId', authCtrl.requireSignin, articleCtrl.deleteArticle)

// view all articles
// router.get('/api/articles/query?ASC', authCtrl.requireSignin, articleCtrl.listArticles)

// view specific article
// router.get('api/articles/:articleId', authCtrl.requireSignin, articleCtrl.getArticle)

// comment on article
// router.put('api/articles/:articleId/comment', authCtrl.requireSignin, articleCtrl.commentArticle)

module.exports = router;