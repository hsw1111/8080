<template>
  <div style="margin-right:20px;">
  <div v-title>结算记录-申请结算</div>
    <div id="apply_account_header">
      <h1>申请结算 <span @click="$router.push('/index/settlementRecord')">返回</span></h1>
  
      <ul>
        <li>结算月份：
          <button class="month" v-bind:key="list"
                  v-for="(list, index) in monthLists" 
                  v-bind:class="[(index===0)?'active':'']"
                  :myCode=list.withdrawalCode>{{list.month}}
          </button>
          <el-input style="width:120px;background:none;margin-left:32px;"
            placeholder="暂无未结算月份"
            v-show="initMonth"
            :plain="true"
            :disabled="true">
          </el-input>
        </li>
        <li>可结算金额:     &nbsp;&nbsp;&nbsp;{{allMoney[currentIndex]}} <b style="font-weight:normal;margin-left:15px;" v-show="initMoneyShow" class="initMoney">0</b>元
          <span>*每月结算一次，结算金额=上个月所有车辆的盈利*80%+以前遗留的未结算金额。</span>
        </li>
        <li>
          申请结算金额：
          <input v-show="moneyIn" v-model.number="crash" type="number" ref="my_val" id="apply_money">
          
          <el-input style="width:120px;background:none;"
            placeholder="暂无未结算金额"
            v-show="initSetMoney"
            :plain="true"
            :disabled="true">
          </el-input>
          <button v-show="confirm">确定</button>
        </li>
      </ul>
    </div>
  
    <!-- apply_account_table -->
    <div class="apply_account_table">
  
      <!-- 表单 -->
      <el-table 
          v-loading="loading2"
          element-loading-text="拼命加载中"
          :data="tableData"
          :empty-text="emptyText" 
          style="width: 100%; font-size:13px;">
        <el-table-column prop="order_time" label="下单时间" min-width="200"></el-table-column>
        <el-table-column prop="riding_time" label="骑行时间（分钟）" min-width="150"></el-table-column>
        <el-table-column prop="riding_dis" label="骑行历程（公里）" min-width="180"></el-table-column>
        <el-table-column prop="riding_consume" label="订单费用"></el-table-column>
        <!-- <el-table-column prop="bike_number" label="车牌号" min-width="150"></el-table-column> -->
        <el-table-column prop="couponPayfor" label="优惠券支付" min-width="150"></el-table-column>
        <el-table-column prop="actualAmount" label="实际收益（元）" min-width="150"></el-table-column>
      </el-table>
    </div>
  
    <div id="apply_account_page">
      <div class="M-box">
      </div>
    </div>
  
  </div>
</template>
    
