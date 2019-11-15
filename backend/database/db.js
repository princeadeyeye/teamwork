const { Pool } = require ('pg');
// import dotenv from 'dotenv';

// dotenv.config();
 const connectionString = 'postgresql://postgres:adeyeye@localhost:5432/employee'

const pool = new Pool({
  connectionString:connectionString
});

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
