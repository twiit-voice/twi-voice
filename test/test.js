const express = require('express');
const app = express()
const helper = require('../helpers/voice');

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

app.listen(3000)