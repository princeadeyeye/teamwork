const multer = require('multer');

//multer.diskStorage() creates a storage space for storing files. 
const storage = multer.diskStorage({
	destination:function(req, file,cb){
		if(file.mimetype === 'image/gif'){
			cb(null, './backend/files/images/');
		}else{
			cb({message: 'this file is not a gif file'}, false)
		}
	},
		filename: function(req, file, cb){
			cb(null, file.originalname);
		}
	})
	const upload = multer({storage:storage});


	module.exports = upload;