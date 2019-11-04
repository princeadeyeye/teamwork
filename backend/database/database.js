
const { Pool } = require('pg');
 require('dotenv').config();

// dotenv.config();
 const connectionString = 'postgresql://postgres:adeyeye@localhost:5432/employee'



const pool = new Pool({
	connectionString:connectionString
});

pool.on('connect', () => {
  console.log('connected to the db');
});


//CREATING TABLES

 const userTableQuery = ` CREATE TABLE IF NOT EXISTS users (
	    userId 		SERIAL,
	    first_name  VARCHAR(250)     NOT NULL,
	    last_name   VARCHAR(250)     NOT NULL,
	    email     	VARCHAR(250) 	NOT NULL,
	    password    VARCHAR(250) 	NOT NULL,     
	    jobRole 	VARCHAR(250) 	NOT NULL,
	    department	VARCHAR(250) 	NOT NULL,
	    address		VARCHAR(250) 	NOT NULL,
	    PRIMARY KEY (userId)
); `

const commentTableQuery = ` CREATE TABLE IF NOT EXISTS comments (
	commentId 		SERIAL,
	comment 		VARCHAR(250)	NOT NULL,
	createdOn 		DATE			NOT	NULL,
	articleId 		SERIAL,
 	userId 			SERIAL,
 	gifId 			SERIAL,
 	PRIMARY KEY (commentId),
 	FOREIGN KEY (userId) REFERENCES users (userId),
 	FOREIGN KEY	(gifId) REFERENCES gifs (gifId),
 	FOREIGN KEY (articleId) REFERENCES  articles (articleId)

)`

const gifTableQuery = ` CREATE TABLE IF NOT EXISTS gifs (
	gifId 			SERIAL,
	title 			VARCHAR(255) 	NOT NULL,
	createdOn 		DATE			NOT NULL,
	imageUrl		VARCHAR(255) 	NOT NULL,
	userId			SERIAL,
	FOREIGN KEY (userId) REFERENCES users (userId),
	PRIMARY KEY 	(gifId)
)`

const articleTableQuery = ` CREATE TABLE IF NOT EXISTS articles (
	articleId 			SERIAL,
	article 			VARCHAR(255)  	NOT NULL,
	title 				VARCHAR(255)	NOT NULL,
	createdOn 			DATE			NOT NULL,
	userId 				SERIAL,
	FOREIGN KEY (userId) REFERENCES users (userId),
	PRIMARY KEY	(articleId)
); `


		
	pool.query(gifTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
			
		})

	
	pool.query(userTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
		});

	pool.query(articleTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
			
		})
		pool.query(commentTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
			
		})

module.exports = pool