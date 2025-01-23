const { Router } = require('express')
const router = Router()
const controller = require('../controllers/controller')

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

router.get('/', controller.getHome)

router.get('/sign-up', controller.getSignUp)
router.post('/sign-up', controller.postSignUp)

router.get('/sign-in', controller.getSignIn)
// router.post('/sign-in', controller.postSignIn)

module.exports = router
