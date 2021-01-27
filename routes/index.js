var express = require('express');
var router = express.Router();

// 文章模板导入
let Article = require('../models/article')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let cPage = req.query.page || 1
  console.log(cPage);
  // let data = await Article.find()
  //  console.log(data)
let userName = req.session.userName || ''

let data = {
  blogList:[],//文章列表
  currPage:cPage,//当前页数
  pagesTotle:'',//总页数
}

//设定每页渲染的条数
let pageSize = 2
//确定每页显示的数据
data.blogList = await Article.find()
.limit(pageSize)//限定展示出来的条数
.skip((data.currPage - 1) * pageSize)//限定从第几条开始截取
//总数据
let blogAll = await Article.find()
//总页码
data.pagesTotle = Math.ceil(blogAll.length / pageSize)
// console.log(data.pagesTotle);


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
