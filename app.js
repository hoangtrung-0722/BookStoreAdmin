require('dotenv').config();
require('./dal/database');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const cloudinary = require('cloudinary').v2;

const dashboardRouter = require('./routes/dashboard');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

const app = express();

// view engine setup
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//handlebars helpers registration
hbs.registerHelper('equal', function(num1, num2, options) {
  if (num1 === num2) {
    return options.fn(this);
  }
})

//cloudinary setup
cloudinary.config({
  cloud_name: 'bookstore589623',
  api_key: '633614294262385',
  api_secret: 'etns0rgMa6-y96aYxBMpmYc6lSQ'
});

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboardRouter);
app.use('/users', usersRouter);
app.use('/table_books', booksRouter);

// catch 404 and forward to error handler
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

module.exports = app;
