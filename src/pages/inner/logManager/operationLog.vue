<template>
  <div class="operationlog">
    <el-tabs type="border-card" v-model="active" @tab-click="handleClickTab">
      <!-- <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-date"></i>平台</span>
       <el-row class="querybar">
         <el-form :inline="true" v-bind:model="form_plat">
           <el-form-item label="关键字：">
             <el-input v-model="form_plat.keyword"></el-input>
           </el-form-item>
           <el-form-item class="operatortime" label="操作日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="form_plat.startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="form_plat.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
           </el-form-item>
           <el-button id="operaBtn" type="primary">查询</el-button>
         </el-form>
       </el-row>
       <el-row class="table">
          <el-table
            :data="form_plat.tableData"
            style="width:100%"
          >
            <el-table-column
              label="用户名"
              prop="userId"
            >
            </el-table-column>
            <el-table-column
              label="姓名"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              label="操作内容"
              prop="content"
            >
            </el-table-column>
            <el-table-column
              label="操作日期"
              prop="operationTime"
            >
            </el-table-column>
          </el-table>
       </el-row>
       <div class="operationlog_page">
        <div class="M-box"></div>
       </div>
      </el-tab-pane> -->
      <el-tab-pane label="加盟商" name="first">
        <el-row class="querybar">
         <el-form :inline="true" v-bind:model="form_join">
           <el-row class="selectPlace">
              <address class="joinArea">加盟区域：</address>
              <div class="citys">
                <span @click="handleClick">全部地区</span>
                <span @click="handleClick">芜湖</span>
                <span @click="handleClick">郑州</span>
                <span @click="handleClick">南京</span>
                <span @click="handleClick" class="active">上海</span>
              </div>
           </el-row>
           <el-form-item class="keywords">
             <span class="keywords" style="margin-left: 20px;
    margin-right: 15px;">关键字</span>
             <el-input v-model="form_join.keyword" placeholder="用户名/姓名"></el-input>
           </el-form-item>
           <el-form-item class="operatortime" label="操作日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="form_join.startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="form_join.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
           </el-form-item>
           <el-button id="joinBtn" type="primary">查询</el-button>
         </el-form>
       </el-row>
       <el-row class="table">
          <el-table
            :data="form_join.tableData"
            style="width:100%"
          >
            <el-table-column
              label="用户名"
              prop="userId"
            >
            </el-table-column>
            <el-table-column
              label="姓名"
              prop="name"
            >
            </el-table-column>
            <el-table-column
              label="操作内容"
              prop="content"
            >
            </el-table-column>
            <el-table-column
              label="操作日期"
              prop="operationTime"
            >
            </el-table-column>
          </el-table>
       </el-row>
      <div class="operationlog_page">
        <div class="M-box"></div>
       </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
 div.hasData{line-height: 60px;text-align: center;height: 60px;color:#9e9090;width: 100%;display:block;}
  div.operationlog i.el-icon-date{margin-right:5px;}
  div.operatortime{text-align: center;}
  div.querybar{padding-top: 20px;background: #f3f0f0;padding-left: 20px;}
  div.operationlog table{border-collapse:collapse;width:100%;}
  div.operationlog table thead tr th{font-weight:normal;text-align: left;border-bottom:2px solid #585555;padding: 5px 10px;}
  div.operationlog table tbody tr td{font-size:14px;color:rgba(121,121,121,1);font-family: '微软雅黑';border:none;border-bottom:1px dotted #afa7a7;padding:14px 10px;color:#555;}
  div.operationlog div.table{margin-top: 20px;}
  div.operationlog_page{margin-top: 50px;}
  div.selectPlace{margin-bottom:20px;}
  div.selectPlace address{font-style:normal;display:inline;font-size:14px;}
  div.selectPlace div.citys{display:inline-block;}
  div.selectPlace span{cursor:pointer;font-size:14px;display:inline-block;padding:5px;border:1px solid transparent;}
  div.selectPlace span.active{border:1px solid orange;}
  div.el-form-item__content div.el-input{display:inline-block;width: 192px;}
  div.el-form-item__content span.keyworkds{width: 63px;display: inline-block;text-align: right;margin-right: 10px;}
  button#operaBtn, button#joinBtn{width: 80px;
    float: right;
    height: 36px;
    line-height: 11px;
    margin-right: 30px;
    color: #fff;
    outline: none;
    border: none;
    /* border-radius: 4px; */
    background: rgba(52,52,67, 0.8);}
</style>
<script>
  import $ from 'jquery'
  import request from 'superagent'
  require('../../../assets/lib/js/jquery.pagination.js')
  import '../../../assets/css/pagination.css'
  import moment from 'moment'
  import {siblings, checkPositiveNumber} from '../../../../utils/index.js'
  import {host} from '../../../config/index'
  export default {
    data: function () {
      return {
        active: 'first',
        tabTitle: '加盟商',
        form_plat: {
          keyword: '',
          startTime: moment(),
          endTime: moment(),
          tableData: [],
          hasPlatData: true
        },
        form_join: {
          keyword: '',
          startTime: moment(),
          endTime: moment(),
          tableData: [],
          hasJoinData: true
        },
        plat_totalPage: '',
        join_totalPage: '',
        plat_currentPage: 1,
        join_currentPage: 1
      }
    },
    methods: {
      handleClick (e) {
        var elems = siblings(e.target)
        for (var i = 0; i < elems.length; i++) {
          elems[i].setAttribute('class', '')
        }
        e.target.setAttribute('class', 'active')
      },
       handleClickTab (tab, event) {
        var that = this
        this.tabTitle = event.target.innerText
         if(this.tabTitle === '平台') {
          request.post(host + 'franchisee/log/getAllOperationLog')
          .send({
            franchiseeId: '123456',
            userId: 'jjjj'
          })
          .end(function(err, res){
            if (err) {
              console.log(err)
            } else {
              var newArr =  JSON.parse(res.text).list.map((item) => {
                var obj = Object.assign({},item,{operationTime: moment(item.operationTime).format('YYYY-MM-DD HH:mm:ss')})
                return obj
              })
              that.form_plat.tableData = newArr
              that.plat_totalPage = JSON.parse(res.text).totalPage || 20
              var len = JSON.parse(res.text).list.length
              if (len>0) {
                that.form_plat.hasPlatData = false
                $('.M-box').eq(0).pagination({
                  pageCount: that.plat_totalPage,
                  jump: true,
                  coping: true,
                  homePage: '首页',
                  endPage: '尾页',
                  prevContent: '«',
                  nextContent: '»'
                })
                $('.M-box').eq(0).click(function (e) {
                  if (e.target.getAttribute('class') === 'active') {
                    return false
                  }
                  if (e.target.tagName === 'A') {
                    if (e.target.innerText === '首页') {
                      that.plat_currentPage = 1
                    }
                    alert(e.target.innerText)
                    if (e.target.innerText === '尾页') {
                      alert(that.plat_totalPage)
                      that.plat_currentPage = that.plat_totalPage
                    }
                    if (e.target.innerText === '»') {
                      that.plat_currentPage++
                    }
                    if (e.target.innerText === '«') {
                      that.plat_currentPage--
                    }
                    if (checkPositiveNumber(e.target.innerText)) {
                      that.plat_currentPage = e.target.innerText
                    }
                    if (e.target.innerText === '跳转') {
                      e.preventDefault()
                      var jumpPageNum = $('.M-box .active')
                      that.plat_currentPage = jumpPageNum[0].innerText
                    }
                  }
                })
                $(document).keydown(function (e) {
                  if (e.keyCode === 13) {
                    that.plat_currentPage = e.target.value
                  }
                })
              }
            }
          })
        }else {
          request.post(host + 'franchisee/log/getOperationLog')
          .send({
            franchiseeId: '123456',
            userId: 'jjjj'
          })
          .end(function(err, res){
            if (err) {
              console.log(err)
            } else {
              var newArr =  JSON.parse(res.text).list.map((item) => {
                var obj = Object.assign({},item,{operationTime: moment(item.operationTime).format('YYYY-MM-DD HH:mm:ss')})
                return obj
              })
              that.form_join.tableData = newArr
              that.join_totalPage = JSON.parse(res.text).totalPage || 20
              var len = JSON.parse(res.text).list.length
              if (len>0) {
                that.form_join.hasJoinData = false
                $('.M-box').eq(1).pagination({
                  pageCount: that.join_totalPage,
                  jump: true,
                  coping: true,
                  homePage: '首页',
                  endPage: '尾页',
                  prevContent: '«',
                  nextContent: '»'
                })
                $('.M-box').eq(1).click(function (e) {
                  if (e.target.getAttribute('class') === 'active') {
                    return false
                  }
                  if (e.target.tagName === 'A') {
                    if (e.target.innerText === '首页') {
                      that.join_currentPage = 1
                    }
                    if (e.target.innerText === '尾页') {
                      that.join_currentPage = that.join_totalPage
                    }
                    if (e.target.innerText === '»') {
                      that.join_currentPage++
                    }
                    if (e.target.innerText === '«') {
                      that.join_currentPage--
                    }
                    if (checkPositiveNumber(e.target.innerText)) {
                      that.join_currentPage = e.target.innerText
                    }
                    if (e.target.innerText === '跳转') {
                      e.preventDefault()
                      var jumpPageNum = $('.M-box .active')
                      that.join_currentPage = jumpPageNum[0].innerText
                    }
                  }
                })
                $(document).keydown(function (e) {
                  if (e.keyCode === 13) {
                    that.join_currentPage = e.target.value
                  }
                })
              }
            }
          })
        }
      }
    },
    mounted: function () {
      var that = this
      if(this.tabTitle === '加盟商') {
         request.post(host + 'franchisee/log/getOperationLog')
        .send({
          franchiseeId: '123456',
          userId: 'jjjj'
        })
        .end(function(err, res){
          if (err) {
            console.log(err)
          } else {
            var newArr =  JSON.parse(res.text).list.map((item) => {
              var obj = Object.assign({},item,{operationTime: moment(item.operationTime).format('YYYY-MM-DD HH:mm:ss')})
              return obj
            })
            that.form_plat.tableData = newArr
            that.plat_totalPage = JSON.parse(res.text).totalPage || 20
            var len = JSON.parse(res.text).list.length
            if (len>0) {
              that.form_plat.hasPlatData = false
              $('.M-box').eq(0).pagination({
                pageCount: that.plat_totalPage,
                jump: true,
                coping: true,
                homePage: '首页',
                endPage: '尾页',
                prevContent: '«',
                nextContent: '»'
              })
              $('.M-box').eq(0).click(function (e) {
                if (e.target.getAttribute('class') === 'active') {
                  return false
                }
                if (e.target.tagName === 'A') {
                  if (e.target.innerText === '首页') {
                    that.plat_currentPage = 1
                  }
                  if (e.target.innerText === '尾页') {
                    that.plat_currentPage = that.totalPage
                  }
                  if (e.target.innerText === '»') {
                    that.plat_currentPage++
                  }
                  if (e.target.innerText === '«') {
                    that.plat_currentPage--
                  }
                  if (checkPositiveNumber(e.target.innerText)) {
                    that.plat_currentPage = e.target.innerText
                  }
                  if (e.target.innerText === '跳转') {
                    e.preventDefault()
                    var jumpPageNum = $('.M-box .active')
                    that.plat_currentPage = jumpPageNum[0].innerText
                  }
                }
              })
              $(document).keydown(function (e) {
                if (e.keyCode === 13) {
                  that.plat_currentPage = e.target.value
                }
              })
            }
          }
        })
      }
    },
    watch: {
      plat_currentPage: {
        handler: function (val, oldVal) {
          var that = this
          request.post(host + 'franchisee/log/getAllOperationLog?page=' + that.plat_currentPage)
            .send({
              franchiseeId: '123456',
              userId: 'jjjj'
            })
            .end(function (err, res) {
              if (err) {
                console.log(err)
              } else {
                that.form_plat.tableData = JSON.parse(res.text).list
              }
            })
        },
        deep: true
      },
      join_currentPage: {
        handler: function (val, oldVal) {
          var that = this
          request.post(host + 'franchisee/log/getOperationLog?page=' + that.join_currentPage)
            .send({
              franchiseeId: '123456',
              userId: 'jjjj'
            })
            .end(function (err, res) {
              if (err) {
                console.log(err)
              } else {
                that.form_join.tableData = JSON.parse(res.text).list
              }
            })
        },
        deep: true
      }
    }
  }
</script>

