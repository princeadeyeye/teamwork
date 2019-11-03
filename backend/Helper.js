const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
			MY_SECRET_KEY, { expiresIn: '1d'}
		);
			return token;
	}
}

module.exports = Helper