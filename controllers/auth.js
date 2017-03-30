var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config()
let methods = {}

methods.loginTwitter = function (req, res, next) {
  let data = {
    username : req.user.username,
    name : req.user.name
  }
  let token = jwt.sign(data, process.env.SECRETE_FOR_JWT, {expiresIn : '1h'})
  res.json(token)
}

module.exports = methods
