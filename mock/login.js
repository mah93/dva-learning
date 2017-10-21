const qs = require('qs');
const Mock = require('mockjs');

module.exports = {
  'POST /login' (req, res) {
    console.log(req.body);
    console.log('接受到请求');
    setTimeout(()=>res.json({code:'200',message:'从mock/example.js请求成功'}),2000)
  },
};
