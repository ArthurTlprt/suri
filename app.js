var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var multer = require('multer');
var bcrypt = require('bcrypt');


var routes = require('./routes/index');
var admin = require('./routes/admin');
var post = require('./routes/post');
var member = require('./routes/member');
var timeline = require('./routes/timeline');

//var Post = require('./models/post');
var Admin = require('./models/admin');

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
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/admin', admin);
app.use('/post', post);
app.use('/timeline', timeline);
app.use('/member', member);


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

//mongoose.connect('mongodb://92.222.88.60/suri');
mongoose.connect('mongodb://localhost/suri');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("i'm logged in");
});

//  Configure type of connection
passport.use('local', new Strategy(
  function(email, password, cb) {
    console.log('pouet');
    Admin.find({ email : email }, function(err, admins) {
      if (err) return cb(err);
      if (!admins[0]){
        return cb(null, false);
      }
      console.log(JSON.stringify(admins[0], null, 4));
      bcrypt.compare(password, admins[0].password, function(err, res) {
        if(res == true){
          return cb(null, admins[0]);
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
  Admin.find({ _id : id }, function(err, admin){
    //console.log(JSON.stringify(admin,null, 4));
    if (err) { return cb(err); }
    cb(null, admin[0]);
  })
});

module.exports = app;
