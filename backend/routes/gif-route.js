const express = require('express');
const gifCtrl = require('../controllers/gif-controller');
const authCtrl = require('../controllers/auth-controller')
const fileupload = require('express-fileupload')


const router = express.Router();


//write & share gif
router.post('/gifs', fileupload(({useTempFiles:true})), authCtrl.requireSignin, gifCtrl.createGif)

// delete gif 
router.delete('/v2/gifs/:id', authCtrl.requireSignin, gifCtrl.removeGif)

// get all gifs
router.get('/v2/gifs', authCtrl.requireSignin, gifCtrl.listGifs )

// view specific gif
router.get('/v2/gifs/:id', authCtrl.requireSignin, gifCtrl.getGif)

// comment on gif
router.put('/v2/gifs/:id/comment', authCtrl.requireSignin, gifCtrl.commentGif)

module.exports = router;
