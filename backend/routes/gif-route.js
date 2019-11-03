const express = require('express');
const gifCtrl = require('../controllers/gif-controller');

const router = express.Router();

//write & share gif
router.post('/api/v1/gifs/', gifCtrl.createGif)

// edit gif
router.put('api/v1/gifs/:gifId', gifCtrl.updateGif)

// delete gif 
router.delete('/api/v1/gifs/:gifId', gifCtrl.removeGif)

// get all gifs
router.get('/api/v1/gifs', gifCtrl.listGifs )

// view specific gif
router.get('api/v1/gifs/:gifId', gifCtrl.getGif)

// comment on gif
// router.put('api/v1/gifs/:gifId/comment', gifCtrl.commentGif)

module.exports = router;