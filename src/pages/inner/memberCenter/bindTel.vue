<template>
	<div>
		<div id="memberCenter_form" v-loading="loading" element-loading-text="拼命加载中">
						<h1 id="addaccount_title">绑定手机号
              <span>
                <a @click="$router.push('/index/memberCenter')">
                  <i class="el-icon-close">
                  </i>
                </a>
              </span>
            </h1>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="手机号" prop="tel" style="width: 550px;">
								<el-input v-model="ruleForm.tel" placeholder='请输入手机号'></el-input>
                <el-button 
                  class="getVerCode"
                  @click="getVerCode(ruleForm.tel)"
                  :plain="isPlain"
                  :disabled="isDisabled"
                >
                  获取验证码
                </el-button>
							</el-form-item>
							<el-form-item label="验证码" prop="verificationCode" style="width: 500px;">
								<el-input v-model="ruleForm.verificationCode" placeholder='请输入手机收到的验证码'></el-input>
							</el-form-item>
							<el-form-item label="账户密码" prop="account_password" style="width: 500px;">
								<el-input type='password' v-model="ruleForm.account_password" placeholder='为保障账号安全，您需要填写当前登录账号和密码'></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class='addaccount_button' type="primary" @click="handleBindTel">立即绑定</el-button>
								<el-button class='addaccount_button' @click="$router.push({path:'/index/memberCenter'})">取消</el-button>
							</el-form-item>
					</el-form>
			</div>
	</div>
</template>
<style scoped>
  button.getVerCode{width:102px;}
  @media screen and (min-width:1367px) {
    #memberCenter_form {
      /*  适配好的样式 */
      height: 40%;
      /*overflow-y: scroll; 
      overflow-x: hidden;*/
      width: 40%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top:62%;
      left:50%;
      margin-left:-21%;
      margin-top:-25%;
      padding: 70px 10px 0 50px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 2px;
    }
  }

  @media screen and (max-width:1367px) {
    #memberCenter_form {
      height: 40%;
      width: 40%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top: 62%;
      left: 50%;
      /*overflow-y: scroll;*/
      margin-left: -22%;
      margin-top: -24%;
      padding: 80px 40px 60px 30px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 2px;
      overflow:hidden;
    }
  }

  .loading_class {
    background: rgba(68,68,68,0.4);
  }

	.addaccount_button:nth-of-type(1) {
		background: #f87e2b;
		border: none;
	}

	.addaccount_button:nth-of-type(1):hover {
		background: rgba(248,126,43,0.9);
	}


	.addaccount_button:nth-of-type(2):hover {
		border: 1px solid rgb(248,126,43);
		color: rgb(248,126,43);
	}

	.addaccount_button {
		width: 120px;
		height: 50px;
	}

	#addaccount_title {
    position: absolute;
    left: 0px;
    top: 0px;
    padding-left: 20px;
    width: 98%;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
    overflow-x: hidden;
    line-height: 40px;
    color: #444;
    border-bottom: 1px solid #eee;
	}

  #addaccount_title span {
		float: right;
		margin-right: 14px;
		cursor: pointer;
	}

  #addaccount_title span a:hover {
    color: #777;
  }

</style>
      
<script>
import {checkMobile, IsEmpty} from '../../../../utils/index.js'
import request from 'superagent'
import $ from 'jquery'
import {host} from '../../../config/index'
export default {
  data () {
    var validateTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }else {
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
    var validateVerCode = (rule,value,callback) => {
      if(!value) {
        return callback(new Error('验证码不能为空'))
      } else {
       callback()
      }
    }
    return {
      loading: false,
      isPlain:true,
      isDisabled:false,
      initText: '',
      ruleForm: {
        tel: '',
        verificationCode: '',
        account_password: '',
        verCode: ''
      },
      rules: {
        tel: [
          {required: true, trigger: 'blur', validator: validateTel}
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', validator: validateVerCode }
        ],
        account_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '请输入正确密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getVerCode (val) {
       var that = this
       var $btn = $('button.getVerCode')
       var text = $btn.text()
       this.initText = text
       var initTime = 60
      if(checkMobile(val)){
          this.isDisabled = true
          this.isPlain = false
           var timer = setInterval(function(){
              initTime--
              if(initTime<=0){
                that.isDisabled = false
                that.isPlain = true
                $btn.text(that.initText)
                clearInterval(timer)
                return
              }else {
                $btn.text(initTime + 's')
              }
          },1000)
          setTimeout(function(){
             that.$message({
              message: '已向您的手机发送验证码，请查收！！！',
              type: 'success'
            })
          },1000)
         
          request.post(host + 'franchisee/userCenter/getVerCode')
            .send({
              mobileNo: this.ruleForm.tel
            })
            .end(function(err,res){
              if(err) {
                console.log(err)
              } else {
                that.ruleForm.verCode = JSON.parse(res.text)
              }
          })
      }
    },
    handleBindTel () {
      var that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认绑定吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '信息有误',
            type: 'warning'
          })
        .then(() => {
          that.loading = true
          request.post(host + 'franchisee/userCenter/bindingPhone')
              .send({
                phoneNo: that.ruleForm.tel,
                verCode: that.ruleForm.verCode,
                pwd: that.ruleForm.account_password
              })
              .end((err, res) => {
                if (err) {
                  console.log(err)
                  that.loading = false
                  that.$router.push('/index/memberCenter')
                  that.$message({
                    message: 'sorry，服务器请求超时，请稍候再试',
                    type: 'error'
                  })
                } else {
                  var status = JSON.parse(res.text).code
                  if (status === 0) {
                    that.loading = false
                    that.$router.push('/index/memberCenter')
                    that.$message({
                      message: '恭喜你，绑定手机成功',
                      type: 'success'
                    })
                  } else {
                    that.loading = false
                    that.$message({
                      message: 'sorry，绑定手机失败',
                      type: 'error'
                    })
                  }
                }
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消绑定操作'
          })
        })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
