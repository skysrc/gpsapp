var express = require('express');
var router = express.Router();



//module.exports = router;

module.exports = function (passport) {


  /* GET home page. */
  router.get('/login', function (req, res, next) {
    res.render('login', { title: 'User Login' });
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));

  /* GET Registration Page */
  router.get('/signup', function (req, res) {
    res.render('signup', { message: req.flash('message') });
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  return router;

}
