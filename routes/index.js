var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var Post = require('../models/post');
var Timeline = require('../models/timeline');
var Admin = require('../models/admin');
var Member = require('../models/member');
//var Contact = require('../models/contact');


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

      Member.find({}, function(err, members) {
        if(err) { console.log(err); }

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
            p3: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?',
            src: 'https://www.youtube.com/watch?v=NLE058XnowM'
          },
          posts: posts,
          timelines: timelines,
          members: members,
          facebook: 'https://www.facebook.com/SuricatesIllumines/?fref=ts'
        };
        res.render('index', content);
      });
    });
  });

  //console.log(posts);

});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', require('connect-ensure-login').ensureLoggedIn('../login'),
  function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: 'login' }),
  function(req, res) {
  console.log(req.admin);
  console.log(req.body.password);
  res.redirect('/admin');
});


module.exports = router;
