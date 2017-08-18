<template>
  <div class="carManager" style="margin-right: 20px;">
    <div v-title>车辆管理</div>
    <div class="carManager_content">
      <div class="queryCarInfo">
        <el-form :model="form">
          <el-row>
            <el-col>
              <el-form-item class="filtercar">
                <span class="labelAlign">关键字</span>
                <input v-model="terminalNumber" v-on:input='inputChange' class="carMan_bar" placeholder="车辆号\终端编号">
              </el-form-item>
              <el-form-item class="filtercar">
                <span class="labelAlign">状态</span>
                <el-checkbox-group v-model="checkList" style="width: 400px;">
                  <el-checkbox label="4">待出租</el-checkbox>
                  <el-checkbox label="5">已预订</el-checkbox>
                  <el-checkbox label="6">已出租</el-checkbox>
                  <el-checkbox label="7">维护中</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <span class="labelAlign">上线日期</span>
                <el-date-picker v-model='form.data1' type="date" placeholder="选择日期"></el-date-picker>
                <span class="division">至</span>
                <el-date-picker v-model='form.data2' type="date" placeholder="选择日期"></el-date-picker>
                <el-button class="my_btn" @click="searchByTimeline">查询</el-button>
                <!--<button @click='searchByTimeline'>查询</button>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="showCarInfo">
  
      <el-table :data="tableData" style="width: 100% font-size:13px; color: #6c6c6c;" v-loading="loading2" element-loading-text="拼命加载中" :empty-text='emptyText'>
        <el-table-column min-width="80" label="车辆号" prop='bikeCode'>
          <template scope="scope">
            <!-- <a>{{scope.row.bikeCode}}</a> -->
            <router-link style="color:rgb(118, 103, 233); text-decoration: none;" target='_blank' v-bind:to="{path:'/index/carManager/carUseDetail', query: {code:scope.row.bikeCode}}">{{scope.row.bikeCode}}</router-link>
            <!-- <a @click="$router.push({path:'/carUseDetail', query: {code:scope.row.bikeCode}})">{{scope.row.bikeCode}}</a>  -->
          </template>
        </el-table-column>
        <el-table-column prop="boxCode" label="终端编号" min-width="90">
        </el-table-column>
        <el-table-column prop="onlineTime" label="上线日期" min-width="120">
        </el-table-column>
        <el-table-column prop="stateName" label="车辆状态" min-width="80">
        </el-table-column>
        <el-table-column prop="location" label="车辆位置">
        </el-table-column>
      </el-table>
      <el-pagination v-show="pageShow" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10" layout="prev, pager, next, jumper" :total="totalItems">
      </el-pagination>
    </div>
    <!-- <div id="carManager_page">
        <div class="M-box"></div>
      </div> -->
  </div>
