const { Client } = require('pg')

//CONNECT TO DATABASE
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'adeyeye',
  port: 5432
})
client.connect()


module.exports = client