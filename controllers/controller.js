const db = require('../db/queries')
const controller = {}
const bcrypt = require('bcryptjs')

controller.getHome = (req, res) => res.render('index', { user: req.user })

// sign up user
controller.getSignUp = (req, res) => res.render('sign-up')
controller.postSignUp = async (req, res, next) => {
  try {
    const { first_name, last_name, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.createUser(first_name, last_name, username, hashedPassword)

    res.redirect('/')
  } catch (err) {
    return next(err)
  }
}

// sign in user
controller.getSignIn = (req, res) => res.render('sign-in')

module.exports = controller
