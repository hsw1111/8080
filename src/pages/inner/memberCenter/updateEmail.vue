<template>
	<div>
		<div id="memberCenter_form" v-loading="loading" element-loading-text=" ">
						<h1 id="addaccount_title">修改邮箱
              <span>
                <a @click="$router.push('/index/memberCenter')">
                  <i class="el-icon-close">
                  </i>
                </a>
              </span>
            </h1>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
							<el-form-item label="邮箱" prop="maiAccount" style="width: 500px;">
								<el-input v-model="ruleForm.maiAccount" placeholder='请输入邮箱'></el-input>
							</el-form-item>
							<el-form-item label="账户密码" prop="account_password" style="width: 500px;">
								<el-input type='password' v-model="ruleForm.account_password" placeholder='为保障账号安全，您需要填写当前登录账号和密码'></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class='addaccount_button' type="primary" @click="handleBindEmail">立即修改</el-button>
								<el-button class='addaccount_button' @click="$router.push({path:'/index/memberCenter'})">取消</el-button>
							</el-form-item>
					</el-form>
			</div>
	</div>
</template>
<style>

  @media screen and (min-width:1367px) {
    #memberCenter_form {
      /*  适配好的样式 */
      height: 36%;
      /*overflow-y: scroll; 
      overflow-x: hidden;*/
      width: 30%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top:62%;
      left:50%;
      margin-left:-18%;
      margin-top:-25%;  
      padding: 70px 80px 0 30px;
      margin-right: 20px;
      border: 1px solid #ccc;
      overflow: hidden;
      background: #fff;
      border-radius: 2px;
    }
  }

  @media screen and (max-width:1367px) {
    #memberCenter_form {
      height: 40%;
      width: 30%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top: 62%;
      left: 50%;
      /*overflow-y: scroll;*/
      margin-left: -22%;
      margin-top: -24%;
      padding: 80px 150px 20px 40px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 2px;
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
    color: #666;
  }

.el-input__inner {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

.el-input__inner::-webkit-input-placeholder {
  color: #ddd;
}

.el-date-table td.current:not(.disabled), .el-date-table td.end-date, .el-date-table td.start-date {
  background: black !important;
  color: #fff !important;
}

.el-input__inner:hover {
  border: 1px solid #bbb;
} 

.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 7px;
  line-height: 1.5;
  width: 100%;
  color: #1f2d3d;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>
      
<script>
import {isEmail} from '../../../../utils/index.js'
import request from 'superagent'
import {host} from '../../../config/index'
export default {
  data () {
    var validateMail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        var res = isEmail(value)
        if (res === true) {
          return callback()
        } else {
          callback(new Error('邮箱格式不正确！！！'))
        }
      }, 1000)
    }
    return {
      ruleForm: {
        maiAccount: '',
        account_password: ''
      },
      loading: false,
      rules: {
        maiAccount: [
          {required: true, trigger: 'blur', validator: validateMail}
        ],
        account_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最短为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleBindEmail () {
      var that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // that.$alert('申请修改成功，已向您的邮箱' + that.ruleForm.maiAccount + '发送验证邮件，请注意查收', '修改邮箱', {
          //     confirmButtonText: '我知道了',
          //     callback: function (action) {
          //     }
          //   })
          that.loading = true
                request.post(host + 'franchisee/account/updateEmail4Fran')
                .send({id:1123339, email: that.ruleForm.maiAccount,pwd: that.ruleForm.account_password})
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
                        message: '恭喜你，修改邮箱成功',
                        type: 'success'
                      })
                    } else {
                      that.loading = false
                      that.$message({
                        message: 'sorry，修改邮箱失败',
                        type: 'error'
                      })
                    }
                  }
                })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>
