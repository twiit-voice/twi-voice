'use strict'

const fs = require('fs')
const record = require('node-record-lpcm16')
const Speech = require('@google-cloud/speech')
const speech = Speech()
// setting
const audiofile = './resources/rec.wav'
const encoding = 'LINEAR16'
const sampleRate = 44100
const long = 10000

module.exports = {
  record: function() {

    let file = fs.createWriteStream(audiofile, { encoding: 'binary' })
    record.start({
      sampleRate : sampleRate,
      verbose : false // true -- for log info to the console
    })
    .pipe(file)

    setTimeout(function () {
      record.stop()
    }, long)

  }, // record

  recordNext: function(next) {

    let file = fs.createWriteStream(audiofile, { encoding: 'binary' })
    record.start({
      sampleRate : sampleRate,
      verbose : false
    })
    .pipe(file)

    setTimeout(function () {
      record.stop()
      next()
    }, long)

  }, // recordNext

  voiceRecognize: function(next) {

    let request = {
      encoding: 'LINEAR16',
      sampleRate: sampleRate
    };
    speech.recognize(audiofile, request)
      .then((results) => {
        const transcription = results[0]
        next(transcription) // callback
      });

  } // voiceRecognize

}