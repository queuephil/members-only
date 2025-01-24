const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/', controller.getHome)

router.get('/sign-up', controller.getSignUp)
router.post('/sign-up', controller.postSignUp)

router.get('/sign-out', controller.getSignOut)

router.get('/sign-in', controller.getSignIn)

// Local Authentication
router.post('/sign-in', controller.postSignIn)

// Universal Callback for all following Authentications
router.get('/auth/:provider/callback', controller.getCallback)

// Google Authentication
router.get('/auth/google', controller.getGoogle)

// Facebook Authentication
router.get('/auth/facebook', controller.getFacebook)

// GitHub Authentication
router.get('/auth/github', controller.getGitHub)

module.exports = router
