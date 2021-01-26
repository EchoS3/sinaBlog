var express = require('express');
var router = express.Router();

// 文章模板导入
let Article = require('../models/article')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = await Article.find()
   console.log(data)
let userName = req.session.userName || ''

  res.render('index', { userName,data});
});

//导航路由配置
router.get('/details', function(req, res) {
  res.render('details', {  });
});
//登录路由配置
router.get('/login', function(req, res) {
  res.render('login', { });
});
//注册路由配置
router.get('/zhuce', function(req, res) {
  res.render('zhuce', {  });
});
//写博客页面路由配置
router.get('/write', function(req, res) {
  let userName = req.session.userName
  res.render('write', {  });
});
module.exports = router;
