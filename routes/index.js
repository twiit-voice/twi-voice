var express = require('express');
var router = express.Router();
var passport = require('passport')
var authController = require('../controllers/auth')

router.get('/login/twitter', passport.authenticate('twitter'));

router.get('/login/twitter/return', passport.authenticate('twitter'), authController.loginTwitter);

module.exports = router;
