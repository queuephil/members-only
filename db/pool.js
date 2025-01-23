const { Pool } = require('pg')
require('dotenv').config()

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.LOCAL_URL,
  // ssl: { rejectUnauthorized: false },
})
