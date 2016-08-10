var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var router = express.Router();

var Timeline = require('../models/timeline');


router.get('/', function(req, res, next) {
  Timeline.find({}, function(err, timelines){
    if(err) { console.log(err); }
    res.render('timeline/index', {timelines});
  })
});

router.get('/delete/:id', function(req, res, next) {
  console.log('id of the timeline to delete', req.params.id);
  Timeline.find({ _id: req.params.id}).remove().exec();
  res.redirect('/timeline');
});

router.get('/add', function(req, res, next) {
  res.render('timeline/add', {});
});

router.post('/add', multer({ dest: './public/images/timelines/' }).single('img'), function(req, res, next) {

  if (!req.file) {
     res.send('No files were uploaded.');
  }

  newTimeline = new Timeline({
    date: req.body.date,
    title: req.body.title,
    body: req.body.body,
    img: req.file.path.split("public").pop()
  });
  newTimeline.save();

  res.status(204).end();
  res.render('timeline/add', {});

});

module.exports = router;
