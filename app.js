const express = require('express')
const app = express()
const path = require('node:path') // for Views
const router = require('./routes/router') // for Routes
const assetsPath = path.join(__dirname, 'public') // for CSS
require('dotenv').config()

const session = require('express-session') // for Auth
const passport = require('passport') // for Auth
require('./config/passport') // for Auth

// Middleware
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.protocol === 'http') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`)
    }
    next()
  })
}

app.use(express.static(assetsPath)) // for CSS
app.use(express.urlencoded({ extended: true })) // for req.body

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false })) // for Auth
app.use(passport.initialize()) // for Auth
app.use(passport.session()) // for Auth

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Routes
app.use('/', router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
