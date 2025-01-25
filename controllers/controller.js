const queries = require('../db/queries')
const controller = {}
const bcrypt = require('bcryptjs')
const passport = require('passport')

controller.getHome = async (req, res) => {
  const messages = await queries.getMessages()
  res.render('index', { user: req.user, messages })
}

// Messages
controller.postMessage = (req, res) => {
  const timestamp = Date.now()
  queries.addMessage(req.body.message, req.user.username, timestamp)
  res.redirect('/')
}

// Auth
controller.getSignUp = (req, res) => res.render('sign-up')
controller.postSignUp = async (req, res, next) => {
  try {
    const { first_name, last_name, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await queries.createUser(first_name, last_name, username, hashedPassword)
    res.redirect('/')
  } catch (err) {
    return next(err)
  }
}

controller.getSignOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect('/')
  })
}

controller.getSignIn = (req, res) => res.render('sign-in')

// Local Authentication
controller.postSignIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
})

// Universal Callback for all following Authentications
controller.getCallback = (req, res, next) => {
  const provider = req.params.provider
  passport.authenticate(provider, {
    successRedirect: '/',
    failureRedirect: '/sign-in',
  })(req, res, next)
}

// Google Authentication
controller.getGoogle = passport.authenticate('google', {
  scope: ['profile', 'email'],
})

// Facebook Authentication
controller.getFacebook = passport.authenticate('facebook', {
  scope: ['email'],
})

// GitHub Authentication
controller.getGitHub = passport.authenticate('github', {
  scope: ['user:email'],
})

module.exports = controller
