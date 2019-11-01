const express = require('express');
const articleCtrl = require('../controllers/article-controller');

const router = express.Router();


//write article
 router.post('/api/v1/articles/', articleCtrl.createArticle)

// edit article
// router.patch('api/v1/articles/:articleId', articleCtrl.updateArticle)

// delete article 
// router.delete('/api/v1/articles/:artcleId', articleCtrl.deleteArticle)

 // view specific article
// router.get('api/v1/articles/:articleId', articleCtrl.getArticle)

// comment on article
// router.put('api/v1/articles/:articleId/comment', articleCtrl.commentArticle)

module.exports = router;