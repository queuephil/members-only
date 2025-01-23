// app.js
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const path = require('node:path')
const router = require('./routes/router')
require('dotenv').config()
require('./config/passport') // Passport configuration

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Routes
app.use('/', router)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
