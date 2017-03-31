var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config()
let methods = {}

methods.loginTwitter = function (req, res, next) {
  let data = {
    id : req.user._id,
    username : req.user.username,
    name : req.user.name
  }
  let token = jwt.sign(data, process.env.SECRETE_FOR_JWT, {expiresIn : '1h'})
  res.json(token)
}

methods.verify = function(req, res, next){
  if (!req.headers.token) {
    res.json("you don't have access")
  }else{
    if (jwt.verify(req.headers.token, process.env.SECRETE_FOR_JWT)) {
      next()
    }else {
      res.json("token was expired")
    }
  }
}

module.exports = methods
