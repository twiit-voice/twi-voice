var express = require('express');
var router = express.Router()
var user = require('../controllers/user')
var auth = require('../controllers/auth')

router.get('/', auth.verify , user.findAll)
router.get('/:id', auth.verify ,user.findById)
router.put('/:id', auth.verify ,user.update)
router.delete('/:id', auth.verify, user.delete)

module.exports = router
