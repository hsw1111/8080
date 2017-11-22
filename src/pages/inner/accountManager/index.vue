<template>
  <div style="margin-right:20px;">
    <div v-title data-title="账号管理"></div>
    <div id="am_search">
      <label>
        <span>关键字</span>
        <input type="text" placeholder="用户名/姓名" v-on:blur="initQuery" v-model="accountOrUsername" class="account_my_input">
      </label>
      <label>
        <span>联系方式</span>
        <input type="text" placeholder="手机号/邮箱" v-on:blur="initQuery" v-model="telOrMail" class="account_my_input">
      </label>
      <el-button id="accountSearchBtn" @click="queryAccountInfo" class="timeSelect_button">查询</el-button>
    </div>

    <!-- account -->
    <div class="account">
      <h1>
        <button type="button" @click="addAccount">添加新账号</button>
        <!--新增数据开始-->
        <!--新增数据结束-->
      </h1>

      <!-- 表单 -->
      <el-table :data="tableData" :empty-text='emptyText' style="width: 100%; font-size:13px;" v-loading="loading" :element-loading-text="loadingText">
        <el-table-column prop="userName" label="用户名" min-width="140"></el-table-column>
        <el-table-column prop="phoneNo" label="手机号" min-width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="170"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色" min-width="120">
        </el-table-column>
        <el-table-column label="状态" min-width="120" style="font-size:12px;">
          <template scope="scope">
            <el-switch v-on:change="changeState(scope)" v-model="scope.row.status" on-text="启用" off-text="冻结" on-color="#13ce66" off-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="del" label="操作">
          <template scope="scope">
            <a href="javascript:;"></a>
            <i class="el-icon-edit" @click="openEdit(scope)" title="修改" style="margin-right:10px;"></i>
            </a>
            <i class="el-icon-close" title="删除" @click="openDelete(scope)"></i>
            <!--dialog 弹窗开始-->
            <el-dialog id="editAccount" title="账号信息" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
              <el-form class="editAccount" v-loading="loading2" :model="editAccount" :rules="editAccountRule" ref="editRuleForm">
                <el-form-item label="用户名" prop="userName" :label-width="formLabelWidth">
                  <el-input v-model="editAccount.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                  <el-input type="password" v-model="editAccount.passWord" placeholder='6-20位字符，可包括字母数字，区分大小写'></el-input>
                  <!-- <span class="tips">6-20位字符，可包括字母数字，区分大小写</span> -->
                </el-form-item>
                <el-form-item label="所属角色" prop="roleName">
                  <el-select v-model="editAccount.roleName" @change="changeRole" placeholder="选择角色类型" :remote-method="remoteMethod" remote :loading="isloading" :disabled="isDisabled">
                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                    <!--<el-option label="管理员" value="管理员"></el-option>-->
                    <!-- <el-option label="加盟商" value="加盟商"></el-option> -->
                    <!--<el-option label="合伙人" value="合伙人"></el-option>-->
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号" prop='phoneNo' :label-width="formLabelWidth">
                  <el-input v-model="editAccount.phoneNo"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop='email' :label-width="formLabelWidth">
                  <el-input v-model="editAccount.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop='name' :label-width="formLabelWidth">
                  <el-input v-model="editAccount.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop='description'>
                  <el-input type="textarea" style="width:340px" v-model="editAccount.description" placeholder="不超过200个字符"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer editfooter">
                <el-button class="accountMangerBtn" type="primary" @click="handleEditAccount">确定</el-button>
                <el-button class="accountMangerBtn" @click="cancleEdit">取消</el-button>
              </div>
            </el-dialog>
            <!--dialog 弹窗结束-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="pageShow" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper" :total="totalItems">
      </el-pagination>
    </div>

    <!--<div v-show='router_show' >-->
    <router-view id="account_router"></router-view>
    <!--</div>-->
  </div>
</template>