<script>
import $ from 'jquery'
// import Vue from 'vue'
import request from 'superagent'
import moment from 'moment'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
import {host} from '../../../config/index'
export default {
  data() {
    return {
      emptyText:' ',
      btnShow:true,
      initMoneyShow: false,
      initSetMoney:false,
      moneyIn: true,
      initMonth: false,
      confirm: true,
      input: '',
      tableData: [],
      router_show: false,
      apply_money_data: '2017-01',
      monthLists: [],
      totalPage: '',
      currentCode: '',
      allMoney: [],
      currentIndex: 0,
      crash: '',
      loading2: false
    }
  },
  methods: {
    change() {
      console.log('this is entry')
      this.$router.push('/index/accountManager/addaccount')
      this.router_show = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    tableDataDel(arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.order_time = moment(arr[i].chargeTime).format('YYYY-MM-DD')
        obj.bike_number = arr[i].bikeCode
        obj.riding_time = Math.floor((arr[i].time/1000)/60) + '分'
        obj.riding_dis = arr[i].mileage
        obj.riding_consume = arr[i].money
        arrDeled.push(obj)
      }

      // console.log('arrDeled:', arrDeled)
      return arrDeled
    },
    getDataByTime () {
      this.loading2 = true
      request
        .post(host + 'franchisee/withdrawal/getWithdrawalDetail')
        .send({
          'franchiseeId': '123456',
          'userId': 'admin',
          'withdrawalCode': this.currentCode
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            // console.log(JSON.parse(res.text).list)
            var arr = JSON.parse(res.text).list
            var pageNumber = JSON.parse(res.text).totalPage
            var newArr = this.tableDataDel(arr)
            this.tableData = newArr
            this.totalPage = pageNumber

            // 关闭loading
            this.loading2 = false
            $('.M-box').pagination({
              pageCount: pageNumber,
              jump: true,
              coping: true,
              homePage: '首页',
              endPage: '尾页',
              prevContent: '«',
              nextContent: '»'
            })
          }
        })
    },
    pageUpdate (e) {
      var that = this
      clearTimeout(this.timer)

      this.loading2 = true

      if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {
        if (e.target.innerHTML === '首页') {
          e.target.innerHTML = 1
        } else if (e.target.innerHTML === '尾页') {
          e.target.innerHTML = this.totalPage
        } else if (e.target.innerHTML === '«') {
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) - 1
        } else if (e.target.innerHTML === '»') {
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) + 1
        } else if (e.target.innerHTML === '...') {
          return
        }
      } else {
        return
      }

      this.timer = setTimeout(function () {
        request
          .post(host + 'franchisee/withdrawal/getWithdrawalDetail?page=' + e.target.innerHTML)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin',
            'withdrawalCode': that.currentCode
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              // console.log(JSON.parse(res.text))
              var pagedata = (JSON.parse(res.text)).list
              var arr2 = that.tableDataDel(pagedata)

              // 关闭loading
              that.loading2 = false

              that.tableData = arr2
            }
          })
      }, 200)
    }
  },
  mounted() {
    this.loading2 = true
    request
      .post(host + 'franchisee/withdrawal/getNotWithdrawal')
      .send({
        'franchiseeId': '123456',
        'userId': 'admin'
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
          this.loading2 = false
          this.initMoneyShow = true
            this.initSetMoney = true
            this.initMonth = true
            this.confirm = false
            this.moneyIn = false
            this.emptyText = '暂无数据'
        } else {
           // loading 关闭
              this.loading2 = false
          var allMonth = JSON.parse(res.text).list
          console.log(allMonth)
          if(allMonth.length>0){
            for (var i = 0; i < allMonth.length; i++) {
              var mon = {}
              mon.month = allMonth[i].month
              mon.withdrawalCode = allMonth[i].withdrawalCode
              this.monthLists.push(mon)
              this.allMoney.push(allMonth[i].money)
            }
            this.currentCode = JSON.parse(res.text).list[0].withdrawalCode
            // 根据渲染的未结算月份显示当前月份的详细数据
            this.getDataByTime()
          } else {
            this.initMoneyShow = true
            this.initSetMoney = true
            this.initMonth = true
            this.confirm = false
            this.moneyIn = false
          }
        }
      })
  },
  updated () {
    var that = this
    $('#apply_account_header ul li:nth-of-type(1) button').click('button', function () {
      $('button.active').removeClass('active')
      that.currentIndex = $(this).index()
      // console.log($(this).attr('myCode'))
      // 点击不同月份调用数据
      that.currentCode = $(this).attr('myCode')
      that.getDataByTime()
      $(this).addClass('active')
      that.apply_money_data = $(this).text()
    })

    $('#apply_account_header ul li:nth-of-type(3) button').click(function () {
      if ($('#apply_money').val() < 1) {
        that.$message({
          message: '提交现金必须是数字哦！',
          type: '警告'
        })
      } else if ($('#apply_money').val() > that.allMoney[that.currentIndex]) {
        that.$alert('提现金额超过当前可提现最大金额', '警告', {
          confirmButtonText: '确定'
        })
      } else {  
        const h = that.$createElement
        that.$msgbox({
          title: '提现申请确认',
          message: h('p', null, [
            h('p', { style: 'color: #f60; font-size: 16px; font-weight:bold; letter-spacing:1px; width:100%; padding: 2px 10px; text-align:center;' }, '结算月份 : ' + that.apply_money_data),
            h('p', { style: 'color: #f60; font-size: 16px; font-weight:bold; letter-spacing:1px; width:100%; padding: 2px 10px; text-align:center;' }, '结算金额 : ' + $('#apply_money').val() + '元')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              request
                .post(host + 'franchisee/withdrawal/applyWithdrawal')
                .send({
                  'franchiseeId': '123456',
                  'userId': 'admin',
                  'money': $('#apply_money').val(),
                  'withdrawalCode': that.currentCode
                })
                .end((error, res) => {
                  instance.confirmButtonLoading = true
                  instance.confirmButtonText = '申请提交中...'
                  if (error) {
                    console.log('error:', error)
                  } else {
                    console.log(JSON.parse(res.text).code)
                    // if ( JSON.parse(res.text).code === 0) {
                      setTimeout(() => {
                        if (JSON.parse(res.text).code === 0) {
                          done()
                          instance.confirmButtonLoading = false
                          that.$refs.my_val.value = ''
                        } else {
                          that.$message('提交错误')
                        }
                      }, 600)
                    // } else {
                    //   that.$message('提交错误')
                    // }
                  }
                })
            } else {
              action === 'cancel'
              done()
            }
          }
        }).then(action => {
          if (action === 'confirm') {
            that.$message({
              type: 'info',
              message: '提现申请已提交, 预计1-2个工作日到账'
            })
            that.$router.push('/index/settlementRecord')
          } else {
            // that.$message({
            //   type: 'info',
            //   message: '提现申请已取消'
            // })
          }
        })
      }
    })
  },
  beforeUpdate () {
    var that = this
    $('.M-box').click('a', function (e) {
      // console.log(e)
      that.pageUpdate(e)
    })
  }
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

