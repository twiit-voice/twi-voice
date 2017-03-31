const express = require('express');
const app = express()
const helper = require('../helpers/voice');
require('dotenv').config()

app.get('/', function(req, res, next) {
  helper.voiceRecognize(function(speech) {
    console.log(speech);
  })
  res.send('test')
})

app.get('/record', function(req, res, next) {
  helper.record()
  res.send('test')
})

app.get('/voicetweet', function(req, res, next) {

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
          process.env.TWITTER_ACCESS_TOKEN,
          process.env.TWITTER_ACCESS_TOKEN_SECRET,
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

})

app.listen(3000)