const express = require('express');
const gifCtrl = require('../controllers/gif-controller');

const router = express.Router();

//write & share gif
// router.post('/api/v1/gifs/', gifCtrl.writeGif)

// edit gif
// router.put('api/v1/gifs/:gifId', authCtrl.requireSignin, gifCtrl.editGif)

// delete gif 
// router.delete('/api/v1/gifs/:gifId', authCtrl.requireSignin, gifCtrl.deleteGif)

// view specific gif
// router.get('api/v1/gifs/:gifId', authCtrl.requireSignin, gifCtrl.getGif)

// comment on gif
// router.put('api/v1/gifs/:gifId/comment', authCtrl.requireSignin, gifCtrl.commentGif)

module.exports = router;