#apply_account_header {
  width: 100%;
  background: #fff;
  border: 1px solid #e7ecf1;
  overflow: hidden;
  padding: 0px 0px 10px 0px;
}

#apply_account_header>h1 {
  height: 40px;
  color: #fff;
  font-size: 18px;
  width: 100%;
  display: block;
  color: #444;
  font-weight: 400;
  border-bottom: 1px solid #eee;
  padding: 2px 0px 2px 30px;
  line-height: 40px;
}

#apply_account_header>h1 span {
  float: right;
  margin-right: 60px; 
  cursor: pointer;
}

#apply_account_header>h1 span:hover {
  color: #888;
  text-decoration: underline;
}

.account_my_input {
  width: 140px;
  height: 30px;
  outline: none;
  margin-top: 4px;
  border: 1px solid #ddd;
  display: inline-block;
}

#apply_account_header ul {
  list-style: none;
  padding: 4px 20px 2px 30px;
}

#apply_account_header ul li {
  line-height: 50px;
  font-size: 16px;
  font-weight: 500;
}

#apply_account_header ul li:nth-of-type(1) button.month {
  width: 100px;
  height: 35px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  margin-right: 17px;
  background: #fff;
}

 #apply_account_header ul li:nth-of-type(1) button:nth-of-type(1) {
  margin-left: 21px;
} 

#apply_account_header ul li:nth-of-type(1) button.active {
  background: rgba(255, 153, 0, 1);
  border: 1px solid rgba(255, 153, 0, 1);
  /* margin-left: 21px; */
  color: #fff;
}

#apply_account_header ul li:nth-of-type(2) span {
  font-size: 12px;
  color: #ccc;
  margin-left: 14px;
}

#apply_account_header ul li:nth-of-type(3) {
  margin-top: -10px;
}

#apply_account_header ul li:nth-of-type(3) input {
  height: 38px;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-left: -10px; 
  width: 120px;
  text-indent: 1em;
  outline: none;
}

#apply_account_header ul li:nth-of-type(3) button {
  width: 120px;
  height: 40px;
  margin: 10px 0 0 10px;
  border: 1px solid #f9f9f9;
  background: rgba(52,52,67, 0.8);
  color: #fff;
  border-radius: 6px;
  display: inline-block;
  outline: none;
}

#apply_account_header ul li:nth-of-type(3) button:hover {
  cursor: pointer;
  background: rgba(52,52,67, 1);
}

.el-table__body,
.el-table__footer,
.el-table__header {
  border: 2px solid red;
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

div.apply_account_table {
  /* width: 100%; */
  padding: 30px 20px 10px 20px;
  background: #fff;
  margin-top: 20px;
  padding-left: 28px;
  padding-right: 28px;
  border: 1px solid #e7ecf1;
  border-bottom: none;
  /* padding-bottom: 100%; */
}

div.apply_account_table>h1 {
  width: 90%;
  height: 68px;
  line-height: 55px;
}

div.apply_account_table>h1 button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border: none;
  outline: none;
  font-size: 12px;
  color: #fff;
  background: rgba(66, 66, 66, 0.8);
  transition: all .2s linear 0s;
}

div.apply_account_table>h1 button:hover {
  background: rgb(66, 66, 66);
  cursor: pointer;
}

#apply_account_page {
  padding: 4px 10px 0 20px;
  padding-bottom: 39px;
  background: #fff;
  border: 1px solid #e7ecf1;
  border-top: none;
  min-height: 230px;
}

.el-switch__label,
.el-switch__label * {
  font-size: 12px;
}
</style>
