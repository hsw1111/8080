<template>
  <div style="margin-right:20px;">
    <div v-title data-title="结算管理-申请结算"></div>
    <div v-show="notice" class="el-notification" style="top: 16px; z-index: 2000;"><i class="el-notification__icon el-icon-warning"></i><div class="el-notification__group is-with-icon"><h2 class="el-notification__title">温馨提示</h2><div class="el-notification__content">实际收益就是用户实际支付的金额，但不等于订单费用减去优惠券支付金额；优惠券支付的金额可能大于订单费用；例如某笔订单骑行费用是3元，然后用户可能是用5元的优惠券抵扣的。</div></div></div>
    <div id="apply_account_header">
      <h1>申请结算 <span @click="$router.push('/index/settlementRecord')">返回</span></h1>
  
      <ul>
        <li>结算月份：
          <button class="month" v-bind:key="list.month"
                  v-for="(list, index) in monthLists" 
                  v-bind:class="[(index===0)?'active':'']"
                  :myCode="list.month"
                   @click="loadMonth(index)"
                  >{{list.month}}

          </button>
          <el-input style="width:120px;background:none;margin-left:32px;"
            placeholder="暂无未结算月份"
            v-show="initMonth"
            :plain="true"
            :disabled="true">
          </el-input>
        </li>
        <li>可结算金额:     &nbsp;&nbsp;&nbsp;<span class="diffMoney"v-show="lastMoney" style="font-size: 16px;color: #000;"> {{diffMoney}}</span><b style="font-weight:normal;margin-left:15px;" v-show="initMoneyShow" class="initMoney">0</b>元
          <span>*每月结算一次，结算金额=上个月所有车辆的盈利*80%+以前遗留的未结算金额。</span>
        </li>
        <li>
          申请结算金额：
          <input v-show="moneyIn" v-model="appleySetMoney"   ref="my_val" id="apply_money">
          
          <el-input style="width:120px;background:none;"
            placeholder="暂无未结算金额"
            v-show="initSetMoney"
            :plain="true"
            :disabled="true">
          </el-input>
          <button v-show="confirm" @click="withDrawMoney">确定</button>
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
        <el-table-column prop="placeOrderTimeStr" label="下单时间" min-width="10%"></el-table-column>
        <el-table-column prop="rideTime" label="骑行时间（分钟）" min-width="10%"></el-table-column>
        <el-table-column prop="rideMileage" label="骑行历程（公里）" min-width="10%"></el-table-column>
        <el-table-column prop="actualAmount" label="订单费用" min-width="10%"></el-table-column>
        <!-- <el-table-column prop="bike_number" label="车牌号" min-width="150"></el-table-column> -->
        <el-table-column prop="couponAmount" label="优惠券支付" min-width="10%"></el-table-column>
        <el-table-column prop="userPayAmount" label="实际收益（元）"  :render-header="rendHeader" min-width="10%" ></el-table-column>
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
  
    <div id="apply_account_page">
      
    </div>
  
  </div>
</template>
    
