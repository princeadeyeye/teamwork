
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
	    userId 		uuid			NOT NULL,
	    first_name  VARCHAR(20)     NOT NULL,
	    last_name   VARCHAR(20)     NOT NULL,
	    email     	VARCHAR(250) 	NOT NULL,    
	    password 	VARCHAR(20)		NOT NULL,
	    jobRole 	VARCHAR(20) 	NOT NULL,
	    department	VARCHAR(20) 	NOT NULL,
	    address		VARCHAR(20) 	NOT NULL,
	    PRIMARY KEY (userId),
	    FOREIGN KEY (email) REFERENCES login (email)
); `

const commentTableQuery = ` CREATE TABLE IF NOT EXISTS comments (
	commentId 		uuid 			NOT NULL,
	comment 		VARCHAR(250)	NOT NULL,
	createdOn 		DATE			NOT	NULL,
	articleId 		uuid 			NOT NULL,
 	userId 			uuid			NOT NULL,
 	gifId 			uuid 			NOT NULL,
 	PRIMARY KEY (commentId),
 	FOREIGN KEY (userId) REFERENCES users (userId),
 	FOREIGN KEY	(gifId) REFERENCES gifs (gifId),
 	FOREIGN KEY (articleId) REFERENCES  articles (articleId)

)`

const gifTableQuery = ` CREATE TABLE IF NOT EXISTS gifs (
	gifId 			uuid 			NOT NULL,
	image 			BYTEA			NOT NULL,
	title 			VARCHAR(255) 	NOT NULL,
	createdOn 		DATE			NOT NULL,
	imageUrl		VARCHAR(255) 	NOT NULL,
	PRIMARY KEY 	(gifId)
)`

const articleTableQuery = ` CREATE TABLE IF NOT EXISTS articles (
	articleId 			uuid 			NOT NULL,
	article 			VARCHAR(255)  	NOT NULL,
	title 				VARCHAR(255)	NOT NULL,
	createdOn 			DATE			NOT NULL,
	PRIMARY KEY	(articleId)
); `

const loginTableQuery = ` CREATE TABLE IF NOT EXISTS login (
	email 				VARCHAR(255) 	NOT NULL,
	hashed_password 	VARCHAR(255) 	NOT NULL,
	loginOn				DATE			NOT NULL,
	PRIMARY KEY (email)
)`


	pool.query(articleTableQuery)
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
		
	pool.query(gifTableQuery)
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

	pool.query(loginTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
		});

module.exports = pool