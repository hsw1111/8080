<template>
  <div>
    <div id="addpartner_form">
      <h1 id="addpartner_title">添加合伙人
        <span>
          <a @click="go_back">
            <i class="el-icon-close"></i>
          </a>
        </span>
      </h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name" style="width: 300px;">
          <el-input v-model="ruleForm.name" placeholder='请输入姓名'></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" style="margin-top: -10px; width: 300px;">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="证件类别" prop="IDtype" style="margin-top: -10px;width: 300px;">
          <el-select v-model="ruleForm.IDtype" placeholder="请选择证件类别">
            <el-option label="居民身份证" value="居民身份证"></el-option>
            <el-option label="护照" value="护照"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="IDcard" style="width: 300px;">
          <el-input v-model="ruleForm.IDcard" placeholder='请输入证件号码'></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel" style="width: 300px;">
          <el-input v-model="ruleForm.tel" placeholder='请输入手机号'></el-input>
        </el-form-item>
        <el-form-item label="认购车辆数" prop="car" style="width: 300px;">
          <el-input v-model.number="ruleForm.car" placeholder='请输入车辆数(单位：/辆)'></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" style="width: 300px;">
          <el-input v-model="ruleForm.email" placeholder='请输入邮箱'></el-input>
        </el-form-item>
        <el-form-item label="通讯地址" prop="address" style="width: 300px;">
          <el-input v-model="ruleForm.address" placeholder='不超过100个字符'></el-input>
        </el-form-item >
        <el-form-item>
          <el-button class='addpartner_button' type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button class='addpartner_button' @click="$router.push({path:'/index/partnerManager'})">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
@media screen and (min-width:1367px) {
  #addpartner_form {
    min-height: 30%;
    width: 45%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    position: fixed;
    display: block;
    top: 54%;
    left: 53%;
    margin-left: -28%;
    margin-top: -27%;
    padding: 90px 80px 0px 50px;
    margin-right: 20px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 2px;
  }
}

@media screen and (max-width:1367px) {
  #addpartner_form {
    height: 78%;
    width: 50%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    position: fixed;
    display: block;
    overflow-y: scroll;
    top: 62%;
    left: 50%;
    margin-left: -34%;
    margin-top: -26.5%;
    padding: 70px 150px 0px 144px;
    margin-right: 20px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 2px;
  }
}

.addpartner_button:nth-of-type(1) {
  background: #f87e2b;
  border: none;
}

.addpartner_button:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}


.addpartner_button:nth-of-type(2):hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
}

.addpartner_button {
  width: 120px;
  height: 50px;
}

#addpartner_title {
  position: absolute;
  left: 0px;
  top: 0px;
  padding-left: 20px;
  width: 98%;
  height: 60px;
  line-height: 60px;
  color: #444;
  font-size: 24px;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  overflow: hidden;  
}

#addpartner_title span {
  float: right;
  margin-right: 14px;
  cursor: pointer;
  overflow: hidden;
}

#addpartner_title span a {
  margin-right: 20px;
  font-size: 18px;
  overflow: hidden;
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
import request from 'superagent'
import {isPassportNo,isCardNo} from '../../../../utils/index'
import {host} from '../../../config/index'
export default {
  data() {
    var validateIdCard = function (rule, val, callback) {
        if(!val){
          return callback(new Error('证件号不能为空'))
        }else {
          if(isPassportNo(val) === true||isCardNo(val) === true){
            return callback()
          }else {
            return callback(new Error('证件号错误'))
          }
        }
      }
    return {
      ruleForm: {
        name: '',
        sex: '男',
        IDtype: '',
        IDcard: '',
        tel: '',
        car: '',
        email: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // sex: [
        //   { message: '请选择性别', trigger: 'change' }
        // ],
        // IDtype: [
        //   { required: true, message: '请选择证件类型', trigger: 'change' }
        // ],
        // IDcard: [
        //   {required: true, validator:validateIdCard,trigger: 'blur' },
        // ],
        tel: [
          { type: 'string', required: true, message: '请填写手机号', trigger: 'blur' },
          { min: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        // car: [
        //   { type: 'number', required: true, message: '请填写车辆数', trigger: 'blur' }
        // ],
        // email: [
        //   { message: '请填写正确邮箱', trigger: 'blur' }
        // ],
        // address: [
        //   { message: '请填写通讯地址', trigger: 'blur' }
        // ]
      },
      fullscreenLoading: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

              var that = this
              request
                .post(host + 'franchisee/partner/add')
                .send({
                  'name': this.ruleForm.name,
                  'sex': this.ruleForm.sex,
                  // 'cardType': this.ruleForm.IDtype,
                  'idCard': this.ruleForm.IDcard,
                  'phoneNo': this.ruleForm.tel,
                  'bikeNum': this.ruleForm.car,
                  'email': this.ruleForm.email,
                  'address': this.ruleForm.address
                })
                .end((err, res) => {
                  if (err) {
                    console.log('err:' + err)
                    this.$message({
                      type:'error',
                      message: ' 请求失败，请稍候再试'
                    })
                  } else {
                    that.fullscreenLoading = true
                    setTimeout(function () {
                      that.fullscreenLoading = false
                      var obj = that.ruleForm
                      if (JSON.parse(res.text).code === 0) {
                        that.$store.commit('setPartnerList', {
                  'name': that.ruleForm.name,
                  'sex': that.ruleForm.sex,
                  // 'cardType': this.ruleForm.IDtype,
                  'idCard': that.ruleForm.IDcard,
                  'phoneNo': that.ruleForm.tel,
                  'bikeNum': that.ruleForm.car,
                  'email': that.ruleForm.email,
                  'address': that.ruleForm.address
                })
                        that.$router.push('/index/partnerManager')
                        that.$message({
                          type: 'success',
                          message: '添加成功'
                        })
                      } else {
                        that.$message({
                          type: 'error',
                          message: '添加失败，请联系🐝出行'
                        })
                      }
                    }, 600)
                  }
                })
            // })
            // .catch(() => {
            //   // this.$message({
            //   //   type: 'info',
            //   //   message: '已取消添加'
            //   // })
            // })
        } else {
          return false
        }
      })
    },
    go_back () {
      this.$router.push('/index/partnerManager')
    }
  },
  beforeMount () {
    this.$router.push('/index/partnerManager/addpartner')
  }
}
</script>
