var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); // added michael
var morgan = require('morgan')
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var app = express()
var index = require('./routes/index');
var users = require('./routes/users');
var record = require('./routes/record');
var statuses = require('./routes/statuses'); // added michael

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.set('views', path.join(__dirname, 'views')); // added michael
app.set('view engine', 'ejs'); // added michael

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.helper = require('./helpers/util'); // added michael

app.use('/api', index)
app.use('/api/users', users)
app.use('/api/record', record)
app.use('/statuses', statuses) // added michael

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});

module.exports = app
