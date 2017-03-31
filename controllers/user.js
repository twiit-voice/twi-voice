var express = require('express');
var app = express.Router()
var User = require('../models/user')
let methods = {}


methods.findAll = function (req,res) {
  User.find({}, function (err, result) {
    if (err) {
      res.json(err)
    }else{
      res.json(result)
    }
  })
}

methods.findById = function (req,res) {
  User.findById(req.params.id, function (err, result) {
    if (err) {
      res.json(err)
    }else{
      res.json(result)
    }
  })
}

methods.update = function (req,res) {
  User.findByIdAndUpdate({'_id' : req.params.id}, {$set : req.body},{new : true}, function (err,result) {
    if (err) {
      res.json(err)
    }else{
      res.json(result)
    }
  })
}

methods.delete = function (req,res) {
  User.findByIdAndRemove(req.params.id, function (err, result) {
    if (err) {
      res.json(err)
    }else{
      res.json(result)
    }
  })
}

module.exports = methods
