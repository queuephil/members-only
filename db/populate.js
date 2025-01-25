#! /usr/bin/env node

require('dotenv').config({ path: '../.env' })
const { Client } = require('pg')

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ),
  last_name VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  google_id VARCHAR ( 255 ),
  facebook_id VARCHAR ( 255 ),
  github_id VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  timestamp VARCHAR ( 255 )
);
`
async function main() {
  console.log('seeding...')

  const client = new Client({
    connectionString: process.env.DATABASE_URL || process.env.LOCAL_URL,
    // ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log('done')
}

main()
