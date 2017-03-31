var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
require('dotenv').config()
let methods = {}

methods.loginTwitter = function (req, res, next) {
  let data = {
    user_token : req.user.user_token,
    user_token_secret : req.user.user_token_secret,
    id : req.user._id,
    username : req.user.username,
    name : req.user.name
  }
  let token = jwt.sign(data, process.env.SECRETE_FOR_JWT, {expiresIn : '1h'})

  res.json(token)
}

methods.verify = function(req, res, next){
  jwt.verify(req.headers.token, process.env.SECRETE_FOR_JWT, (err, decoded) => {
    if(err){
      res.json(err)
    }else {
      req.user_token = decoded.user_token
      req.user_token_secret = decoded.user_token_secret
      next()
    }
  })
}

module.exports = methods
