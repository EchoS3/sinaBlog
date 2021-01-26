var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入
var session = require('express-session')





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersRouter = require('./routes/article');

var app = express();

//配置
app.use(session({
  secret:'bname',
  resave:false,//发送请求的时候重新保存session
  saveUninitialized:true,//保存初始化状态
  cookie: { maxAge: 1000*60*60*24 }//存储的信息在客户端cookie，保存时间
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 登录拦截
// 所有访问我们网站的用户如果没有登录让他去登录
// 访问页面时
// 先获取username--------req.session.先获取username
// 如果能获取直接访问
// 如果不能获取重定向到登录注册页

app.get('*',(req,res,next) => {
  let userName = req.session.userName
  if(!userName) {
    let path = req.path
    if(path !== '/login' && path !== '/zhuce') {
      //拦截重定向
     //  res.redirect('login')
    }
   }
   next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', usersRouter);

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