<script>
import $ from 'jquery'
import { checkPositiveNumber } from '../../../../utils/index.js'
import { getAllAccount } from '../../../api/getAllAccount.api'
import { modifyAccountState } from '../../../api/modifyAccountState.api'
import { delAccount } from '../../../api/delAccount.api'
import { updateAccount } from '../../../api/updateAccount.api'
import { host } from '../../../config/index'
import request from 'superagent'
export default {
  data() {
    return {
      recodeRoleId: '',
      recodeRoleName: '',
      options4: [],
      isloading: false,
      isDisabled: true,
      editLoading: false,
      loading2: false,
      isQuery: false,
      accountOrUsername: '',
      telOrMail: '',
      input: '',
      pageShow: false,
      emptyText: ' ',
      loadingText: ' ',
      currentPage: 1,
      totalItems: 1,
      totalPage: 1,
      tableData: [],
      initData: [],
      router_show: false,
      dialogVisible: false,
      totalPage: '',
      loading: false,
      formLabelWidth: '90px',
      editAccount: {
        userId: '',
        phoneNo: '',
        email: '',
        name: '',
        roleName: '',
        status: '',
        value: '',
        index: ''
      },
      editAccountRule: {
        userName: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        passWord: [{ required: true, trigger: 'blur', message: '请输入用密码' }],
      },
      isSearch: false
    }
  },
  methods: {
    changeRole(val) {
      this.options4.map((item) => {
        if (item.value === val) {
          this.recodeRoleName = val
          this.recodeRoleId = item.id;
        }
      })
    },
    cancleEdit() {
      this.dialogVisible = false
      this.$refs.editRuleForm.resetFields();
    },
    remoteMethod() {
      var that = this

      setTimeout(() => {

        request.post(host + 'beepartner/franchisee/User/findRole')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .end((error, res) => {
            if (error) {
              console.log(error)
              that.options4 = []
            } else {
              var rs = JSON.parse(res.text).data == null ? [] : JSON.parse(res.text).data
              var roles = rs.map((item) => {
                var obj = {}
                obj.value = item.roleName
                obj.label = item.roleName
                obj.id = item.id
                return obj
              })
              if (roles.length > 0) {
                that.isDisabled = false
                setTimeout(() => {
                  that.options4.map((item) => {
                    if (item.value == that.editAccount.roleName) {
                      that.recodeRoleId = item.id
                      that.recodeRoleName = item.value
                    }
                  })
                }, 200)
              } else {
                that.isDisabled = true
              }
              that.options4 = roles
            }
          })
      }, 200)
    },
    loadAccount() {
      var that = this
      getAllAccount({}, function(error, res) {
        if (error) {
          console.log(error)
          that.loading = false
          that.pageShow = false
          that.emptyText = '暂无数据'
        } else {
          that.loading = false
          that.totalPage = JSON.parse(res.text).totalPage
          var arr = JSON.parse(res.text).data || []
          if (that.totalPage > 1) {
            that.emptyText = ' '
            that.pageShow = true
          } else {
            that.emptyText = '暂无数据'
            that.pageShow = false
          }
          that.totalItems = Number(JSON.parse(res.text).totalItems)
          that.$store.state.accountMangerData = that.handleData(arr)
          that.initData = that.$store.state.accountMangerData
          that.tableData = that.$store.state.accountMangerData
          that.loading = false
          //that.setPage(arr,that.totalPage)
        }
      })
    },
    initQuery() {
      var that = this
      this.isQuery = false
      this.currentPage = 1
      if (this.accountOrUsername.trim().length === 0 && this.telOrMail.trim().length === 0 && this.isQuery === false) {
      this.isSearch = false
        getAllAccount({}, function(error, res) {
          if (error) {
            console.log(error)
            setTimeout(function() {
              that.loading = false
              that.loadingText = '服务器链接超时'
            }, 5000)
            setTimeout(function() {
              that.emptyText = '暂无数据'
            }, 6000)
          } else {
            that.loading = false
            that.totalPage = JSON.parse(res.text).totalPage
            var arr = JSON.parse(res.text).data
            if (that.totalPage > 1) {
              that.emptyText = ' '
              that.pageShow = true
            } else {
              that.emptyText = '暂无数据'
              that.pageShow = false
            }
            that.totalItems = Number(JSON.parse(res.text).totalItems)
            that.$store.state.accountMangerData = that.handleData(arr)
            that.initData = that.$store.state.accountMangerData
            that.tableData = that.$store.state.accountMangerData
            //that.setPage(arr,that.totalPage)
          }
        })
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    addAccount() {
      this.$router.push('/index/accountManager/addaccount')
      this.router_show = true
    },
    openEdit(scope) {
      if (scope.row.status === false) {
        this.$message({
          type: 'error',
          message: '账号已冻结，请解冻后再编辑'
        })
        return;
      }
      this.dialogVisible = true
      this.editAccount.id = scope.row.id
      this.editAccount.userName = scope.row.userName
      this.editAccount.email = scope.row.email
      this.editAccount.phoneNo = scope.row.phoneNo
      this.editAccount.description = scope.row.description
      this.editAccount.name = scope.row.name
      this.editAccount.status = scope.row.status
      this.editAccount.passWord = '********'
      this.editAccount.roleName = scope.row.roleName
      this.editAccount.index = scope.$index
      this.remoteMethod()
    },
    handleEditAccount() {
      var that = this
      var newAccountInfo = {}
      newAccountInfo.role = this.editAccount.role
      newAccountInfo.id = this.editAccount.id
      newAccountInfo.userName = this.editAccount.userName
      newAccountInfo.email = this.editAccount.email
      newAccountInfo.phoneNo = this.editAccount.phoneNo
      newAccountInfo.name = this.editAccount.name
      newAccountInfo.status = this.editAccount.status
      newAccountInfo.passWord = this.editAccount.passWord
      newAccountInfo.description = this.editAccount.description
      newAccountInfo.roleId = this.recodeRoleId;
      newAccountInfo.roleName = this.recodeRoleName;
      var index = this.editAccount.index
      this.$refs.editRuleForm.validate((valid) => {
       
        if (valid) {
          request.post(host + 'beepartner/franchisee/User/checkIsExistsUserName')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              userName: newAccountInfo.userName,
              id: newAccountInfo.id
            })
            .end((error, res) => {
              if (error) {
                console.log(error)
              } else {
                var code = JSON.parse(res.text).resultCode
                var message = JSON.parse(res.text).message
                if (code === 0) {
                  that.$message({
                    type: 'error',
                    message: message
                  })
                  that.loading = false
                  return;
                } else {
                  updateAccount(
                    {
                      id: newAccountInfo.id,
                      userName: newAccountInfo.userName,
                      name: newAccountInfo.name,
                      email: newAccountInfo.email,
                      phoneNo: newAccountInfo.phoneNo,
                      passWord: newAccountInfo.passWord,
                      description: newAccountInfo.description,
                      roleId: newAccountInfo.roleId
                    }, function(error, res) {
                      if (error) {
                        that.$message({
                          type: 'error',
                          message: 'sorry，修改信息失败！'
                        })
                      } else {
                        
                        var code = JSON.parse(res.text).resultCode
                        if (code === 1) {
                          that.$message({
                            type: 'success',
                            message: '恭喜您，修改成功！'
                          })
                           that.dialogVisible = false
                          that.tableData.splice(index, 1, newAccountInfo)
                        } else {
                          that.$message({
                            type: 'error',
                            message: 'sorry，修改信息失败！'
                          })
                        }
                      }
                    }
                  )
                }
              }
            })

        } else {
          console.log('error submit')
          return false
        }
      })

    },
    openDelete(scope) {
      var that = this
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.loading = true
        delAccount(
          {
            id: scope.row.id
          }, function(error, res) {
            if (error) {
              console.log(error)
              that.$message({
                type: 'error',
                message: '对不起，删除失败!'
              })
            } else {
              var code = JSON.parse(res.text).resultCode
              if (code === 1) {
                that.loading = false
                that.$message({
                  type: 'success',
                  message: '恭喜您，删除成功!'
                })
                that.tableData.splice(scope.$index, 1)
                if (that.tableData.length === 0) {
                  that.pageShow = false
                  that.emptyText = '暂无数据'
                }
              } else {
                that.loading = false
                that.$message({
                  type: 'error',
                  message: '对不起，删除失败!'
                })
              }
            }
          })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    changeState(scope) {

      var that = this
      this.loading = true
      modifyAccountState(
        {
          id: scope.row.id,
          status: scope.row.status === true ? 1 : 0
        }, function(error, res) {
          if (error) {
            console.log(error)
            that.$message({
              type: 'error',
              message: '对不起，修改失败'
            })
          } else {
            var code = JSON.parse(res.text).resultCode
            var message = JSON.parse(res.text).message
            if (code === 1) {
              that.$message({
                type: 'success',
                message: message
              })
              that.loading = false

              //that.loadAccount()
            } else {
              that.$message({
                type: 'error',
                message: message
              })
              that.loading = false
            }
          }
        }
      )
    },
    handleData(arr) {
      var res = arr.map((item) => {
        var obj = {}
        var status = null
        if (item.status === 1) {
          status = true
        } else {
          status = false
        }
        obj = Object.assign({}, item, { status: status })
        return obj
      })
      return res
    },
    queryAccountInfo() {
      this.isSearch = true
      this.isQuery = true
      var obj = {
        queryName: this.accountOrUsername,
        queryNumber: this.telOrMail
      }
      var that = this
      if (this.accountOrUsername.trim().length > 0 || this.telOrMail.trim().length > 0) {
        request.post(host + 'beepartner/franchisee/User/findFranchiseeUser')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send(obj)
          .end(function(error, res) {
            if (error) {
              console.log(error)
              that.loading = false
            } else {
              that.loading = false
              var newArr = JSON.parse(res.text).data
              that.totalPage = JSON.parse(res.text).totalPage
              if (that.totalPage > 1) {
                that.emptyText = ''
                that.pageShow = true
              } else {
                that.emptyText = '暂无数据'
                that.pageShow = false
              }
              that.totalItems = Number(JSON.parse(res.text).totalItems)
              that.tableData = that.handleData(newArr)
            }
          })
      } else {
        // this.$message({
        //   type: 'error',
        //   message:'请输入查询条件'
        // })
        that.loading = false
        this.tableData = this.initData
      }
    }
  },
  mounted() {

    this.currentPage = 1
    this.loadingText = '拼命加载中'
    this.loading = true
    this.loadAccount()
    $(".sign").removeClass('is-active')
    $('.sign[name="1500"]').addClass('is-active')
  },
  watch: {
    '$route': 'loadAccount',
    currentPage: {
      handler: function(val, oldVal) {
        var that = this
        this.loading = true
        if (this.isQuery === false) {
          getAllAccount({ currentPage: val }, function(error, res) {
            if (error) {
              console.log(error)
              that.loading = false
            } else {
              that.loading = false
              var arr = JSON.parse(res.text).data
              var totalPage = JSON.parse(res.text).totalPage
              if (totalPage > 1) {
                that.pageShow = true
                that.emptyText = ' '
              } else {
                that.pageShow = false
                that.emptyText = '暂无数据'
              }
              that.totalItems = Number(JSON.parse(res.text).totalItems)
              that.$store.state.accountMangerData = that.handleData(arr)
              that.tableData = that.$store.state.accountMangerData
            }
          })
        } else {
          request.post(host + 'beepartner/franchisee/User/findFranchiseeUser')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              currentPage: val,
              queryName: this.isSearch === false?'':this.accountOrUsername,
              queryNumber: this.isSearch === false?'':this.telOrMail
            })
            .end(function(error, res) {
              if (error) {
                console.log(error)
                that.loading = false
              } else {
                that.loading = false
                var newArr = JSON.parse(res.text).data
                var totalPage = JSON.parse(res.text).totalPage
                if (totalPage > 1) {
                  that.emptyText = ''
                  that.pageShow = true
                } else {
                  that.emptyText = '暂无数据'
                  that.pageShow = false
                }
                that.totalItems = Number(JSON.parse(res.text).totalItems)
                that.tableData = that.handleData(newArr)
              }
            })
        }
      },
      deep: true
    }
  },

}
</script>

