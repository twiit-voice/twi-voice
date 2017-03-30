const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../config/db')

var userSchema = new Schema({
  id_twitter : String,
  username : String,
  name : String
})

var User = mongoose.model('User', userSchema)

module.exports = User
