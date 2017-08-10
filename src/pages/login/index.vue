<template>
  <div>
    <div class="topHeader"><h1>蜜蜂出行城市合伙人管理平台</h1></div>
    <div id="login">
      <div id="cover">
        <div v-title>蜜蜂出行城市合伙人管理平台-登录</div>
            <div class="content">
              <header>
                <p>蜜蜂出行城市合伙人管理平台</p>
              </header>
              <div class="loginForm">
                <div class="logo"><img src="../../assets/img/footer.png"></div> 
                <div class="signIn">
                  登录
                </div>
                <el-form label-width="60px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
                  <el-form-item class="userClass" prop="userName" label="">
                    <el-input v-model="formLabelAlign.userName" placeholder="请输入用户名" autofocus="autofocus" tabindex="1"></el-input>
                  </el-form-item>
                  <el-form-item class="userClass" prop="passWord" label="">
                    <el-input v-model="formLabelAlign.passWord" @keyup.enter.native="handleEnter" type="passWord" placeholder="请输入密码" tabindex="2"></el-input>
                  </el-form-item>
                  <div class="button-group" style="">
                    <el-row>
                        <el-button class="login" name="userName" @click="handleSubmit">登录</el-button>
                    </el-row>
                   <el-row>
                      <el-button class="forget_psd" @click="handleFindPsd" name="passWord">忘记密码</el-button>
                   </el-row>
                  </div>
                </el-form>
              </div>
              <el-dialog class="forgetPsd" title="找回密码" :visible.sync="dialogFormVisible">
                <el-form :model="findForm" :rules="findFormRule" ref="findPsd">
                  <el-form-item label="手机号" prop="tel" :label-width="formLabelWidth">
                    <el-input v-model="findForm.tel" auto-complete="off"></el-input>
                    <el-button class="getVerCode" @click="getVerCode(findForm.tel)" :plain="isPlain" :disabled="isDisabled">
                      获取验证码
                    </el-button>
                  </el-form-item>
                  <el-form-item label="验证码" prop="vercode" :label-width="formLabelWidth">
                    <el-input v-model="findForm.vercode" auto-complete="off"></el-input>
          
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                   <el-button class="findPsdBtn confirm" type="primary" @click="findPsd">确定</el-button>
                  <el-button class="findPsdBtn cancle" @click="dialogFormVisible = false">取消</el-button>
                </div>
              </el-dialog>
              <el-dialog title="重置密码" :visible.sync="resetFormVisible">
                <el-form :model="resetForm" :label-position="labelPosition" :rules="resetFormRule" ref="resetForm">
                  <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
                    <el-input type="passWord" v-model="resetForm.pass" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth" label="确认密码" prop="checkPass">
                    <el-input type="passWord" v-model="resetForm.checkPass" auto-complete="off"></el-input>
                  </el-form-item>
          
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="resetFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="resetPsd">确 定</el-button>
                </div>
              </el-dialog>
            </div>
      </div>
    </div>
    <div class="footer">
      <h4>北京蜜蜂出行科技有限公司版权所有©2017</h4>
    </div>
  </div>
