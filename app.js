var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');


var dbConfig = require('./db');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mongo database connected....');
});

// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//serve static files before all others dynamic serve
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname,'bower_components')));
app.use('/static', express.static(path.join(__dirname,'bower_components/components-font-awesome')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'temujin' })); //configure express-session before passport-session
app.use(passport.initialize());//configure passport
app.use(passport.session());
app.use(flash());//stuff request object with flash msg property

// Initialize Passport - localStrategy
var initPassport = require('./passport/init');
initPassport(passport);

//config routes
var routes = require('./routes/index');
//var security = require('./routes/security')(passport);
var users = require('./routes/users');


// app.get('/partials/:filename', routes.partials);
app.use('/', routes);

//app.use('/', security);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// color to aim #FF3300

// all variables can found here : http://getbootstrap.com/customize/
// http://stackoverflow.com/questions/18529274/change-navbar-color-in-twitter-bootstrap-3

//Authentication 
//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619

// mongodb://sky:Password123>@ds042729.mlab.com:42729/skydb


//resources :
//https://scotch.io/tutorials/use-ejs-to-template-your-node-application
//https://www.airpair.com/
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
//http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619