<style scoped>
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
td,
tr,
th,
table,
thead,
tbody,
dl,
dt,
dd,
p,
span,
ul,
li,
ol {
  margin: 0;
  padding: 0;
}

body {
  background: #f2f2f2;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}



/*#account_router_cover {
  width: 100%;
  height: 100%;
  background: rgba(128,128,128,0.6);
  position: fixed;
  left: 0;
  top: 0;
}*/

#account_router {
  width: 100%;
  height: 100%;
  background: rgba(68, 68, 68, 0.6);
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}



/*#account_router {
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  height: 80%;
  margin-left: 10%;
  margin-top: 5%;
  width: 80%;
  z-index: 100;
  background: #f60;
  overflow: hidden;
}*/

div.account {
  /* width: 100%; */
  padding: 0 20px 10px 20px;
  background: #fff;
  margin-top: 20px;
  border: 1px solid #e7ecf1;
  border-bottom: none;
  padding-bottom:20px;
  /* padding-bottom: 100%; */
}

div.account>h1 {
  width: 90%;
  height: 68px;
  line-height: 55px;
}

div.account>h1 button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: none;
  outline: none;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  background: rgba(66, 66, 66, 0.8);
  transition: all .2s linear 0s;
}

div.account>h1 button:hover {
  background: rgb(66, 66, 66);
  cursor: pointer;
}

