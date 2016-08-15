var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var router = express.Router();

var Message = require('../models/message');


router.get('/', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  Message.find({}, function(err, messages){
    if(err) { console.log(err); }
    res.render('message/index', {messages});
  })
});

router.get('/delete/:id', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  console.log('id of the message to delete', req.params.id);
  Message.find({ _id: req.params.id}).remove().exec();
  res.redirect('/message');
});

router.post('/add', function(req, res) {
  console.log(req.body.name);
  var newMessage = new Message({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
  });
  newMessage.save();
  res.redirect('/');
});

module.exports = router;
