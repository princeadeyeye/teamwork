const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const { Client } = require('pg')

// USER ROUTES
const userRoute = require('./routes/user-route')
const authRoute = require('./routes/auth-route')
const articleRoute = require('./routes/article-route')
const gifRoute = require('./routes/gif-route')



const app = express();

// MIDDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// ROUTES
app.use('/', userRoute)
app.use('/', authRoute)
app.use('/', articleRoute)
app.use('/', gifRoute)



module.exports = app