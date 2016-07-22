var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


var routes = require('./routes/index');
var admin = require('./models/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

mongoose.connect('mongodb://localhost/suri');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("i'm logged in");
});

//  Configure type of connection
passport.use(new Strategy(
  function(email, password, cb) {
    Admin.find({ email : email }, function(err, admin) {
      if (err) return cb(err);
      if (!admin[0]){
        return cb(null, false);
      }
      bcrypt.compare(password, admin[0].password, function(err, res) {
        if(res == true){
          return cb(null, admin[0]);
        }else{
          return cb(null, false);
        }
      });
    });
  }));
// Configure Passport authenticated session persistence.
passport.serializeUser(function(admin, cb) {
  cb(null, admin._id);
});

passport.deserializeUser(function(id, cb) {
  User.find({ _id : id }, function(err, admin){
    //console.log(JSON.stringify(admin,null, 4));
    if (err) { return cb(err); }
    cb(null, admin[0]);
  })
});

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
