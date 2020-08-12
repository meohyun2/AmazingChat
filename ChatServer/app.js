var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var indexRouter = require('./routes/index');
var app = express();

// DB connection
const mongoose = require('mongoose');

var corsOptions = {
  origin: 'https://amazingchat.run.goorm.io',
  optionsSuccessStatus: 200,
	methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true,                // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

// Connect DB server
mongoose.connect('mongodb://localhost:27017',{dbName:'amaizingchat',useNewUrlParser: true,useUnifiedTopology:true})
		.then(()=>{console.log("database connected");})
		.catch((err)=>{console.log("에러 발생",err)});

// Session
const MongoStore = require('connect-mongo')(session);
const keyOption = require('./secretKey/sessionOptions');
app.use(session({
		secret : keyOption.secret,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, httpOnly: false },
    store: new MongoStore({
			mongooseConnection : mongoose.connection,
			autoRemove: 'interval',
      autoRemoveInterval: 10,
		})
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use('/', indexRouter);


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
