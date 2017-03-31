var Strategy = require('passport-twitter').Strategy;
var User = require('../models/user')
require('dotenv').config()

module.exports = function (passport) {

  passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/api/login/twitter/return'
    },
    function(token, tokenSecret, profile, cb) {
      process.nextTick(function () {
        User.findOne({username : profile.username}, function (err, user) {
          if(err) return cb(err)
          if(user){
            return cb(null,user)
          }else{
            User.create({
              'id_twitter' : profile.id,
              'username' : profile.username,
              'name' : profile.displayName
            }, function (err, data) {
              if(err) cb(err)
              return cb(null, data)
            })
          }
        })
      })
    }));
}
