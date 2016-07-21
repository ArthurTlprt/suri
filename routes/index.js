var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();


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
  posts: [
    {title: 'titre', src:'http://placehold.it/700x400', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'},
    {title: 'titre', src:'http://placehold.it/700x400', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'},
    {title: 'titre', src:'http://placehold.it/700x400', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'},
    {title: 'titre', src:'http://placehold.it/700x400', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'},
    {title: 'titre', src:'http://placehold.it/700x400', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'}
  ],
  timelines: [
    {title: 'titre', src:'/images/about/1.jpg', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'},
    {title: 'titre', src:'/images/about/1.jpg', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'},
    {title: 'titre', src:'/images/about/1.jpg', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'},
    {title: 'titre', src:'/images/about/1.jpg', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'},
    {title: 'titre', src:'/images/about/1.jpg', text: 'lead Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?'}
  ],
  members: [
    {name: 'Justine Daudon', depiction: 'La meuf trop forte', src: '/images/team/4.jpg', facebook: 'https://www.facebook.com/justine.daudon?fref=ts'},
    {name: 'Justine Daudon', depiction: 'La meuf trop forte', src: '/images/team/4.jpg', facebook: 'https://www.facebook.com/justine.daudon?fref=ts'},
    {name: 'Justine Daudon', depiction: 'La meuf trop forte', src: '/images/team/4.jpg', facebook: 'https://www.facebook.com/justine.daudon?fref=ts'},
    {name: 'Justine Daudon', depiction: 'La meuf trop forte', src: '/images/team/4.jpg', facebook: 'https://www.facebook.com/justine.daudon?fref=ts'}
  ],
  facebook: 'https://www.facebook.com/SuricatesIllumines/?fref=ts'

};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', content);
});

router.get('/admin', function(req, res, next) {
  res.render('admin',content);
});

router.post('/login', function(req, res, next) {
  console.log(req.body);
  res.render('admin',content);
});

module.exports = router;
