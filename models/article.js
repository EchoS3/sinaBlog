let  Mongoose = require('../mongodb/db')
//Schema
let Schema = Mongoose.Schema

let userSchema = new Schema({
    title:String,
    content:String,
})
//Model------将会生成数据库集合名称（复数）
let Acticle = Mongoose.model('acticles', userSchema)

module.exports=Acticle