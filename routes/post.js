var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var router = express.Router();

var Post = require('../models/post');


router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts){
    //if(err) { console.log(err); }
    console.log(posts);
    res.render('post/index', {posts});
  })
});

router.get('/delete/:id', function(req, res, next) {
  console.log('id of the post to delete', req.params.id);
  res.render('post/index', {});
});

router.get('/add', function(req, res, next) {
  res.render('post/add', {});
});

router.post('/add', multer({ dest: './public/images/team/' }).single('img'), function(req, res, next) {

  if (!req.file) {
     res.send('No files were uploaded.');
  }

  newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    img: req.file.path
  });
  newPost.save();

  res.status(204).end();
  res.render('post/add', {});
  
});

module.exports = router;
