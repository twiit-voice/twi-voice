var express = require('express');
var router = express.Router();
var statusController = require('../controllers/status')

router.get('/', statusController.timeline);

module.exports = router;