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
.sort({_id:'desc'})//倒叙
.skip((data.currPage - 1) * pageSize)//限定从第几条开始截取
//总数据
let blogAll = await Article.find()
//总页码
data.pagesTotle = Math.ceil(blogAll.length / pageSize)
// console.log(data.pagesTotle);


   res.render('index', { userName,data});
});

//详情页路由配置
router.get('/details',async function(req, res) {
   let blokId = req.query._id
  console.log(blokId);

  let data = await Article.findOne({_id:blokId})
 

  res.render('details', { data });
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
router.get('/write',async function(req, res) {
  let userName = req.session.userName || ''
let _id = req.query._id || ''
if(_id){
  let page = req.query.page

  console.log(_id)
console.log(page)
//查询文章数据渲染
let details = await Article.findOne({_id:_id})
//时间处理
res.render('write',{ userName,details })
}else{







  res.render('write', { userName });
}
});
module.exports = router;
