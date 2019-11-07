const express = require('express');
const gifCtrl = require('../controllers/gif-controller');
const authCtrl = require('../controllers/auth-controller')
const upload = require('../../multerConfig.js');


const router = express.Router();

//write & share gif
router.post('/api/v2/gifs/create-gif', upload.any(), authCtrl.requireSignin, gifCtrl.createGif)

// delete gif 
router.delete('/api/v2/gifs/:gifId', authCtrl.requireSignin, gifCtrl.removeGif)

// get all gifs
router.get('/api/v2/gifs', authCtrl.requireSignin, gifCtrl.listGifs )

// view specific gif
router.get('api/v2/gifs/:gifId', authCtrl.requireSignin, gifCtrl.getGif)

// comment on gif
router.put('api/v2/gifs/:gifId/comment', authCtrl.requireSignin, gifCtrl.commentGif)

module.exports = router;