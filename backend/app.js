const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
var request = require('request');


// USER ROUTES
const userRoute = require('./routes/user-route')
const authRoute = require('./routes/auth-route')
const articleRoute = require('./routes/article-route')
const gifRoute = require('./routes/gif-route')
const adminRoute = require('./routes/admin-route')


// express
const app = express();

// MIDDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use(cors({credentials: true, origin: 'http://localhost:5000'}));

// ROUTES
app.use('/', userRoute)
app.use('/', authRoute)
app.use('/', articleRoute)
app.use('/', gifRoute)
app.use('/', adminRoute)

// documentation
app.use('/', (req,res) => {
	const url = 'https://documenter.getpostman.com/view/4934117/SW7T7X52?version=latest'
		request(url, function (error, response, body) {
			if(response.statusCode == 200)
			res.send(body)
		});
	})


module.exports = app