</template>
<script>
import request from 'superagent'
import $ from 'jquery'
import { checkMobile, IsEmpty } from '../../../utils/index.js'
import { host } from '../../config/index'
export default {
  data() {
    var validateTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      } else {
        setTimeout(() => {
          var res = checkMobile(value)
          if (res === true) {
            return callback()
          } else {
            callback(new Error('手机格式格式不正确！！！'))
          }
        }, 1000)
      }

    }
    var validateVerCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.resetForm.checkPass !== '') {
          this.$refs.resetForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      sendPhoneCode:false,
      labelPosition: 'right',
      isPlain: false,
      isDisabled: false,
      findForm: {
        tel: '',
        verCode: '',
        verificationCode: ''
      },
      resetForm: {
        pass: '',
        checkPass: ''
      },
      formLabelWidth: '100px',
      formLabelAlign: {
        userName: '',
        passWord: ''
      },
      dialogFormVisible: false,
      resetFormVisible: false,
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      findFormRule: {
        tel: [{ required: true, trigger: 'blur', validator: validateTel }],
        vercode: [{ required: true, trigger: 'blur', validator: validateVerCode }]
      },
      resetFormRule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getVerCode(val) {
      var that = this
      var $btn = $('button.getVerCode')
      var text = $btn.text()
      this.initText = text
      var initTime = 10
      if (checkMobile(val)) {
        // 像后台发送 手机号，确认手机号是否已经注册，如果注册 则 发送验证码，否则返回 该手机号未注册
        request.post(host + 'beepartner/system/login/checkFranchiseePhone')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            phoneNo: this.findForm.tel
          })
          .end(function (error, res) {
            if (error) {
              console.log(error)
            } else {
              var code = JSON.parse(res.text).resultCode
              var message = JSON.parse(res.text).message
              if (code === 1) {
                that.$message({
                  type: 'success',
                  message: message
                })
                that.sendPhoneCode = true
                if(that.sendPhoneCode){
                  // 手机已经绑定，可以找回密码
                  that.isDisabled = true
                  that.isPlain = false
                  var timer = setInterval(function () {
                    initTime--
                    if (initTime <= 0) {
                      that.isDisabled = false
                      that.isPlain = true
                      $btn.text(that.initText)
                      clearInterval(timer)
                      return
                    } else {
                      $btn.text(initTime + 's')
                    }
                  }, 1000)
                  setTimeout(function () {
                    that.$message({
                      message: '已向您的手机发送验证码，请查收！！！',
                      type: 'success'
                    })
                  }, 1000)
                  request.post(host + 'beepartner/system/login/getphoneCode')
                    .withCredentials()
                    .set({
                      'content-type': 'application/x-www-form-urlencoded'
                    })
                    .send({
                      phoneNo: that.findForm.tel
                    })
                    .end(function(err,res){
                      if(err) {
                        console.log(err)
                      } else {
                        that.findForm.verificationCode = JSON.parse(res.text).data
                        var message = JSON.parse(res.text).message
                      }
                  })
                }  
              } else {
                // 手机号未注册过
                that.$message({
                  type: 'error',
                  message: '手机号未绑定，请注册'
                })
              }
            }
          })
       
      }
    },
    handleSubmit() {
      if (this.formLabelAlign.userName === '' && this.formLabelAlign.passWord) {
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning'
        })
      } else {
        request
          .post(host + 'beepartner/system/login/franchiseeLogin')
           .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'userName': this.formLabelAlign.userName,
            'passWord': this.formLabelAlign.passWord
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
              this.$message({
                type:'error',
                message:'网络请求超时，请稍候再试'
              })
            } else {
              if (JSON.parse(res.text).resultCode === 1) {
                 var message = JSON.parse(res.text).message
                this.$message({
                  message: message,
                  type: 'success'
                })
                // var data = JSON.parse(JSON.parse(res.text).data)
                // localStorage.setItem('userinfo',JSON.parse(res.text).data)
                // this.$store.commit('getUserInfo',data)
                 this.$router.push('/index')
              } else {
                var message = JSON.parse(res.text).message
                this.$message.error(message);
              }
            }
          })
      }
    },
    handleEnter() {
      this.handleSubmit()
    },
    handleFindPsd() {
      this.dialogFormVisible = true
      this.findForm.tel = ''
      this.findForm.vercode = ''
      this.findForm.verificationCode = ''
    },
    findPsd() {
      var that = this
      this.$refs.findPsd.validate((valid) => {
        if (valid) {
          // 这里 还需要 对验证码进行验证 若验证 通过 则可以 找回密码
          request.post(host + 'beepartner/system/login/checkFranchiseePhoneCode')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              phoneNo: that.findForm.tel,
              phoneCode: that.findForm.vercode
            })
            .end(function (error, res) {
              if (error) {
                console.log(error)
              } else {
                console.log(res)
                var code = JSON.parse(res.text).resultCode
                var message = JSON.parse(res.text).message
                if(code===1){
                  that.$message({
                    type: 'success',
                    message:message
                  })
                  that.dialogFormVisible = false
                   that.resetFormVisible = true
                }else{
                  that.$message({
                    type: 'error',
                    message:message
                  })
                }
                return
              }
            })
        }
      })
    },
    resetPsd() {
      this.$refs.resetForm.validate((valid) => {
        var that = this
        if (valid) {
          // 像服务器发送 重置密码的请求
          request.post(host + 'beepartner/system/login/setFranchiseeNewPassword')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              passWord: that.resetForm.pass
            })
            .end(function (err, res) {
              if (err) {
                console.log(err)
              } else {
                var code = JSON.parse(res.text).resultCode
                var message = JSON.parse(res.text).message
                if (code === 1) {
                  that.$message({
                    type: 'success',
                    message: '恭喜您，重置密码成功,请重新登录！'
                  })
                  that.resetFormVisible = false
                } else {
                  that.$message({
                    type: 'error',
                    message: '对不起，重置密码失败！'
                  })
                }
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>
<style>
button.login {
    width: 275px;
    height: 36px;
    border-radius: 4px;
    outline: none;
    border: none;
    background: rgba(241, 194, 52, 1);
    color: #fff !important;
    cursor: pointer;
    margin-left: 60px;
}

button.login:hover {
  background: rgba(241, 194, 52, 0.8);
  color: #fff !important;
}

button.login:active {
  background: rgba(241, 194, 52, 0.8);
  color: #fff !important;
}

div.signIn {
    font-size: 24px;
    padding-left: 60px;
    border-radius: 4px;
    color: #000;
    font-weight: 400;
    margin-top: 38px;
}

div.topHeader h1 {
    line-height: 90px;
    color: rgba(102, 102, 102, 1);
    font-weight: normal;
    padding-left: 20px;
}

div.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}

div.footer h4 {
    text-align: center;
    line-height: 90px;
    color: rgba(102, 102, 102, 1);
    font-weight: normal;
}

div#login {
    width: 100%;
    background: url('../../assets/img/1.jpg') no-repeat;
    background-position: left;
    border-radius: 4px;
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 90px;
    background-size: cover;
}

#cover {
    /* background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%; */
    position: relative;
    height: 100%;
}

div#login div.content {
    width: 100%;
    height: 100%;
}

div#login div.content header {
    width: 100%;
    /* height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
  padding-top: 10%; */
}