</template>
<script>
import request from 'superagent'
import moment from 'moment'
import $ from 'jquery'
// import Vue from 'vue'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
import { host } from '../../../config/index.js'
export default {
  data: function () {
    return {
      emptyText: ' ',
      form: {
        radio: '',
        data1: '',
        data2: ''
      },
      isQuery: false,
      totalItems: 1,
      pageShow: false,
      currentPage3: 1,
      tableData: [],
      timer: null,
      checkList: [],
      pagetotal: '',
      terminalNumber: '',
      noDate: false,
      loading2: false
    }
  },
  mounted: function () {
    this.mountedWay()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleList() {
      var radio = this.checkList.toString()
      var startTime, endTime
      if (this.form.data1 === '' || this.form.data2 === '') {
        startTime = ''
        endTime = ''
      } else {
        startTime = moment(this.form.data1).format('YYYY-MM-DD')
        endTime = moment(this.form.data2).format('YYYY-MM-DD')
      }
      // 根据用户选择不同状态进行数据的筛选
      this.isQuery = true
      if (this.checkList.length > 0) {
        this.loading2 = true
        this.emptyText = ' '
        request
          .post(host + 'beepartner/franchisee/bike/findBike')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'startOnlineTime': startTime,
            'endOnlineTime': endTime,
            'bikeState': radio,
            'keyName': this.terminalNumber
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
               this.loading2 = false
               this.emptyText = '暂无数据'
            } else {
               this.loading2 = false
              var data = (JSON.parse(res.text)).data
              var newData = this.tableDataDel(data)
              this.pagetotal = (JSON.parse(res.text)).totalPage
              if (this.pagetotal > 1) {
                this.pageShow = true
              } else {
                this.pageShow = false
                this.emptyText = ' 暂无数据'
              }
              this.totalItems = Number(JSON.parse((JSON.parse(res.text)).totalItems))
              // loading 关闭
              this.loading2 = false
              this.tableData = newData
              this.currentPage3 = 1
            }
          })
      } else {
        this.isQuery = false
        this.currentPage3 = 1
         this.loading2 = true
        request
          .post(host + 'beepartner/franchisee/bike/findBike')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'startOnlineTime': startTime,
            'endOnlineTime': endTime,
            'bikeState': radio,
            'keyName': this.terminalNumber
          })
          .end((error, res) => {
            if (error) {
              this.loading2 = false
              this.emptyText = '暂无数据'
              console.log('error:', error)
               this.loading2 = false
            } else {
               this.loading2 = false
              var data = JSON.parse(res.text).data
              var newData = this.tableDataDel(data)
              this.pagetotal = (JSON.parse(res.text)).totalPage
              this.tableData = newData
              this.totalItems = Number((JSON.parse(res.text)).totalItems)
              // loading 关闭
              this.loading2 = false
              if (this.pagetotal > 1) {
                this.pageShow = true
              } else {
                this.emptyText = '暂无数据'
                return
              }
            }
          })
      }

    },
    searchByTimeline() {
      var that = this
      if (this.terminalNumber === '' && this.form.data1 === '' && this.form.data2 === '' && this.checkList.length === 0) {
        this.$message({
          message: '请输入查询条件',
          type: 'warning'
        })
      } else {
        this.isQuery = true
        var startTime, endTime
        if (this.form.data1 === '' || this.form.data2 === '') {
          startTime = null
          endTime = null
        } else {
          startTime = moment(this.form.data1).format('YYYY-MM-DD')
          endTime = moment(this.form.data2).format('YYYY-MM-DD')
        }
        var radio = this.checkList.toString()
        var _startTime = new Date(this.form.data1).getTime()
        var _endTime = new Date(this.form.data2).getTime()
        _endTime = isNaN(_endTime) ? 0 : _endTime
        _startTime = isNaN(_startTime) ? 0 : _startTime
        console.log(_endTime, _startTime)
        if (_endTime > _startTime) {
          if (_endTime > 1 && _startTime <= 1) {
            this.$message({
              type: 'error',
              message: '开始日期不能为空'
            })
          } else {
            this.loading2 = true
            request
              .post(host + 'beepartner/franchisee/bike/findBike')
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                'startOnlineTime': startTime,
                'endOnlineTime': endTime,
                'bikeState': radio,
                'keyName': this.terminalNumber
              })
              .end((error, res) => {
                if (error) {
                  this.loading2 = false
                  this.emptyText = '暂无数据'
                  console.log('error:', error)
                } else {
                  var data = JSON.parse(res.text).data
                  var newData = this.tableDataDel(data)
                  this.pagetotal = (JSON.parse(res.text)).totalPage
                  this.tableData = newData
                  this.totalItems = Number(JSON.parse((JSON.parse(res.text)).totalItems))
                  // loading 关闭
                  this.loading2 = false
                  if (this.pagetotal > 1) {
                    this.pageShow = true
                  } else {
                    this.emptyText = '暂无数据'
                    this.pageShow = false
                    return
                  }
                }
              })
          }
        } else {
          if (_endTime < _startTime) {
            this.$message({
              type: 'error',
              message: '开始日期不能大于结束日期'
            })
          } else {
            request
              .post(host + 'beepartner/franchisee/bike/findBike')
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                'startOnlineTime': startTime,
                'endOnlineTime': endTime,
                'bikeState': radio,
                'keyName': this.terminalNumber
              })
              .end((error, res) => {
                if (error) {
                  this.loading2 = false
                  this.emptyText = '暂无数据'
                  console.log('error:', error)
                } else {
                  var data = JSON.parse(res.text).data
                  var newData = this.tableDataDel(data)
                  this.pagetotal = (JSON.parse(res.text)).totalPage
                  this.tableData = newData
                  this.totalItems = (JSON.parse(res.text)).totalItems
                  // loading 关闭
                  this.loading2 = false
                  if (this.pagetotal > 1) {
                    this.pageShow = true
                  } else {
                    this.emptyText = '暂无数据'
                    this.pageShow = false
                    return
                  }
                }
              })
          }

        }
        return
      }
    },
    tableDataDel(arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.bikeCode = arr[i].code
        obj.boxCode = arr[i].boxCode
        obj.onlineTime = arr[i].onlineTimeStr
        obj.stateName = arr[i].stateName
        obj.location = arr[i].location

        arrDeled.push(obj)
      }

      // console.log('arrDeled:', arrDeled)
      return arrDeled
    },
    inputChange() {
      if (this.form.data1 === '' && this.form.data2 === '' && this.terminalNumber === '' && this.checkList.length === 0) {
        this.isQuery = false
        this.mountedWay()
      } else {
        this.isQuery = true
        var startTime = null
        var endTime = null
        if (this.form.data1 === '' || this.form.data2 === '') {
          startTime = ''
          endTime = ''
        } else {
          startTime = moment(this.form.data1).format('YYYY-MM-DD')
          endTime = moment(this.form.data2).format('YYYY-MM-DD')
        }

        var radio = this.checkList.toString()
        request
          .post(host + 'beepartner/franchisee/bike/findBike')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'startOnlineTime': startTime,
            'endOnlineTime': endTime,
            'bikeState': radio,
            'keyName': this.terminalNumber
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(JSON.parse(res.text).data)
              var data = (JSON.parse(res.text)).data
              var newData = this.tableDataDel(data)
              this.pagetotal = (JSON.parse(res.text)).totalPage
              this.totalItems = Number(JSON.parse((JSON.parse(res.text)).totalItems))
              // loading 关闭
              this.loading2 = false
              this.tableData = newData
              if (this.pagetotal > 1) {
                this.pageShow = true
              } else {
                this.pageShow = false
                return
              }
            }
          })
        return
      }
    },
    mountedWay() {
      this.loading2 = true
      var startTime, endTime
      if (this.form.data1 === '' || this.form.data2 === '') {
        startTime = ''
        endTime = ''
      } else {
        startTime = moment(this.form.data1).format('YYYY-MM-DD')
        endTime = moment(this.form.data2).format('YYYY-MM-DD')
      }
      request
        .post(host + 'beepartner/franchisee/bike/findBike')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'startOnlineTime': startTime,
          'endOnlineTime': endTime,
          'bikeState': this.checkList.toString(),
          'keyName': this.terminalNumber
        })
        .end((error, res) => {
          if (error) {
            this.loading2 = false
            this.emptyText = '暂无数据'
            console.log('error:', error)
          } else {
            var data = JSON.parse((res.text)).data
            var newData = this.tableDataDel(data)
            this.pagetotal = JSON.parse((res.text)).totalPage
            this.tableData = newData
            this.totalItems = Number(JSON.parse((JSON.parse(res.text)).totalItems))
            // loading 关闭
            this.loading2 = false
            if (this.pagetotal > 1) {
              this.pageShow = true
            } else {
              this.emptyText = '暂无数据'
              return
            }
          }
        })
    }
  },
  watch: {
    'checkList': 'handleList',
    currentPage3: {
      handler: function (val, oldVal) {
        this.loading2  = true
        var startTime = null
        var endTime = null
        if (this.form.data1 === '' || this.form.data2 === '') {
          startTime = null
          endTime = null
        } else {
          startTime = moment(this.form.data1).format('YYYY-MM-DD')
          endTime = moment(this.form.data2).format('YYYY-MM-DD')
        }
        if (this.isQuery === true) {
          var radio = this.checkList.toString()
          //return
          request
            .post(host + 'beepartner/franchisee/bike/findBike')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              'startOnlineTime': startTime,
              'endOnlineTime': endTime,
              'bikeState': radio,
              'keyName': this.terminalNumber,
              'currentPage': this.currentPage3
            })
            .end((error, res) => {
              if (error) {
                console.log('error:', error)
                this.loading2 = false
              } else {
                console.log(JSON.parse(res.text).data)
                var data = (JSON.parse(res.text)).data
                var newData = this.tableDataDel(data)
                // loading 关闭
                this.loading2 = false
                this.tableData = newData
              }
            })
        } else {
          request
            .post(host + 'beepartner/franchisee/bike/findBike')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
            .send({
              'startOnlineTime': startTime,
              'endOnlineTime': endTime,
              'bikeState': radio,
              'keyName': this.terminalNumber,
              'currentPage': this.currentPage3
            })
            .end((error, res) => {
              if (error) {
                console.log('error:', error)
                this.loading2 = false
              } else {
                this.loading2 = false
                var data = (JSON.parse(res.text)).data
                var newData = this.tableDataDel(data)
                this.tableData = newData
              }
            })
        }
      },
      deep: true
    },
    "form.data1": {
      handler: function (val, oldVal) {
        if (val.toString().length === 0 && this.form.data2.toString().length === 0 && this.terminalNumber.length === 0 && this.checkList.length === 0) {
          this.mountedWay()
        }
        var startTime = new Date(val).getTime()
        var endTime = new Date(this.form.data2).getTime()
        endTime = isNaN(endTime) ? 0 : endTime
        console.log(endTime.toString().length)
        if ((startTime > endTime) && endTime.toString().length > 1) {
          this.$message({
            type: 'error',
            message: '开始日期不能大于结束日期'
          })
        } else if ((startTime > endTime) && endTime.toString().length === 1) {
          this.$message({
            type: 'error',
            message: '请输入结束日期'
          })
        } else {
          return
        }
      },
      deep: true
    },
    "form.data2": {
      handler: function (val, oldVal) {
        if (val.toString().length === 0 && this.form.data1.toString().length === 0 && this.terminalNumber.length === 0 && this.checkList.length === 0) {
          this.mountedWay()
        }
        var endTime = new Date(val).getTime()
        var startTime = new Date(this.form.data1).getTime()
        startTime = isNaN(startTime) ? 0 : startTime
        console.log(startTime.toString().length)
        if ((endTime < startTime) && startTime.toString().length > 1) {
          this.$message({
            type: 'error',
            message: '开始日期不能大于结束日期'
          })
        } else if ((endTime > startTime) && startTime.toString().length === 1) {
          this.$message({
            type: 'error',
            message: '开始日期不能为空'
          })
        } else {
          return
        }
      },
      deep: true
    }
  }
}
</script>
<style>
.carManager_content {
  background: #fff;
  padding: 20px 30px 5px 30px;
  margin-bottom: 20px;
  border: 1px solid #e7ecf1;
}