#am_search {
  width: 100%;
  height: 70px;
  background: #faebd7;
  border: 1px solid #e7ecf1;
}

.account_my_input {
  width: 140px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: inline-block;
  text-indent: 8px;
}

#am_search label {
  /* width: 190px; */
  height: 70px;
  line-height: 70px;
  margin-right: 10px;
  margin-left: 20px;
  float: left;
}

#am_search label span {
  line-height: 70px;
  font-weight: 400;
  font-size: 14px;
  display: block;
  margin-right: 10px;
  float: left;
  color:#555;
}

#am_search label:nth-child(2) {
  margin-left: 10px;
}

#am_search button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 17px 30px;
  float: right;
  padding: 10px 15px;
  border-radius: 4px;
}

#am_search button:hover {
  color: #20a0ff;
  border-color: #20a0ff;
}

.el-table__body,
.el-table__footer,
.el-table__header {
  border: 2px solid red;
}

#account_page {
  padding: 4px 10px 0 20px;
  padding-bottom: 100px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
  min-height: 230px;
}

.el-switch__label,
.el-switch__label * {
  font-size: 12px;
}

.el-icon-close,
.el-icon-edit {
  cursor: pointer
}

.el-dialog .dialogModal {
  background: rgba(0, 0, 0, .5)
}

