<template>
  <div>
    <div id="bg">
      <img src="../../assets/img/1.jpg">
    </div>
  
    <div id="cover">
  
    </div>
  
    <div>
  
      <div id="login-con">
        <h1>
          <img src="../../assets/img/footer.png">
        </h1>
        <span>蜜蜂出行加盟商管理平台</span>
        <div class="loginForm">
          <el-form  label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign">
            <el-form-item prop="username" label="用户名">
              <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" autofocus="autofocus" tabindex="1"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="formLabelAlign.password" @keyup.enter.native="handleEnter" type="password" placeholder="请输入密码" tabindex="2"></el-input>
            </el-form-item>
            <div class="button-group">
              <el-button class="login" type="primary" name="username"  @click="handleSubmit">登录</el-button>
              <el-button class="forget_psd" type="danger" name="password">忘记密码</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
html,
body {
  background: url('../../assets/img/bg-login.png') repeat-y;
  overflow-y: hidden;
}

#bg {
  position: fixed;
  left: -272px;
  top: -8px;
}

#bg img {
  width: 100%;
}

#cover {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

#login-con {
  width: 400px;
  float: right;
  /* border: 1px solid #ffc722; */
  border: 1px solid #fff; 
  border-radius: 11px;
  padding: 32px;
  box-shadow: 0px 0px 4px #FFFFFF, 0px 0px 4px #FFFFFF inset;
}

#login-con>h1 img {
  margin-left: 152px;
}

#login-con>span {
  color: #ffc722;
  font-size: 30px;
  font-weight: bolder;
  font-family: "华文彩云";
  margin-left: 148px;
}

#doc-ipt-email-1,
#doc-ipt-pwd-1 {
  border-radius: 5px;
  box-shadow: 1px 0px 3px #FFFFFF, -1px 0px 15px #FFFFFF;
}

#btn {
  font-size: 18px;
  font-family: "微软雅黑";
  font-weight: bolder;
  box-shadow: 0px 0px 12px #FFFFFF, 0px 0px 6px #FFFFFD;
}
</style>

<script>
  import request from 'superagent'
  export default {
    data () {
      return {
        formLabelAlign: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '用户名为英文数字下划线', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 17 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        request
          .post('http://localhost:3000/login')
          .send({ 'username': this.formLabelAlign.username, 'password': this.formLabelAlign.password })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              if (res.text.trim() === '登录成功') {
                this.$router.push('/index')
              }
            }
          })
      },
      handleEnter () {
        this.handleSubmit()
      }
    }
  }
</script>
