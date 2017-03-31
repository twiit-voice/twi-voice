var express = require('express')
var jwt = require('jsonwebtoken')
require('dotenv').config()
let methods = {}

const OAuth = require('oauth')

let oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
)

methods.timeline = function(req, res, next) {

  oauth.get(
    `https://api.twitter.com/1.1/statuses/user_timeline.json`,
    process.env.TWITTER_ACCESS_TOKEN,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
    function (e, data){
      if (e) res.send(e);
      res.render('statuses', { statusdata: JSON.parse(data) })
    });

} // user_timeline

module.exports = methods
