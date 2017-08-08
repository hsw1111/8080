<template>
  <div style="margin-right:20px;">
    <div id="partner_header">
      <div class="partner_content">
        <label>
          <span>关键字</span>
          <input type="text" v-on:input='inputChange' v-model="searchDate1" class="partner_my_input" placeholder="姓名/证件号码">
        </label>
        <label>
          <span>联系方式</span>
          <input type="text" v-on:input='inputChange' v-model="searchDate2" class="partner_my_input" placeholder="手机号/邮箱">
        </label>
        <label>
          <span>认购车辆数</span>
          <el-select v-model="value">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input v-on:input='inputChange' placeholder="数量" v-model="search_Number"></el-input>
        </label>
        <el-button class="my_btn" @click="searchByInput">查询</el-button>
      </div>
    </div>
    <div id="partner_table">
      <div id="partner_add">
        <button @click="$router.push({path:'/index/partnerManager/addpartner'})">添加合伙人</button>
      </div>
      <el-table 
            :data="tableData" 
            style="width: 100% font-size:13px; color: #6c6c6c;"
            v-loading="loading2"
            :element-loading-text="loadText"
            :empty-text= 'emptyText'
            >
        <el-table-column prop="name" label="姓名" min-width="80">
        </el-table-column>
        <el-table-column prop="sex" label="性别" min-width="60">
        </el-table-column>
        <el-table-column prop="IDcard" label="证件号码" min-width="120">
        </el-table-column>
        <el-table-column prop="tel" label="手机号码" min-width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="140">
        </el-table-column>
        <el-table-column prop="cars" label="认购车辆数" min-width="80">
        </el-table-column>
        <el-table-column label="操作" prop="del">
          <template scope="scope">
            <a style="color:#444; margin-right:10px; cursor: pointer;" @click="goDetail(scope.row.partnerId)" title="查看">
              <i class="el-icon-document"></i>
            </a>
            <a href="javascript:;" @click="openEdit(scope.$index,scope.row, scope.row.partnerId)" style="color:#444; margin-right:10px;" title="编辑">
              <i class="el-icon-edit"></i>
            </a>
            <a href="javascript:;" @click='delPartner(scope.row.partnerId, scope.$index)' style="color:#444; margin-right:10px;" title="删除">
              <i class="el-icon-close"></i>
            </a>
            <!--dialog 弹窗开始-->
            <el-dialog title="合伙人信息" :visible.sync="dialogVisible" :modal="true" :modal-append-to-body="false">
              <el-form :model="editAccount" :rules="editRule" ref="editRuleForm">
                <el-form-item label="姓名" prop="name" :label-width="formLabelWidth" style="width: 300px;">
                  <el-input v-model="editAccount.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" style="width: 300px;">
                  <el-input v-model="editAccount.sex"></el-input>
                </el-form-item>
                <el-form-item label="证件号码" :label-width="formLabelWidth" style="width: 300px;">
                  <el-input v-model="editAccount.IDcard" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="tel" :label-width="formLabelWidth" style="width: 300px;">
                  <el-input v-model="editAccount.tel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" style="width: 300px;">
                  <el-input v-model="editAccount.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="车辆数" :label-width="formLabelWidth" style="width: 300px;">
                  <el-input v-model="editAccount.cars" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button class="partner_button" type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="editConfim(scope.row)">确定</el-button>
                <el-button class="partner_button" @click="dialogVisible = false">取消</el-button>
              </div>
            </el-dialog>
            <!--dialog 弹窗结束-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalItems"
        v-show="pageShow"
      >
     </el-pagination>  
    </div>
    <router-view id="partnerManager_router"></router-view>
  </div>
</template>

<style>
.el-pagination{
    margin-top: 20px;
    border-left: none;
    margin-left: 0;
    padding-left: 0;
    margin-bottom: 10px;}
#partnerManager_router {
  width: 100%;
  height: 100%;
  background: rgba(68, 68, 68, 0.6);
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}

#partner_header {
  /*width: 100%;*/
  height: 70px;
  background: #fff;
  border: 1px solid #e7ecf1;
  /*padding: 20px 30px 20px 30px;*/
}

