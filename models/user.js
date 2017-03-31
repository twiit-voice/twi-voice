const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../config/db')

var userSchema = new Schema({
  user_token : String,
  user_token_secret : String,
  id_twitter : String,
  username : String,
  name : String
})

var User = mongoose.model('User', userSchema)

module.exports = User
