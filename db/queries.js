const pool = require('./pool')

exports.createUser = async (first_name, last_name, username, password) => {
  await pool.query(
    `INSERT INTO "users" (first_name, last_name, username, password) 
    VALUES ($1, $2, $3, $4)`,
    [first_name, last_name, username, password]
  )
}

// exports.read = async (column = '*', condition = '') => {
//   const { rows } = await pool.query(
//     `SELECT ${column} FROM items ${condition} ORDER BY id DESC`
//   )
//   return rows
// }

// exports.update = async (title, author, genre, id) => {
//   await pool.query(
//     `UPDATE items SET title = $1, author = $2, genre = $3 WHERE id = $4`,
//     [title, author, genre, id]
//   )
// }

// exports.destroy = async (id) => {
//   await pool.query(`DELETE FROM items WHERE id = $1`, [id])
// }
