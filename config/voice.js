'use strict'

const fs = require('fs')
const record = require('node-record-lpcm16')
const Speech = require('@google-cloud/speech')
const speech = Speech()

// setting
const audiofile = './resources/rec.wav'
const encoding = 'LINEAR16'
const sampleRate = 44100
const verbose = true // true -- for log info to the console
const long = 10000
const languageCode = 'id-ID' // defaults en-US

module.exports = {

  // record with no callback
  record: function() {

    let file = fs.createWriteStream(audiofile, { encoding: 'binary' })
    record.start({
      sampleRate : sampleRate,
      verbose : verbose
    })
    .pipe(file)

    setTimeout(function () {
      record.stop()
    }, long)

  }, // record

  // record with callback
  recordNext: function(next) {

    let file = fs.createWriteStream(audiofile, { encoding: 'binary' })
    record.start({
      sampleRate : sampleRate,
      verbose : verbose
    })
    .pipe(file)
    .on('close', function() {
      record.stop()
      next()
    })

    setTimeout(function () {
      record.stop()
    }, long)

  }, // recordNext

  // return string what user speech
  voiceRecognize: function(next) {
    let request = {
      encoding: encoding,
      languageCode: languageCode,
      sampleRate: sampleRate
    };
    speech.recognize(audiofile, request)
      .then((results) => {
        const transcription = results[0] // string type
        next(transcription) // callback
      });

  } // voiceRecognize

}