/*div.carManager div.queryCarInfo {
  background: #f3f0f0;
  padding: 10px 10px 0 10px;
}*/

div.carManager div.queryCarInfo div.el-form-item {
  margin-bottom: 10px;
}

div.carManager div.queryCarInfo div.el-form-item span.labelAlign {
  float: left;
  width: 68px;
  display: block;
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  color: #555;
}

span.division {
  font-size: 14px;
  color: #555;
  width: 32px;
  display: inline-block;
  text-align: center;
}

div.filtercar {
  display: inline-block;
}

div.line {
  margin-left: 0px;
}

div.el-input {
  width: 200px;
}

div.showCarInfo {
  padding: 20px 30px 10px 30px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-bottom: none;
}

div#carManager_page {
  padding: 4px 10px 0 22px;
  /* padding-bottom: 100px; */
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
  min-height: 304px;
}

.carMan_bar {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  width: 427px;
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
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.my_btn {
  width: 80px;
  float: right;
  height: 36px;
  line-height: 11px;
  color: #fff;
  /*margin-top: 10px;*/
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: rgba(52, 52, 67, 0.8);
}

.my_btn:hover {
  background: rgba(52, 52, 67, 0.9);
  color: #fff !important;
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
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.el-date-table td.current:not(.disabled),
.el-date-table td.end-date,
.el-date-table td.start-date {
  background: black !important;
  color: #fff !important;
}

.el-input__inner:hover {
  border: 1px solid #bbb;
}

.el-button:focus,
.el-button:hover {
  color: #fff;
}

.datashow {
  /* width: 100%; */
  height: 60px;
  line-height: 60px;
  border: 1px solid #dfe6ec;
  border-top: none;
}

.datashow p {
  text-align: center;
  color: #5e7382;
}

.el-checkbox__inner {
  border-color: #ddd !important;
}

.el-checkbox__inner:hover {
  border-color: #ddd !important;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #444;
  border-color: #888;
  color: #fff;
}

div.carManager .el-form-item__content .el-input input.el-input__inner {
  width: 194px;
}

.el-pagination {
  margin-left: 0;
  padding-left: 0;
  margin-top: 20px;
  margin-bottom: 10px;
  border-left: 0;
}
</style>
