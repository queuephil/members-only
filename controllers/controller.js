const db = require('../db/queries')
const controller = {}
const bcrypt = require('bcryptjs')
const passport = require('passport')

controller.getHome = (req, res) => res.render('index', { user: req.user })

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

controller.getSignIn = (req, res) => res.render('sign-in')
controller.postSignIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
})

controller.getSignOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
}

module.exports = controller
