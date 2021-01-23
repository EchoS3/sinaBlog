var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//实现用户提交信息，注册事项
router.post('/addUser',(req,res,next)=>{
  console.log(req.body);
})

module.exports = router;
