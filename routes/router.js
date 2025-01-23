// routes/router.js
const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/', controller.getHome)

router.get('/sign-up', controller.getSignUp)
router.post('/sign-up', controller.postSignUp)

router.get('/sign-in', controller.getSignIn)
router.post('/sign-in', controller.postSignIn)

router.get('/sign-out', controller.getSignOut)

module.exports = router
