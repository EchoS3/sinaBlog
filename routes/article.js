var express = require('express');
var router = express.Router();

// 文章模板导入
let Article = require('../models/article')
//上传文件工具
var Multipary = require('multiparty')
// 导入文件
let fs = require('fs')

router.post('/add',(req,res,next) => {
    // console.log(req.body);

//首先来获取下文章id，以此判断是新增还是编辑
let _id = req.body.dId || ''

//新增
if(!_id){
    let date = new Date()
    console.log(date);
    //向数据库添加用户信息
    let articleInfo = {
        title:req.body.title,
        content:req.body.content,
        datetime:date,
    }
    //页面表单数据，放入模型
    let articleI = new Article(articleInfo)

    //保存
    articleI.save((err,result) => {
        if(!err) {
          //  res.send(result)
            res.redirect('/write')
        }
    })
}else{//编辑
    let page = req.body.page
    // _id
    // 查找一条数据并修改内容
    // 新数据获取
    let date = new Date()
    let articleData = {
        title:req.body.title,
        content:req.body.content,
        datetime:date,
    }
    Article.findByIdAndUpdate(_id, articleData, { new: true }, (err,result) => {
         if(!err){
            res.redirect(`/?page=${page}`)
         }
    })


}
})



//新增上传图片的路由
router.post('/upload',(req,res,next) => {
  //图片文件上传的操作
//   console.log(req.body);
// 实例化 Multipary 
let from = new Multipary.Form();
// 使用path，获取文件信息
from.parse(req,(err, fields, files) => {
   if(err){
    console.log(err)
   }
//    console.log(fields + "第一个");
//    console.log(files.upload[0]);
let file = files.upload[0]
   //将读取到的文件信息和文件上传到本项目下，也就是服务器
   //读取文件流
   let rStream = fs.createReadStream(file.path)
   //拼接路径
   let filePath = '/uploads/' + file.originalFilename
    //  写入文件流
    let wStream = fs.createWriteStream('./public'+ filePath)
    // 触发读写管道，实现上传
    rStream.pipe(wStream)
    // 将文件返回给CKeditor这个插件
    wStream.on('close',() => {
        res.send({
            uploaded: 1,
             url: filePath })
    })
})
})
//文章删除的接口
router.get('/delete',(req,res,next) => {
    //从接口接收传输的id和页码page
    let id = req.query._id
    let page = req.query.page
    console.log(id,page)
    //根据id从数据库删除一条
    Article.deleteOne({_id: id },err => {
        if(!err){
    // res.send('删除成功')
    //返回删除前的页面
    res.redirect(`/?page=${page}`)
        }
    })
})
module.exports = router;