const express = require('express');
var router = express.Router();
const record = require('../controllers/record');
require('dotenv').config()

router.get('/', record.tweets)

module.exports = router
