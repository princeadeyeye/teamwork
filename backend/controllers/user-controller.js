const pool = require('../database/db')


async function getDocs(req, res) {
  res.status(200).send('<a href="https://documenter.getpostman.com/view/4934117/SW7T7X52">click here for api documentation</a> ')
  }

module.exports = { getDocs }