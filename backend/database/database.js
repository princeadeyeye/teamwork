
const { Pool } = require('pg');
 require('dotenv').config();

// dotenv.config();
 const connectionString = 'postgresql://postgres:adeyeye@localhost:5432/postgres'



const pool = new Pool({
	connectionString:connectionString
});

pool.on('connect', () => {
  console.log('connected to the db');
});


//CREATING TABLES

const articleTableQuery = ` CREATE TABLE IF NOT EXISTS articles (
	articleId 			INT,
	article 			VARCHAR(16),
	title 				VARCHAR(16),
	createdOn 			DATE 		NOT NULL,
	comment				VARCHAR(16),
	PRIMARY KEY (articleId)
); `

 const userTableQuery = ` CREATE TABLE IF NOT EXISTS users (
	    userId 		INT,
	    first_name  VARCHAR(14)     NOT NULL,
	    last_name   VARCHAR(14)     NOT NULL,
	    email     	VARCHAR(14) 	NOT NULL,    
	    password 	VARCHAR(14)		NOT NULL,
	    jobRole 	VARCHAR(14) 	NOT NULL,
	    department	VARCHAR(14) 	NOT NULL,
	    address		VARCHAR(14) 	NOT NULL,
	    token 		VARCHAR(14)		NOT NULL,
	    PRIMARY KEY (userId) 
); `

const gifTableQuery = `
CREATE TABLE IF NOT EXISTS gifs (
	gifId 			INT,
	image 			BYTEA,
	title 			VARCHAR(16),
	createdOn 		DATE 			NOT NULL,
	imageUrl		VARCHAR(16) 	NOT NULL,
	PRIMARY KEY (gifId)
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

module.exports = pool