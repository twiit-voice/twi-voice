const express = require('express');
var router = express.Router();
const helper = require('../config/voice');
let methods = {}
require('dotenv').config()

methods.tweets = function(req, res, next) {

  const OAuth = require('oauth');

  let oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  helper.recordNext(function() {
    helper.voiceRecognize(function(status) {

      if (status) {
        oauth.post(
          `https://api.twitter.com/1.1/statuses/update.json`,
          req.user_token,
          req.user_token_secret,
          // process.env.TWITTER_ACCESS_TOKEN,
          // process.env.TWITTER_ACCESS_TOKEN_SECRET,
          { "status": status },
          function(e, data) {
            if (e) console.error(e);
            res.send(JSON.parse(data)) // confirm successful posted status
          })
      } else {
        res.send('No words from you')
      }

    })
  })

}

module.exports = methods
