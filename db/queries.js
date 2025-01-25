const pool = require('./pool')
const queries = {}

// Messages
queries.addMessage = async (message, username, timestamp) => {
  await pool.query(
    `INSERT INTO "messages" (message, username, timestamp)
    VALUES ($1, $2, $3)`,
    [message, username, timestamp]
  )
}

queries.getMessages = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM "messages" ORDER BY timestamp DESC`
  )
  return rows
}

// Auth
queries.createUser = async (first_name, last_name, username, password) => {
  await pool.query(
    `INSERT INTO "users" (first_name, last_name, username, password) 
    VALUES ($1, $2, $3, $4)`,
    [first_name, last_name, username, password]
  )
}

queries.getUserByUsername = async (username) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])
  return rows[0]
}

queries.getUserById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return rows[0]
}

// Google
queries.createUserWithGoogle = async (profile) => {
  await pool.query(
    `INSERT INTO users (first_name, last_name, username, google_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [
      profile.name.givenName,
      profile.name.familyName,
      profile.emails[0].value,
      profile.id,
    ]
  )
}

queries.getUserByGoogleId = async (googleId) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE google_id = $1',
    [googleId]
  )
  return rows[0]
}

queries.updateUserWithGoogleId = async (id, googleId) => {
  return await pool.query(
    'UPDATE users SET google_id = $1 WHERE id = $2 RETURNING *',
    [googleId, id]
  )
}

// Facebook
queries.createUserWithFacebook = async (profile) => {
  await pool.query(
    `INSERT INTO users (first_name, last_name, username, facebook_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [
      profile.name.givenName,
      profile.name.familyName,
      profile.emails[0].value,
      profile.id,
    ]
  )
}

queries.getUserByFacebookId = async (facebookId) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE facebook_id = $1',
    [facebookId]
  )
  return rows[0]
}

queries.updateUserWithFacebookId = async (id, facebookId) => {
  return await pool.query(
    'UPDATE users SET facebook_id = $1 WHERE id = $2 RETURNING *',
    [facebookId, id]
  )
}

// Github
queries.createUserWithGitHub = async (profile) => {
  await pool.query(
    `INSERT INTO users (first_name, username, github_id) VALUES ($1, $2, $3) RETURNING *`,
    [profile.username, profile.emails[0].value, profile.id]
  )
}

queries.getUserByGitHubId = async (githubId) => {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE github_id = $1',
    [githubId]
  )
  return rows[0]
}

queries.updateUserWithGitHubId = async (id, githubId) => {
  return await pool.query(
    'UPDATE users SET github_id = $1 WHERE id = $2 RETURNING *',
    [githubId, id]
  )
}

module.exports = queries
