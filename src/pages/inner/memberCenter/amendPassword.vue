<template>
	<div>
		<div id="memberCenter_form" v-loading="loading" element-loading-text="拼命加载中">
						<h1 id="addaccount_title">修改密码
              <span>
                <a @click="$router.push('/index/memberCenter')">
                  <i class="el-icon-close">
                  </i>
                </a>
              </span>
            </h1>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="原始密码" prop="oldPassword" style="width: 500px;">
								<el-input type="password" v-model="ruleForm.oldPassword" placeholder='请输入原密码'></el-input>
							</el-form-item>
							<el-form-item label="新密码" prop="pass" style="width: 500px;">
								<el-input type="password" v-model="ruleForm.pass" placeholder='密码为6-20位字符，可包含字母、数字、下划线'></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="checkPass" style="width: 500px;">
								<el-input type='password' v-model="ruleForm.checkPass" placeholder='确认密码'></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class='addaccount_button' type="primary" @click="modifyPass">立刻修改</el-button>
								<el-button class='addaccount_button' @click="$router.push({path:'/index/memberCenter'})">取消</el-button>
							</el-form-item>
					</el-form>
			</div>
	</div>
</template>
<style scoped>

  @media screen and (min-width:1367px) {
    #memberCenter_form {
      /*  适配好的样式 */
      height: 36%;
      /*overflow-y: scroll; 
      overflow-x: hidden;*/
      width: 36%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top:62%;
      left:50%;
      margin-left:-20%;
      margin-top:-25%;  
      padding: 70px 80px 0 50px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 2px;
    }
  }

  @media screen and (max-width:1367px) {
    #memberCenter_form {
      height: 36%;
      width: 40%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top: 62%;
      left: 50%;
      /*overflow-y: scroll;*/
      overflow: hidden;
      margin-left: -20%;
      margin-top: -20%;
      padding: 80px 40px 60px 20px;
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
    color: #777;
  }
</style>
      
<script>
import request from 'superagent'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        oldPassword: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
            { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    modifyPass () {
      var that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认修改吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '信息有误',
            type: 'warning'
          })
        .then(() => {
          that.loading = true
          setTimeout(() => {
            request.post(host + 'franchisee/userCenter/modifyPwd')
              .send({id: 1123339, oldPwd: this.ruleForm.pass, newPwd: this.ruleForm.checkPass})
              .end((err, res) => {
                if (err) {
                  console.log(err)
                  that.loading = false
                  that.$message.error('sorry,服务器请求超时，请稍候再试！')
                  that.$router.push('./')
                } else {
                  var status = Number(JSON.parse(res.text).code)
                  var cbText = JSON.parse(res.text).data
                  if (status !== 0) {
                    that.loading = false
                    this.$message.error('sorry,修改密码失败' )
                  } else {
                    that.loading = false
                    that.$message({
                      message: '恭喜你，密码修改成功',
                      type: 'success'
                    })
                    that.$router.push('./')
                  }
                }
              })
          }, 1000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '修改已取消！'
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
