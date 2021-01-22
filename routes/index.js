var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//登录路由配置
router.get('/login', function(req, res) {
  res.render('login', { });
});
//注册路由配置
router.get('/zhuce', function(req, res) {
  res.render('zhuce', { });
});
module.exports = router;
