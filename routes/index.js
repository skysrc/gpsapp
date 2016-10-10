var express = require('express');
var router = express.Router();
var Mail = require('../models/mail');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Express', authenticated: false });
});

/* GET home page with authenticated view. */
router.get('/home', isAuthenticated, function (req, res, next) {
  res.render('index', { authenticated: true });
});

//service
router.get('/service', function (req, res, next) {
  res.render('service', { title: 'Express', authenticated: false });
});

router.post('/sendmsg', function (req, res, done) {
  //res.send('You sent the name "' + req.body.name + '".');
	var newMail = new Mail();

	newMail.name = req.param('name');
	newMail.email = req.param('email');
	newMail.hpno = req.param('phone');
	newMail.msg = req.param('message');
	newMail.created = new Date();

	// save the mail
	newMail.save(function (err) {
		if (err) {
			console.log('failed to store succesful');
			res.status(500).send(err);
		}
		console.log('Mail stored succesful');
		res.status(200).send(newMail);
	});

});

// module.exports.index = function(req, res){
// 	console.log('index is hereere');
//  	res.render('main', { title: 'Express', authenticated : false });
// };

// module.exports.partials = function(req, res){

//   var filename = req.params.filename;
// 	console.log('flieName is : ' + filename);
//   if(!filename) return;  // might want to change this

//   res.render("partials/" + filename );
// };

// router.get('*', function(req, res, next) {
//   res.render('main', { title: 'Express', authenticated : false });
// });

// exports.partials = function(req, res){
//   var filename = req.params.filename;
//   if(!filename) return;  // might want to change this
//   res.render("partials/" + filename );
// };

module.exports = router;
