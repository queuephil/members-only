const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const bcrypt = require('bcryptjs')
const queries = require('../db/queries')
require('dotenv').config()

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await queries.getUserById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await queries.getUserByUsername(username)
      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return done(null, false, { message: 'Incorrect password' })
      }
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

// Google Strategy https://www.passportjs.org/packages/passport-google-oauth20/
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await queries.getUserByGoogleId(profile.id)
        if (!user) {
          user = await queries.getUserByUsername(profile.emails[0].value)
          if (user) {
            user = await queries.updateUserWithGoogleId(user.id, profile.id)
            user = user.rows[0]
          } else {
            user = await queries.createUserWithGoogle(profile)
          }
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

// Facebook Strategy https://www.passportjs.org/packages/passport-facebook/
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await queries.getUserByFacebookId(profile.id)
        if (!user) {
          user = await queries.getUserByUsername(profile.emails[0].value)
          if (user) {
            user = await queries.updateUserWithFacebookId(user.id, profile.id)
            user = user.rows[0]
          } else {
            user = await queries.createUserWithFacebook(profile)
          }
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

// GitHub Strategy https://www.passportjs.org/packages/passport-github2/
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await queries.getUserByGitHubId(profile.id)
        if (!user) {
          user = await queries.getUserByUsername(profile.emails[0].value)
          if (user) {
            user = await queries.updateUserWithGitHubId(user.id, profile.id)
            user = user.rows[0]
          } else {
            user = await queries.createUserWithGitHub(profile)
          }
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

module.exports = passport
