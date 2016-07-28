var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var Post = require('../models/post');


router.get('/', function(req, res, next) {
  res.render('post/index', {});
});

router.get('/delete/:id', function(req, res, next) {
  console.log('id of the post to delete', req.params.id);
  res.render('post/index', {});
});

router.get('/add', function(req, res, next) {
  res.render('post/add', {});
});

router.post('/add', function(req, res, next) {

});

module.exports = router;
