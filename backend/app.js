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

// express
const app = express();

// MIDDLEWARE

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// ROUTES
app.use('/', userRoute)
app.use('/', authRoute)
app.use('/', articleRoute)
app.use('/', gifRoute)







module.exports = app