.one {
  background: #f87e2b;
  border: none;
  width: 120px;
  height: 50px;
}

.two {
  background: #f87e2b;
  border: none;
  width: 120px;
  height: 50px;
}

.one:hover {
  background: rgba(248, 126, 43, 0.9);
  width: 120px;
  height: 50px;
}


.two:hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
  width: 120px;
  height: 50px;
}

button#accountSearchBtn {
  width: 80px;
  height: 36px;
  line-height: 13px;
  margin-right: 30px;
  color: #fff;
  font-size: 14px;
  outline: none;
  border: none;
  background: rgba(52, 52, 67, 0.8);
}

button#accountSearchBtn:hover {
  color: #fff;
  background: rgba(52, 52, 67, 1);
}

.accountMangerBtn {
  width: 120px;
  height: 50px;
}

.accountMangerBtn:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}

.accountMangerBtn:nth-of-type(1) {
  background: #f87e2b;
  border: none;
  color: #fff;
  margin-left: 170px;
}

.accountMangerBtn:nth-of-type(2) {
  background: #fff;
  color: #444;
  border: 1px solid rgba(196, 196, 196, 1)
}

.accountMangerBtn:nth-of-type(2):hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
}

div.addfooter,
div.editfooter {
  text-align: left;
  padding-left: 60px;
  margin-top: -43px;
  margin-bottom: 10px;
}

div.el-input {
  width: initial
}

.el-pagination {
  white-space: nowrap;
  /* padding: 2px 5px; */
  color: #48576a;
  padding-left: 30px;
  background: #fff;
  /* margin-left: 1px; */
  border-left: 1px solid #e7ecf1;
}

div.el-pagination {
  margin-left: 0;
  padding-left: 0;
  border-left: 0;
  margin-top: 20px;
  margin-bottom: 10px
}

div#eidtAccount div.el-dialog.el-dialog--small {
  top: 0
}
</style>
