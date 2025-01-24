require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.LOCAL_URL,
  // ssl: { rejectUnauthorized: false },
})

module.exports = pool
