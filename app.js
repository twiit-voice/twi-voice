var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var app = express()
var index = require('./routes/index');
var users = require('./routes/users');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', index)
app.use('/api/users', users)

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});

module.exports = app
