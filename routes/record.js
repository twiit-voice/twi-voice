const express = require('express');
var router = express.Router();
const record = require('../controllers/record');
var auth = require('../controllers/auth')
require('dotenv').config()

router.get('/', auth.verify, record.tweets)

module.exports = router
