var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var router = express.Router();

var Timeline = require('../models/timeline');


router.get('/', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  Timeline.find({}, function(err, timelines){
    if(err) { console.log(err); }
    res.render('timeline/index', {timelines});
  })
});

router.get('/delete/:id', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  console.log('id of the timeline to delete', req.params.id);
  Timeline.find({ _id: req.params.id}).remove().exec();
  res.redirect('/timeline');
});

router.get('/edit/:id', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
  console.log('id of the timeline to edit', req.params.id);
  Timeline.findById(req.params.id, function(err, timeline) {
    res.render('timeline/edit', {timeline});
  });
});

router.post('/edit/:id', require('connect-ensure-login').ensureLoggedIn('../login'), multer({ dest: './public/images/timelines/' }).single('img'), function(req, res, next) {
  Timeline.findById(req.params.id, function(err, timeline) {
    if (req.file) {
      timeline.img = req.file.path.split("public").pop();
    }
    timeline.date = req.body.date;
    timeline.title = req.body.title;
    timeline.body = req.body.body;
    timeline.save();
    res.redirect('/timeline');
  });
});

router.get('/add', require('connect-ensure-login').ensureLoggedIn('../login'), function(req, res, next) {
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
  res.redirect('/timeline');

});

module.exports = router;
