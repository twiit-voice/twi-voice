'use strict';

function syncRecognize (filename, encoding, sampleRate) {
  // [START speech_sync_recognize]
  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');

  // Instantiates a client
  const speech = Speech();

  // The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
  // const filename = '/path/to/audio.raw';

  // The encoding of the audio file, e.g. 'LINEAR16'
  // const encoding = 'LINEAR16';

  // The sample rate of the audio file, e.g. 16000
  // const sampleRate = 16000;

  const request = {
    encoding: encoding,
    sampleRate: sampleRate
  };

  // Detects speech in the audio file
  speech.recognize(filename, request)
    .then((results) => {
      const transcription = results[0];

      console.log(`Transcription: ${transcription}`);
    });
  // [END speech_sync_recognize]
}

function syncRecognizeGCS (gcsUri, encoding, sampleRate) {
  // [START speech_sync_recognize_gcs]
  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');

  // Instantiates a client
  const speech = Speech();

  // The Google Cloud Storage URI of the file on which to perform speech recognition, e.g. gs://my-bucket/audio.raw
  // const gcsUri = 'gs://my-bucket/audio.raw';

  // The encoding of the audio file, e.g. 'LINEAR16'
  // const encoding = 'LINEAR16';

  // The sample rate of the audio file, e.g. 16000
  // const sampleRate = 16000;

  const request = {
    encoding: encoding,
    sampleRate: sampleRate
  };

  // Detects speech in the audio file
  speech.recognize(gcsUri, request)
    .then((results) => {
      const transcription = results[0];

      console.log(`Transcription: ${transcription}`);
    });
  // [END speech_sync_recognize_gcs]
}

function asyncRecognize (filename, encoding, sampleRate) {
  // [START speech_async_recognize]
  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');

  // Instantiates a client
  const speech = Speech();

  // The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
  // const filename = '/path/to/audio.raw';

  // The encoding of the audio file, e.g. 'LINEAR16'
  // const encoding = 'LINEAR16';

  // The sample rate of the audio file, e.g. 16000
  // const sampleRate = 16000;

  const request = {
    encoding: encoding,
    sampleRate: sampleRate
  };

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.
  speech.startRecognition(filename, request)
    .then((results) => {
      const operation = results[0];
      // Get a Promise represention of the final result of the job
      return operation.promise();
    })
    .then((transcription) => {
      console.log(`Transcription: ${transcription}`);
    });
  // [END speech_async_recognize]
}

function asyncRecognizeGCS (gcsUri, encoding, sampleRate) {
  // [START speech_async_recognize_gcs]
  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');

  // Instantiates a client
  const speech = Speech();

  // The Google Cloud Storage URI of the file on which to perform speech recognition, e.g. gs://my-bucket/audio.raw
  // const gcsUri = 'gs://my-bucket/audio.raw';

  // The encoding of the audio file, e.g. 'LINEAR16'
  // const encoding = 'LINEAR16';

  // The sample rate of the audio file, e.g. 16000
  // const sampleRate = 16000;

  const request = {
    encoding: encoding,
    sampleRate: sampleRate
  };

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.
  speech.startRecognition(gcsUri, request)
    .then((results) => {
      const operation = results[0];
      // Get a Promise represention of the final result of the job
      return operation.promise();
    })
    .then((transcription) => {
      console.log(`Transcription: ${transcription}`);
    });
  // [END speech_async_recognize_gcs]
}

function streamingRecognize (filename, encoding, sampleRate) {
  // [START speech_streaming_recognize]
  const fs = require('fs');

  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');

  // Instantiates a client
  const speech = Speech();

  // The path to the local file on which to perform speech recognition, e.g. /path/to/audio.raw
  // const filename = '/path/to/audio.raw';

  // The encoding of the audio file, e.g. 'LINEAR16'
  // const encoding = 'LINEAR16';

  // The sample rate of the audio file, e.g. 16000
  // const sampleRate = 16000;

  const request = {
    config: {
      encoding: encoding,
      sampleRate: sampleRate
    }
  };

  // Stream the audio to the Google Cloud Speech API
  const recognizeStream = speech.createRecognizeStream(request)
    .on('error', console.error)
    .on('data', (data) => {
      console.log('Data received: %j', data);
    });

  // Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
  fs.createReadStream(filename).pipe(recognizeStream);
  // [END speech_streaming_recognize]
}

function streamingMicRecognize (encoding, sampleRate) {
  // [START speech_streaming_mic_recognize]
  const record = require('node-record-lpcm16');

  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');

  // Instantiates a client
  const speech = Speech();

  // The encoding of the audio file, e.g. 'LINEAR16'
  // const encoding = 'LINEAR16';

  // The sample rate of the audio file, e.g. 16000
  // const sampleRate = 16000;

  const request = {
    config: {
      encoding: encoding,
      sampleRate: sampleRate
    }
  };

  // Create a recognize stream
  const recognizeStream = speech.createRecognizeStream(request)
    .on('error', console.error)
    .on('data', (data) => process.stdout.write(data.results));

  // Start recording and send the microphone input to the Speech API
  record.start({
    sampleRate: sampleRate,
    threshold: 0
  }).pipe(recognizeStream);

  console.log('Listening, press Ctrl+C to stop.');
  // [END speech_streaming_mic_recognize]
}

require(`yargs`)
  .demand(1)
  .command(
    `sync <filename>`,
    `Detects speech in a local audio file.`,
    {},
    (opts) => syncRecognize(opts.filename, opts.encoding, opts.sampleRate)
  )
  .command(
    `sync-gcs <gcsUri>`,
    `Detects speech in an audio file located in a Google Cloud Storage bucket.`,
    {},
    (opts) => syncRecognizeGCS(opts.gcsUri, opts.encoding, opts.sampleRate)
  )
  .command(
    `async <filename>`,
    `Creates a job to detect speech in a local audio file, and waits for the job to complete.`,
    {},
    (opts) => asyncRecognize(opts.filename, opts.encoding, opts.sampleRate)
  )
  .command(
    `async-gcs <gcsUri>`,
    `Creates a job to detect speech in an audio file located in a Google Cloud Storage bucket, and waits for the job to complete.`,
    {},
    (opts) => asyncRecognizeGCS(opts.gcsUri, opts.encoding, opts.sampleRate)
  )
  .command(
    `stream <filename>`,
    `Detects speech in a local audio file by streaming it to the Speech API.`,
    {},
    (opts) => streamingRecognize(opts.filename, opts.encoding, opts.sampleRate)
  )
  .command(
    `listen`,
    `Detects speech in a microphone input stream.`,
    {},
    (opts) => streamingMicRecognize(opts.encoding, opts.sampleRate)
  )
  .options({
    encoding: {
      alias: 'e',
      default: 'LINEAR16',
      global: true,
      requiresArg: true,
      type: 'string'
    },
    sampleRate: {
      alias: 'r',
      default: 16000,
      global: true,
      requiresArg: true,
      type: 'number'
    }
  })
  .example(`node $0 sync ./resources/audio.raw -e LINEAR16 -r 16000`)
  .example(`node $0 async-gcs gs://my-bucket/audio.raw -e LINEAR16 -r 16000`)
  .example(`node $0 stream ./resources/audio.raw  -e LINEAR16 -r 16000`)
  .example(`node $0 listen`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/speech/docs`)
  .help()
  .strict()
  .argv;