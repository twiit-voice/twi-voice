var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/login/twitter', passport.authenticate('twitter'));

router.get('/login/twitter/return',
  passport.authenticate('twitter'),
  function(req, res) {
    console.log(req.user);
    res.send(req.user)
  });

module.exports = router;
