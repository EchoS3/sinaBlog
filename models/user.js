let  Mongoose = require('../mongodb/db')
//Schema
let Schema = Mongoose.Schema

let userSchema = new Schema({
    userName:String,
    password:String,
    passwordC:String
})
//Model------将会生成数据库集合名称（复数）
let User = Mongoose.model('users', userSchema)

module.exports=User