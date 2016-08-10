var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var Post = require('../models/post');
var Timeline = require('../models/timeline');


/* GET home page. */
router.get('/', function(req, res, next) {

  Post.find({}, function(err, posts){
    if(err) { console.log(err); }
    Timeline.find({}, function(err, timelines){
      if(err) { console.log(err); }

      timelines.sort(function (a, b) {
        if (a.date > b.date)
          return 1;
        if (a.date < b.date)
          return -1;
        return 0;
      });

      var content = {
        title: 'Suricates illuminés',
        nav: {
          li1: 'La troupe',
          li2: 'Actualité',
          li3: 'Parcours',
          li4: 'Les comédiens',
          li5: '(Nous) contacter'
        },
        about: {
          p1: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?',
          p2: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?',
          p3: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'
        },
        posts: posts,
        timelines: timelines,
        members: [
          {name: 'Justine Daudon', depiction: 'La meuf trop forte', src: '/images/team/1.jpg', facebook: 'https://www.facebook.com/justine.daudon?fref=ts'},
          {name: 'Justine Daudon', depiction: 'La meuf trop forte', src: '/images/team/3.jpg', facebook: 'https://www.facebook.com/justine.daudon?fref=ts'},
          {name: 'Justine Daudon', depiction: 'La meuf trop forte', src: '/images/team/5.jpg', facebook: 'https://www.facebook.com/justine.daudon?fref=ts'},
          {name: 'Justine Daudon', depiction: 'La meuf trop forte', src: '/images/team/6.jpg', facebook: 'https://www.facebook.com/justine.daudon?fref=ts'}
        ],
        facebook: 'https://www.facebook.com/SuricatesIllumines/?fref=ts'

      };

      res.render('index', content);

    });

  });

  //console.log(posts);

});

router.get('/login', function(req, res, next) {
  res.render('login',content);
});

router.post('/login', function(req, res, next) {
  console.log(req.body.email);
  console.log(req.body.password);
  res.render('login',content);
});

router.post('/add', function(req, res, next) {
  console.log(req.body.email);
  console.log(req.body.password);
  res.render('login',content);
});

module.exports = router;
