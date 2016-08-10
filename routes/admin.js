var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var router = express.Router();

var Admin = require('../models/admin');


router.get('/', function(req, res, next) {
  Admin.find({}, function(err, admins) {
    res.render('admin/index', {admins: admins});
  });
});

router.get('/add', function(req, res, next) {
  res.render('admin/add', {});
});

router.post('/add', function(req, res, next) {
  bcrypt.hash(req.body.password, 8, function(err, hash) {
    var newAdmin = new Admin({
      email: req.body.email,
      password: hash
    });
    newAdmin.save(function(err) {
      if (err) {
				console.log(err);
        res.redirect('add');
      }
    });
    // req.login(newAdmin, function(err){
    //   if(err) throw err;
    //   res.redirect('index');
    // });
  });
});

module.exports = router;
