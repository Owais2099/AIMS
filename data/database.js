const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: { //comment this out for local development
    rejectUnauthorized: process.env.rejectUnauthorized
  }
})

module.exports = pool
