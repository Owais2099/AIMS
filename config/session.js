const expressSession = require('express-session')
const pgSession = require('connect-pg-simple')(expressSession)
const pool = require('../data/database')

const sessionConfig = {
  store: new pgSession({
    pool: pool,
    tableName: 'session',
  }),
  name: 'SID',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: true,
    secure: false,
  },
}

module.exports = sessionConfig
