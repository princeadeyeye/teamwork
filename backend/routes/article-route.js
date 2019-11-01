const express = require('express');
//const articleCtrl = require('../controllers/article-controller');

const router = express.Router();


//write article
// router.post('/api/v1/articles/', articleCtrl.writeArticle)

// edit article
// router.patch('api/v1/articles/:articleId', articleCtrl.editArticle)

// delete article 
// router.delete('/api/v1/articles/:artcleId', authCtrl.requireSignin, articleCtrl.deleteArticle)

// view specific article
// router.get('api/v1/articles/:articleId', articleCtrl.getArticle)

// comment on article
// router.put('api/v1/articles/:articleId/comment', authCtrl.requireSignin, articleCtrl.commentArticle)

module.exports = router;