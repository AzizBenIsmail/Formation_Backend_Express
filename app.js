var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const http = require('http');
const { connectToMongoDB } = require('./db/db');
const session = require('express-session');


require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRoutes');
var formationRouter = require('./routes/formation');
var osRouter = require('./routes/os');
var carRouter = require('./routes/carRouter');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin : 'http://localhost:3000',
  methods: 'GET , POST , PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials',
  credentials:true
}))

app.use(session({
  secret: 'net 3Click secret',
  resave: false,
  saveUninitialized: true,
  cookie:{
    secure: false, // À définir sur true si vous utilisez HTTPS
    maxAge: 2 * 60 * 60,
  }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/formation', formationRouter);
app.use('/os', osRouter);
app.use('/car', carRouter);

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
  res.json('error');
});

const server = http.createServer(app);
server.listen(process.env.PORT,() => { connectToMongoDB(); console.log('app is running on port 5000');});

module.exports = app;
