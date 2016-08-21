var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var router = express.Router();

var Member = require('../models/member');


router.get('/', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  Member.find({}, function(err, members){
    if(err) { console.log(err); }
    res.render('member/index', {members});
  })
});

router.get('/delete/:id', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  console.log('id of the member to delete', req.params.id);
  Member.find({ _id: req.params.id}).remove().exec();
  res.redirect('/member');
});

router.get('/add', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  res.render('member/add', {});
});

router.post('/add', multer({ dest: './public/images/members/' }).single('img'), function(req, res, next) {

  if (!req.file) {
     res.send('No files were uploaded.');
  }

  newMember = new Member({
    name: req.body.name,
    legend: req.body.legend,
    img: req.file.path.split("public").pop(),
    facebook: req.body.facebook
  });
  newMember.save();

  res.status(204).end();
  res.redirect('/member');

});

module.exports = router;
