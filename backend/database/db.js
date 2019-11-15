const { Pool } = require('pg');
 require('dotenv').config();

// dotenv.config();
 const connectionString = `postgres://gwxuubudyzdjyh:bbd844eec46d532d49f8367230f4a51bae291d529ea0647bb37d7d0d181f4a2d@ec2-107-21-110-75.compute-1.amazonaws.com:5432/d9m7q5vuipjifc?ssl=true`



const pool = new Pool({
  connectionString:connectionString
});

/*const pool = new Pool({
  user: 'postgres',
  host: 'ec2-107-21-110-75.compute-1.amazonaws.com',
  database: 'd9m7q5vuipjifc',
  password: 'gwxuubudyzdjyh:bbd844eec46d532d49f8367230f4a51bae291d529ea0647bb37d7d0d181f4a2d',
  port: 5432,
})
*/

pool.on('connect', () => {
  console.log('connected to the db');
});


//CREATING TABLES
 const adminTableQuery = ` 
  CREATE TABLE IF NOT EXISTS admin (
      userid    SERIAL,
      first_name  VARCHAR(250)     NOT NULL,
      last_name   VARCHAR(250)     NOT NULL,
      email       VARCHAR(250)  NOT NULL,
      password    VARCHAR(250)  NOT NULL,     
      jobRole   VARCHAR(250)  NOT NULL,
      department  VARCHAR(250)  NOT NULL,
      address   VARCHAR(250)  NOT NULL,
      PRIMARY KEY (userId)

  ); `


  
    pool.query(adminTableQuery)
    .then((res) => {
      console.log(res);
      })
    .catch((err) => {
      console.log(err);
      pool.end();
    });



  const employeeTableQuery = ` 
  CREATE TABLE IF NOT EXISTS employee (
      userid    SERIAL,
      first_name  VARCHAR(250)     NOT NULL,
      last_name   VARCHAR(250)     NOT NULL,
      email       VARCHAR(250)  NOT NULL,
      password    VARCHAR(250)  NOT NULL,     
      jobRole   VARCHAR(250)  NOT NULL,
      department  VARCHAR(250)  NOT NULL,
      address   VARCHAR(250)  NOT NULL,
      PRIMARY KEY (userid)
  ); `

  pool.query(employeeTableQuery)
    .then((res) => {
      console.log(res);
      })
    .catch((err) => {
      console.log(err);
      pool.end();
    });



 

  const articleTableQuery = ` 
  CREATE TABLE IF NOT EXISTS articles (
    articleid       SERIAL,
    article       VARCHAR(255)    NOT NULL,
    title         VARCHAR(255)  NOT NULL,
    createdOn       DATE      NOT NULL,
    userid        SERIAL,
    FOREIGN KEY (userid) REFERENCES employee (userid),
    PRIMARY KEY (articleid)
  ); `

  pool.query(articleTableQuery)
    .then((res) => {
      console.log(res);
      
      })
    .catch((err) => {
      console.log(err);
      
    })



  const articleCommentTableQuery = ` 
  CREATE TABLE IF NOT EXISTS articlecomments (
  commentid     SERIAL,
  comment     VARCHAR(250)  NOT NULL,
  createdOn     DATE      NOT NULL,
  articleid   SERIAL,
  userid      SERIAL,
  PRIMARY KEY (commentid),
  FOREIGN KEY (articleid) REFERENCES articles (articleid),
  FOREIGN KEY(userid) REFERENCES employee (userid)

);`

pool.query(articleCommentTableQuery)
    .then((res) => {
      console.log(res);
      })
    .catch((err) => {
      console.log(err);
    })


  const gifTableQuery = ` 
  CREATE TABLE IF NOT EXISTS gifs (
  gifid       SERIAL,
  title       VARCHAR(255)  NOT NULL,
  createdOn     DATE      NOT NULL,
  imageUrl    VARCHAR(255)  NOT NULL,
  userid      SERIAL,
  FOREIGN KEY (userid) REFERENCES employee (userid),
  PRIMARY KEY   (gifid)
)`;

    pool.query(gifTableQuery)
    .then((res) => {
      console.log(res);
      })
    .catch((err) => {
      console.log(err);
    });


  const gifCommentTableQuery = ` 
  CREATE TABLE IF NOT EXISTS gifcomments (
  commentid     SERIAL,
  comment     VARCHAR(250)  NOT NULL,
  createdOn     DATE      NOT NULL,
  gifid     SERIAL,
  userid      SERIAL,
  PRIMARY KEY (commentid),
  FOREIGN KEY (gifid) REFERENCES gifs (gifid),
  FOREIGN KEY(userid) REFERENCES employee (userid)

)`;

pool.query(gifCommentTableQuery)
    .then((res) => {
      console.log(res);
      })
    .catch((err) => {
      console.log(err);
    })


module.exports = {
 
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}


require('make-runnable');