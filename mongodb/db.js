//1.安装
//2.导入安装模块
let mongoose = require('mongoose')//CMD模块化导入语句
//创建一个数据库地址
let dbUrl = 'mongodb://localhost/disco'//disco数据库库名
//创建连接
mongoose
.connect(dbUrl)
.then(()=> console.log('数据库链接成功'))
.catch(err => { console.log('数据库链接失败' + err )})

module.exports=mongoose//CMD模块化导出语句