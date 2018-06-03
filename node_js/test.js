var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var app = express()

// show image files
app.use(express.static('images'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var runPython = function() {
var PythonShell = require('python-shell');

var pyshell = new PythonShell('./python/my_script.py');

	// sends a message to the Python script via stdin
	pyshell.send('Hello World!');

	pyshell.on('message', function (message) {
	  // received a message sent from the Python script (a simple "print" statement)
	  console.log(message);
	});

	// end the input stream and allow the process to exit
	pyshell.end(function (err,code,signal) {
	  if (err) throw err;
	  console.log('The exit code was: ' + code);
	  console.log('The exit signal was: ' + signal);
	});
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/a', function (req, res) {
  res.send('hello world')
  console.log('called!')
  runPython()
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))