#partner_header .partner_content {
  background: #fff;
  overflow: hidden;
}

#partner_header .partner_my_input {
  width: 140px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  border-radius: 4px;
  text-indent: 8px;
  border: 1px solid #ddd;
  display: inline-block;
}

#partner_header label:nth-of-type(1) {
  height: 70px;
  width: 200px;
  line-height: 70px;
  margin-left: 30px;
  margin-right: 20px;
  font-size: 14px;
  float: left;
}

#partner_header label:nth-of-type(1)>span {
  margin-right: 3px;
}

#partner_header label:nth-of-type(2) {
  height: 70px;
  font-size: 14px;
  width: 300px;
  line-height: 70px;
  margin-left: 20px;
  float: left;
}

#partner_header label:nth-of-type(2)>span {
  margin-right: 3px;
}

#partner_header label:nth-of-type(3) {
  height: 70px;
  width: 300px;
  font-size: 14px;
  line-height: 70px;
  margin-left: -50px;
  float: left;
}

#partner_header label:nth-of-type(3) .el-select>.el-input input {
  width: 95px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

#partner_header label:nth-of-type(3) .el-input {
  width: 80px;
  text-align: center;

}

#partner_header label:nth-of-type(3) .el-input input {
  border-radius: 4px;
  border: 1px solid #ddd;
}
#partner_table {
  padding: 0 30px 10px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-bottom: none;
  margin-top: 20px;
}

#partner_add {
  width: 90%;
  height: 68px;
  line-height: 68px;
}

#partner_add button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  background: rgba(66, 66, 66, 0.8);
  transition: all .2s linear 0s;
}

#partner_add button:hover {
  background: rgb(66, 66, 66);
  cursor: pointer;
}

#partner_page {
  padding: 4px 10px 0 20px;
  padding-bottom: 100px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
  min-height: 230px;
}

#partner_header .my_btn {
    width: 80px;
    float: right;
    height: 36px;
    line-height: 11px;
    margin-right: 30px;
    color: #fff;
    margin-top: 17px;
    outline: none;
    border: none;
    /* border-radius: 4px; */
    background: rgba(52,52,67, 0.8);
}

#partner_header .my_btn:hover {
    background: rgba(52,52,67, 0.9);
    color: #fff;
}

.partner_button:nth-of-type(1) {
  background: #f87e2b;
  border: none;
  color: #fff;
  margin-left: 70px;
}

.partner_button:nth-of-type(1):hover {
  background: rgba(248, 126, 43, 0.9);
}

.partner_button:nth-of-type(2) {
  background: #fff;
  color: #444;
  border: 1px solid rgba(196,196,196,1);
}

.partner_button:nth-of-type(2):hover {
  border: 1px solid rgb(248, 126, 43);
  color: rgb(248, 126, 43);
}

