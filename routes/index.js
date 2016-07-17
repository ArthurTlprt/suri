var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
  {title: 'Surricates illuminés',
  nav: {
      li1: 'La troupe',
      li2: 'Actualité',
      li3: 'Parcours',
      li4: 'Les comédiens',
      li5: 'Nous contacter'
  }});
});

module.exports = router;
