var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var router = express.Router();

var Post = require('../models/post');


router.get('/', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  Post.find({}, function(err, posts){
    if(err) { console.log(err); }
    res.render('post/index', {posts});
  })
});

router.get('/delete/:id', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  console.log('id of the post to delete', req.params.id);
  Post.find({ _id: req.params.id}).remove().exec();
  res.redirect('/post');
});

router.get('/add', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  res.render('post/add', {});
});

router.post('/add', require('connect-ensure-login').ensureLoggedIn('../login'), multer({ dest: './public/images/posts/' }).single('img'), function(req, res, next) {

  if (!req.file) {
     res.send('No files were uploaded.');
  }

  newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    img: req.file.path.split("public").pop()
  });
  newPost.save();

  res.status(204).end();
  res.render('post/add', {});

});

module.exports = router;