.partner_button {
  width: 120px;
  height: 50px;
  float: left;
  margin-top: -30px;
  margin-bottom: 20px;
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
</style>

<script>
  import $ from 'jquery'
  import request from 'superagent'
  import moment from 'moment'
  require('../../../assets/lib/js/jquery.pagination.js')
  import '../../../assets/css/pagination.css'
  import {host} from '../../../config/index'
export default {
  data() {
    return {
      editRule:{
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        tel: [{required: true,message: '请输入手机号', trigger: 'blur'}]
      },
      emptyText: ' ',
      isQuery: false,
      loadText: '拼命加载中',
      tableData: [],
      currentPage3: 1,
      totalItems: null,
      pageShow: false,
      options: [{
        value: '>',
        label: '>'
      }, {
        value: '<',
        label: '<'
      }, {
        value: '=',
        label: '='
      }, {
        value: '>=',
        label: '≥'
      }, {
        value: '<=',
        label: '≤'
      }],
      value: '',
      pagetotal: '',
      dialogVisible: false,
      formLabelWidth: '70px',
      editAccount: {
        name: '',
        sex: '',
        IDcard: '',
        tel: '',
        email: '',
        cars: '',
        id: ''
      },
      fullscreenLoading: false,
      searchDate1: '',
      searchDate2: '',
      search_Number: '',
      thisOpenId: '',
      loading2: false
    }
  },
  mounted() {
    this.mountedWay()
  },
  beforeUpdate() {
    var that = this
    $('.M-box').click('a', function (e) {
      // console.log(e)
      that.pageUpdate(e)
    })
  },
  beforeCreate () {
    this.$router.push('/index/partnerManager')
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    mountedWay () {
      this.loading2 = true
      var that = this
      request
        .post(host + 'franchisee/franchiseeManager/getPartners')
        .send({
          'franchiseeId': '123456',
          'userId': 'admin'
        })
        .end((err, res) => {
          if (err) {
            this.loading2 = false
            this.emptyText = '暂无数据'
            console.log('err:' + err)
          } else {
            // console.log(JSON.parse(res.text))
            var newArr = JSON.parse(res.text).list
            that.$store.state.partnerList = []
            newArr.map((item)=>{
              that.$store.commit('setPartnerList', item)
            })
            var pageNumber = JSON.parse(res.text).totalPage
            this.totalItems = JSON.parse(res.text).totalItems
            if(pageNumber>1){
              this.pageShow = true
            }else {
              this.pageShow = false
            }
            // loading关闭
            this.loading2 = false
            this.emptyText = ' '
            this.tableData = this.$store.state.partnerList
            this.pagetotal = pageNumber

          }
        })
    },
    partnerUpdate () {
      // this.loading2 = true
      // request
      //   .post(host + 'franchisee/franchiseeManager/getPartners')
      //   .send({
      //     'franchiseeId': '123456',
      //     'userId': 'admin'
      //   })
      //   .end((error, res) => {
      //     if (error) {
      //       console.log('error:', error)
      //     } else {
      //       // console.log(JSON.parse(res.text))
      //       var newArr = JSON.parse(res.text).list
      //       this.$store.dispatch('partner_action', { newArr })
      //       // loading关闭
      //       this.loading2 = true
      //       var pageNumber = JSON.parse(res.text).totalPage
      //       this.tableData = this.$store.state.partnerList
      //       this.totalPage = pageNumber
      //     }
      //   })
      this.tableData = this.$store.state.partnerList
    },
    delPartner(id, index) {
      this.$confirm('确定删除该合伙人吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request
          .post(host + 'franchisee/partner/delPartner')
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'id': id
          })
          .end((err, res) => {
            if (err) {
              console.log('err:' + err)
            } else {
              console.log(JSON.parse(res.text).code)
              console.log(JSON.parse(res.text).code === 0)
              if (JSON.parse(res.text).code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.$store.state.partnerList.splice(index, 1)
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败，请联系🐝出行'
                })
              }

            }
          })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
        return
      })
    },
    goDetail(id) {
      console.log(id)
      this.$router.push('/index/partnerManager/checkpartner/' + id)
    },
    openEdit(index,row, id) {
      console.log(row)
      this.thisOpenId = id
      this.dialogVisible = true
      this.editAccount.name = row.name
      this.editAccount.sex = row.sex
      this.editAccount.IDcard = row.IDcard
      this.editAccount.tel = row.tel
      this.editAccount.email = row.email
      this.editAccount.cars = row.cars
      this.editAccount.index = index
      console.log(index)
    },
    editConfim(row, id) {
      var that = this
      this.fullscreenLoading = true
      setTimeout(() => {
        that.fullscreenLoading = false
        var newAccountInfo = {}
        newAccountInfo.name = that.editAccount.name
        newAccountInfo.sex = that.editAccount.sex
        newAccountInfo.IDcard = that.editAccount.IDcard
        newAccountInfo.tel = that.editAccount.tel
        newAccountInfo.email = that.editAccount.email
        newAccountInfo.cars = that.editAccount.cars
        var index = that.editAccount.index
        request
          .post(host +'franchisee/partner/modifyPartner')
          .send({
            'name': newAccountInfo.name,
            'sex': newAccountInfo.sex,
            'idCard': newAccountInfo.IDcard,
            'phoneNo': newAccountInfo.tel,
            'email': newAccountInfo.email,
            'bikeNum': newAccountInfo.cars,
            'id': this.thisOpenId
          })
          .end((err, res) => {
            if (err) {
              console.log('err:' + err)
            } else {
              console.log(res)
              console.log(res.text)
              if (JSON.parse(res.text).code === 0) {
                this.$message({
                  message: '恭喜你，这是一条成功消息',
                  type: 'success'
                })
                that.$store.state.partnerList.splice(index, 1, newAccountInfo)
                that.dialogVisible = false
              } else {
                this.$message.error('出问题了，请重试')
              }
            }
          })
      }, 500)
    },
    searchByInput () {
      this.isQuery = true
      if (this.searchDate1 === '' && this.searchDate2 === '' && this.search_Number === '') {
        this.$message({
          message: '请输入查询信息',
          type: 'warning'
        })
      } else {
          this.loading2 = true
          request
            .post(host + 'franchisee/partner/queryPartner')
            .send({
              'name': this.searchDate1?this.searchDate1:null,
              'phone': this.searchDate2?this.searchDate2:null,
              'symbol': this.value?this.value:null,
              'num': this.search_Number?this.search_Number:0
            })
            .end((err, res) => {
              if (err) {
                console.log('err:' + err)
              } else {
                console.log(JSON.parse(res.text))
                var newArr = JSON.parse(res.text).list
                this.$store.state.partnerList = []
                newArr.map((item) => {
                  this.$store.commit('setPartnerList', item)
                })
                this.tableData = this.$store.state.partnerList
                var pageNumber = JSON.parse(res.text).totalPage
                this.totalItems = JSON.parse(res.text).totalItems
                // loading关闭
                this.loading2 = false
                if (pageNumber > 1) {
                  this.pageShow = true
                } else {
                  this.pageShow = false
                }
              }
            })
      }
    },
    inputChange () {
      if(this.searchDate1 === '' && this.searchDate2 === '' && this.search_Number === ''){
        this.isQuery =  false
        this.currentPage3 = 1
        this.mountedWay()
      }else {
        return
      }
    }
  },
  watch: {
    '$store.state.partnerList': 'partnerUpdate',
    currentPage3: {
      handler: function(val,oldVal){
         if (this.isQuery===false){
             request
              .post(host + 'franchisee/franchiseeManager/getPartners?page=' + val)
              .send({
                'franchiseeId': '123456',
                'userId': 'admin'
              })
              .end((err, res) => {
                if (err) {
                  console.log('err:' + err)
                } else {
                  // console.log(JSON.parse(res.text))
                  var newArr = JSON.parse(res.text).list
                  this.$store.state.partnerList = []
                  newArr.map((item) =>{
                    this.$store.commit('setPartnerList', item)
                  })
                  var pageNumber = JSON.parse(res.text).totalPage
                  this.totalItems = JSON.parse(res.text).totalItems
                  if(pageNumber>1){
                    this.pageShow = true
                  }else {
                    this.pageShow = false
                  }
                  // loading关闭
                  this.loading2 = false
                  this.tableData = this.$store.state.partnerList
                  this.pagetotal = pageNumber

                }
              })
         }else {
            request
            .post(host + 'franchisee/partner/queryPartner?page=' + val)
            .send({
              'name': this.searchDate1?this.searchDate1:null,
              'phone': this.searchDate2?this.searchDate2:null,
              'symbol': this.value?this.value:null,
              'num': this.search_Number?this.search_Number:0
            })
            .end((err, res) => {
              if (err) {
                console.log('err:' + err)
              } else {
                // console.log(JSON.parse(res.text))
                var newArr = JSON.parse(res.text).list
                this.$store.state.partnerList = []
                newArr.map((item) =>{
                  this.$store.commit('setPartnerList', item)
                })
                var pageNumber = JSON.parse(res.text).totalPage
                this.totalItems = JSON.parse(res.text).totalItems
                if(pageNumber>1){
                  this.pageShow = true
                }else {
                  this.pageShow = false
                }
                // loading关闭
                this.loading2 = false
                this.tableData = this.$store.state.partnerList
                this.pagetotal = pageNumber

              }
            })
         }
      },
      deep: true
    }
  }
}
</script>