div#login div.content header p {
    width: 400px;
    margin-right: 12.5%;
    font-family: '华文彩云';
    font-weight: 800;
    color: rgba(255, 215, 0, 0.9);
    text-shadow: 0px 0px 6px #fff;
    text-align: center;
    float: right;
    font-size: 30px;
    display: none
}

div#login div.content div.loginForm {
    border-radius: 4px;
    width: 390px;
    /* margin: 0 auto; */
    float: right;
    color: #fff;
    background: #fff;
    height: 334px;
    margin-right: 80px;
    right:20px;
    top:50%;
    margin-top:-167px;
    position: absolute
}

div#login div.content div.loginForm form.el-form {
    height: 100%;
    /* background: #292626; */
    padding: 20px 0 0px 0;
}

div#login div.content div.loginForm form.el-form input {
    border: 1px solid #888585;
    border-radius: 4px;
    width: 273px;
}

.userClass label {
    color: #fff;
    font-size: 18px;
}

.userClass input {
    box-shadow: 0px 0px 10px #fff;
    border: 1px solid #666;
}

.el-button--primary {
    color: #fff;
    background-color: #20a0ff;
    box-sizing: border-box;
    border: 1px solid #fff;
    width: 200px;
    border: none;
    border-radius: 4px;
}

.el-button--primary:hover {
    color: #fff;
}

button.forget_psd {
    margin-right: 20px;
    border-radius: 0;
    border: none;
    margin-top: 10px;
    float: right;
    margin-right: 42px;
    background: #fff;
    color: #000;
    cursor: pointer;
}

button.forget_psd:hover {
    background: #fff;
    color: #fff;
    border: none;
}

button.forget_psd span {
    color: rgba(102, 102, 102, 1);
}

button.forget_psd span:hover {
    text-decoration: underline;
}

.findPsdBtn {
    width: 120px;
    height: 50px;
}
.dialog-footer{text-align: left;padding-left:100px;}
.logo {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    display: none
}
button.confirm{background:#f87e2b;}
button.confirm:hover{background:rgba(248,126,43,0.9);}
button.confirm:focus{background:#f87e2b;}
button.cancle:hover{border: 1px solid rgb(248,126,43);
		color: rgb(248,126,43);}

.logo img {
    display: inline-block;
}


</style>

