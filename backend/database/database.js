
const { Pool } = require('pg');
 require('dotenv').config();

// dotenv.config();
 const connectionString = 'postgresql://postgres:adeyeye@localhost:5432/employee?sslmode=disable.'



const pool = new Pool({
	connectionString:connectionString
});

pool.on('connect', () => {
  console.log('connected to the db');
});


//CREATING TABLES

 const adminTableQuery = ` CREATE TABLE IF NOT EXISTS admin (
	    userid 		SERIAL,
	    first_name  VARCHAR(250)     NOT NULL,
	    last_name   VARCHAR(250)     NOT NULL,
	    email     	VARCHAR(250) 	NOT NULL,
	    password    VARCHAR(250) 	NOT NULL,     
	    jobRole 	VARCHAR(250) 	NOT NULL,
	    department	VARCHAR(250) 	NOT NULL,
	    address		VARCHAR(250) 	NOT NULL,
	    PRIMARY KEY (userId)
); `

 const employeeTableQuery = ` CREATE TABLE IF NOT EXISTS employee (
	    userid 		SERIAL,
	    first_name  VARCHAR(250)     NOT NULL,
	    last_name   VARCHAR(250)     NOT NULL,
	    email     	VARCHAR(250) 	NOT NULL,
	    password    VARCHAR(250) 	NOT NULL,     
	    jobRole 	VARCHAR(250) 	NOT NULL,
	    department	VARCHAR(250) 	NOT NULL,
	    address		VARCHAR(250) 	NOT NULL,
	    PRIMARY KEY (userid)
); `


const articleTableQuery = ` CREATE TABLE IF NOT EXISTS articles (
	articleid 			SERIAL,
	article 			VARCHAR(255)  	NOT NULL,
	title 				VARCHAR(255)	NOT NULL,
	createdOn 			DATE			NOT NULL,
	userid 				SERIAL,
	FOREIGN KEY (userid) REFERENCES employee (userid),
	PRIMARY KEY	(articleid)
); `

const articleCommentTableQuery = ` CREATE TABLE IF NOT EXISTS articlecomments (
	commentid 		SERIAL,
	comment 		VARCHAR(250)	NOT NULL,
	createdOn 		DATE			NOT	NULL,
	articleid		SERIAL,
	userid 			SERIAL,
 	PRIMARY KEY (commentid),
 	FOREIGN KEY (articleid) REFERENCES articles (articleid),
 	FOREIGN KEY(userid) REFERENCES employee (userid)

);`

const gifTableQuery = ` CREATE TABLE IF NOT EXISTS gifs (
	gifid 			SERIAL,
	title 			VARCHAR(255) 	NOT NULL,
	createdOn 		DATE			NOT NULL,
	imageUrl		VARCHAR(255) 	NOT NULL,
	userid			SERIAL,
	FOREIGN KEY (userid) REFERENCES employee (userid),
	PRIMARY KEY 	(gifid)
)`


const gifCommentTableQuery = ` CREATE TABLE IF NOT EXISTS gifcomments (
	commentid 		SERIAL,
	comment 		VARCHAR(250)	NOT NULL,
	createdOn 		DATE			NOT	NULL,
	gifid			SERIAL,
	userid 			SERIAL,
 	PRIMARY KEY (commentid),
 	FOREIGN KEY (gifid) REFERENCES gifs (gifid),
 	FOREIGN KEY(userid) REFERENCES employee (userid)

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


		pool.query(articleTableQuery)
		.then((res) => {
			console.log(res);
			
			})
		.catch((err) => {
			console.log(err);
			
		})


module.exports = pool