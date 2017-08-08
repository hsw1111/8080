<template>
	<div>
		<div id="addaccount_form">
						<h1 id="addaccount_title">添加角色
              <span>
                <a href="/index/roleManager">
                  <i class="el-icon-close">
                  </i>
                </a>
              </span>
            </h1>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="角色名称" prop="roleName">
								<el-input v-model="ruleForm.roleName" placeholder='请输入角色名称'></el-input>
							</el-form-item>
							<el-form-item label="备注">
								<el-input type="textarea"></el-input>
							</el-form-item>
              <el-form-item>
                <el-tree
                  :data="data2"
                  :props="defaultProps"
                  show-checkbox
                  node-key="id"
                  :default-expand-all="false"
                  :expand-on-click-node="true">
                </el-tree>
              </el-form-item>
							<el-form-item>
								<el-button class='addaccount_button' type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
								<el-button class='addaccount_button' @click="$router.push({path:'/index/roleManager'})">取消</el-button>
							</el-form-item>
					</el-form>
			</div>
	</div>
</template>
<style scoped>

  @media screen and (min-width:1367px) {
    #addaccount_form {
      /*  适配好的样式 */
      height: 50%;
      overflow-y: scroll; 
      overflow-x: hidden;
      width: 50%;
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      position: fixed;
      display: block;
      top:62%;
      left:50%;
      margin-left:-28%;
      margin-top:-25%;  
      padding: 70px 80px 0 50px;
      margin-right: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 6px;
    }
  }

@media screen and (max-width:1367px) {
  #addaccount_form {
    height: 50%;
    width: 50%;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    position: fixed;
    display: block;
    top: 62%;
    left: 50%;
    overflow-y: scroll;
    margin-left: -34%;
    margin-top: -24%;
    padding: 80px 150px 60px 144px;
    margin-right: 20px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 6px;
  }
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
</style>
      
<script>
export default {
  data () {
    return {
      ruleForm: {
        roleName: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      data2: [{
        label: '加盟商管理',
        children: [{
          id: 1,
          label: '首页'
        }, {
          id: 2,
          label: '车辆管理'
        }, {
          label: '报表管理',
          children: [{
            id: 3,
            label: '消费数据'
          }, {
            id: 4,
            label: '24小时数据走势'
          }, {
            id: 5,
            label: '热力图'
          }, {
            id: 6,
            label: '异常数据'
          }]
        }, {
          id: 7,
          label: '合伙人管理'
        }, {
          label: '营收管理',
          children: [{
            id: 8,
            label: '收益明细'
          }, {
            id: 9,
            label: '结算记录'
          }]
        }, {
          id: 10,
          label: '账号管理'
        }, {
          id: 11,
          label: '个人中心'
        }, {
          id: 12,
          label: '角色管理'
        }, {
          id: 13,
          label: '信息中心'
        }, {
          label: '日志管理',
          children: [{
            id: 14,
            label: '登录日志'
          }, {
            id: 15,
            label: '操作日志'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认添加吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '信息有误',
            type: 'warning'
          })
        .then(() => {
          this.$router.push('/index/roleManager')
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
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
