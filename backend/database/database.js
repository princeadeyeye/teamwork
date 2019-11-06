
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

 const employeeTableQuery = ` CREATE TABLE IF NOT EXISTS employee (
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


 const adminTableQuery = ` CREATE TABLE IF NOT EXISTS admin (
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

const articleTableQuery = ` CREATE TABLE IF NOT EXISTS articles (
	articleId 			SERIAL,
	article 			VARCHAR(255)  	NOT NULL,
	title 				VARCHAR(255)	NOT NULL,
	createdOn 			DATE			NOT NULL,
	userId 				SERIAL,
	FOREIGN KEY (userId) REFERENCES employeeTableQuery (userId),
	PRIMARY KEY	(article, title)
); `

const articleCommentTableQuery = ` CREATE TABLE IF NOT EXISTS a_comments (
	commentId 		SERIAL,
	comment 		VARCHAR(250)	NOT NULL,
	createdOn 		DATE			NOT	NULL,
	title			VARCHAR(255)  	NOT NULL,
	article 		VARCHAR(255)	NOT NULL,
 	PRIMARY KEY (commentId),
 	FOREIGN KEY (title) REFERENCES articles (title),
 	FOREIGN KEY	(article) REFERENCES articles (article)

);`

const gifTableQuery = ` CREATE TABLE IF NOT EXISTS gifs (
	gifId 			SERIAL,
	title 			VARCHAR(255) 	NOT NULL,
	createdOn 		DATE			NOT NULL,
	imageUrl		VARCHAR(255) 	NOT NULL,
	userId			SERIAL,
	FOREIGN KEY (userId) REFERENCES employeeTableQuery (userId),
	PRIMARY KEY 	(title)
)`


const gifCommentTableQuery = ` CREATE TABLE IF NOT EXISTS g_comments (
	commentId 		SERIAL,
	comment 		VARCHAR(250)	NOT NULL,
	createdOn 		DATE			NOT	NULL,
	title			VARCHAR(255)  	NOT NULL,
 	PRIMARY KEY (commentId),
 	FOREIGN KEY (title) REFERENCES gifs (title)

)`



	

	
	pool.query(employeeTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
		});

		pool.query(adminTableQuery)
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
		pool.query(articleCommentTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
			
		})
		pool.query(gifTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
			
		})
		pool.query(gifCommentTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
			
		})


module.exports = pool