<script>
// import $ from 'jquery'
// import Vue from 'vue'
import request from 'superagent'
// import moment from 'moment'
import {host} from '../../../config/index'
export default {
  data() {
    return {
       notice:false,
      lastMoney:true,
      diffMoney:'',
      appleySetMoney:'',
      isApply:false,
      currentPage3:1,
      totalItems:1,
      pageShow:false,
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
      apply_money_data: ' ',
      monthLists: [],
      totalPage: '',
      currentCode: '',
      allMoney: [],
      currentIndex: 0,
      crash: '',
      loading2: false,
      canWithDrawMoney:'',
    }
  },
  methods: {
     mouseLeaveHandler(){
      $('div.el-notification').animate({right:'-330px'},500,function(){
         this.notice = false
      })
    },
    mouseEnterHandler(){
      this.notice = true
      $('div.el-notification').animate({right:'1px'},500)
    },
    rendHeader(h,{column,$index}){
       return  h('div',{
         class:{
           tips:true,
           cell:true
         },
         attrs:{
           style:'background:#eee;margin-left:-20px;'
         }
       },[
         h('span','实际收益'),
         h('i',{
           class:{
             'icon iconfont icon-wenhao':true
           },
           attrs:{
             style:'cursor:pointer;margin-left:10px;color:orange;font-size:18px;vertical-align:middle'
           },
           on: {
            mouseenter: this.mouseEnterHandler,
            mouseleave:this.mouseLeaveHandler
          }
         })
       ])
    },
    testMoney(){
      var text = $('.diffMoney').text();
      if(text.trim().length===0){
        this.$message({
          type:'error',
          message:'结算金额不能为空'
        })
        return false
      }else{
           var flag = Number(this.appleySetMoney) > Number($('.diffMoney').text())
            if(flag){
              this.$message({
                type:'error',
                message:'最大可结算金额为' + $('.diffMoney').text()
              })
            }
            return !flag
      }
      
    },
    loadData(){
      this.appleySetMoney = ''
       request
        .post(host + 'beepartner/franchisee/withDraw/applyWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
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
                var arr = JSON.parse(res.text).data
              var pageNumber = JSON.parse(res.text).totalPage
              this.totalItems = Number(JSON.parse(res.text).totalItems) 
              if(pageNumber>1){
                this.pageShow = true
              }else{
                this.pageShow = false
              }
              this.tableData = arr
            var allMonth = JSON.parse(res.text).withDraws
            this.monthLists = []
            
            if(allMonth.length>0){
              for (var i = 0; i < allMonth.length; i++) {
                var mon = {}
                mon.month = allMonth[i].month
                this.monthLists.push(mon)
                this.allMoney.push(allMonth[i].money)
              }
              this.currentCode = JSON.parse(res.text).withDraws[0].month
              this.apply_money_data = JSON.parse(res.text).withDraws[0].month
              this.diffMoney = JSON.parse(res.text).withDraws[0].money
              // 根据渲染的未结算月份显示当前月份的详细数据
              this.getDataByTime()
              
            } else {
              this.initMoneyShow = true
              this.initSetMoney = true
              this.initMonth = true
              this.confirm = false
              this.moneyIn = false
              this.lastMoney = false
            }
          }
        })
    },
    withDrawMoney () {
     
      this.isApply = false
      //alert(this.currentCode)
      var that = this
      const h = that.$createElement
      if(this.appleySetMoney.trim().length===0){
        this.$message({
          type:'error',
          message:'结算金额不能为空'
        })
      }else{
           var flag = Number(this.appleySetMoney) > Number($('.diffMoney').text())
            if(flag){
              this.$message({
                type:'error',
                message:'最大可结算金额为' + $('.diffMoney').text()
              })
            }else{
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
                        var that = this
                        if (action === 'confirm') {
                          instance.confirmButtonLoading = true;
                          instance.confirmButtonText = '结算中...';
                          setTimeout(() => {
                            done();
                            setTimeout(() => {
                              request
                                  .post(host + 'beepartner/franchisee/withDraw/applyWithDrawMoney ')
                                  .withCredentials()
                                  .set({
                                    'content-type': 'application/x-www-form-urlencoded'
                                  })
                                  .send({
                                    'applyMoney': $('#apply_money').val(),
                                    'withDrawMonth': that.currentCode
                                  })
                                  .end(function(error,res){
                                    if(error){
                                      console.log(error)
                                      instance.confirmButtonLoading = false;
                                    }else{
                                      var code =JSON.parse(res.text).resultCode
                                      var message = JSON.parse(res.text).message
                                      if(code === 0){
                                        that.$message({
                                          type:'error',
                                          message: message
                                        })
                                      }else if(code === -1){
                                        that.$message({
                                          type:'error',
                                          message: message
                                        })                          
                                      }else{
                                        that.isApply = true
                                      }
                                    instance.confirmButtonLoading = false;
                                }
                              })
                            }, 300);
                          }, 3000);
                        } else {
                          done();
                        }
                      }
                    }).then(action => {
                    })
            }
            
      }
      
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    loadMonth(index){
      //console.log(index)
      this.currentPage3 = 1
      $('button').removeClass('active')
       $('button').eq(index).addClass('active')
      this.diffMoney = this.allMoney[index]
      this.currentIndex = index
      // console.log($(this).attr('myCode'))
      // 点击不同月份调用数据
      this.currentCode =  $('button').eq(index).attr('myCode')
      $('button').eq(index).addClass('active')
      this.getDataByTime()
      this.apply_money_data = $('button').eq(index).text()
    },
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
        .post(host + 'beepartner/franchisee/withDraw/applyWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          'month': this.currentCode
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            // console.log(JSON.parse(res.text).list)
            var arr = JSON.parse(res.text).data
            var pageNumber = Number(JSON.parse(res.text).totalPage)
            this.totalItems = Number(JSON.parse(res.text).totalItems) 
            if(pageNumber>1){
              this.pageShow = true
              this.emptyText = ' '
            }else{
              this.pageShow = false
              this.emptyText = '暂无数据'
            }
            this.tableData = arr
            // 关闭loading
            this.loading2 = false
           
          }
        })
    }
  },
  mounted() {
    this.loading2 = true
    this.loadData()
  },
  watch:{
    isApply:{
      handler:function(){
        if(this.isApply){
          this.loadData()
        }
      },
      deep:true
    },
    currentPage3:{
      handler:function(val,oldVal){
        this.loading2 = true
        request
          .post(host + 'beepartner/franchisee/withDraw/applyWithDraw')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'month': this.currentCode,
             currentPage:val
          })
          .end((err, res) => {
            if (err) {
              console.log('err:' + err)
            } else {
              // console.log(JSON.parse(res.text).list)
              var arr = JSON.parse(res.text).data
              var pageNumber = JSON.parse(res.text).totalPage
              this.totalItems = Number(JSON.parse(res.text).totalItems) 
              if(pageNumber>1){
                this.pageShow = true
              }else{
                this.pageShow = false
              }
              this.tableData = arr
              // 关闭loading
              this.loading2 = false
            
            }
          })
      },
      deep:true
    }
  }
}
</script>

<style scoped>
div.el-notification{right:-330px;}
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
div.el-pagination{margin-left: 0;
    border-left: 0;
    padding-left: 0;
    margin-top: 20px;
    margin-bottom: 10px;}
</style>
