const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.listen(3000, function () {
  console.log('example app listenting on port 3000')
})

var {Admin} = require('../dao/connect.js')

// 简单登录验证
app.post('/login', function (req, res) {
  var username = req.body.username
  var password = req.body.password
  Admin.findOne({
    where: {username: username}
  }).then(admin => {
    if (admin == null) {
      res.send('用户名或密码不对')
    } else {
      if (admin.password !== password) {
        res.send('密码不正确')
      } else {
        // 登录成功 重定向
        res.send('登录成功')
      }
    }
  })
})
app.get('/index', function (req, res) {
  res.end()
})
