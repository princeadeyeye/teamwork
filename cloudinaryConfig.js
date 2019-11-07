const cloudinary = require('cloudinary');


	cloudinary.config({
	cloud_name: 'princeadeyeye',
	api_key: '761121647641563',
	api_secret: `_TwNam7MDPTgD8BGlhzVpSXNRUs`
});


	exports.uploads = (file) =>{
		return new Promise(resolve => {
			cloudinary.uploader.upload(file, (result) =>{
			resolve({url: result.url, id: result.public_id})
		}, {resource_type: "auto"})
	})
}