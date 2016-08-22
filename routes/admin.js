var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var router = express.Router();

var Admin = require('../models/admin');


router.get('/', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  Admin.find({}, function(err, admins) {
    res.render('admin/index', {admins: admins});
  });
});

router.get('/add', /*require('connect-ensure-login').ensureLoggedIn('../login'),*/ function(req, res, next) {
  res.render('admin/add', {});
});

router.get('/delete/:id', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  Admin.find({ _id: req.params.id}).remove().exec();
  res.redirect('/admin');
});

router.post('/add', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
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
    /*req.login(newAdmin, function(err){
      if(err) throw err;
    });*/
    res.redirect('/admin');
  });
});

module.exports = router;
