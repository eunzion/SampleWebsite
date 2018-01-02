var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

var index = require('./controllers/index');
var bands = require('./controllers/band');
var users = require('./controllers/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));

var swigInstance = new swig.Swig();
app.engine('html',swigInstance.renderFile);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.show);
// Defining route to list and post
app.get('/bands', bands.list);
// Get band by ID
app.get('/band/:id', bands.byId);
// Create band
app.post('/bands', bands.create);
// Update
app.put('/band/:id', bands.update);
// Delete by id
app.delete('/band/:id', bands.delete);
// Defining route to list and post users
app.get('/users', users.list);
app.post('/users', users.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.set('port',process.env.PORT || 3000);
var server = app.listen(app.get('port'),function(){
    console.log('Express server listening on port '+server.address().port);
});
