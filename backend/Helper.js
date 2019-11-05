const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


const Helper = {
	hashPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
	},

	comparePassword(hashPassword, password) {
		return bcrypt.compareSync(password, hashPassword)
	},

	isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	},

	generateToken(id) {
		const token = jwt.sign({
			userId: id
		},
			"MY_SECRET_KEY", { expiresIn: '1d'}
		);
			return token;
	},

	hasAuthorization (req, res, next) {
  		  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
 			 if (!(authorized)) {
   		 return res.status('403').json({
     		 error: "User is not authorized"
    		})
  		}
  		next()
	}
}


module.exports = Helper