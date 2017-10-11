<template>
	<div >
    <div v-title data-title="订单明细"></div> 
    <div v-show="notice" class="el-notification" style="top: 16px; z-index: 2000;"><i class="el-notification__icon el-icon-warning"></i><div class="el-notification__group is-with-icon"><h2 class="el-notification__title">温馨提示</h2><div class="el-notification__content">实际收益就是用户实际支付的金额，但不等于订单费用减去优惠券支付金额；优惠券支付的金额可能大于订单费用；例如某笔订单骑行费用是3元，然后用户可能是用5元的优惠券抵扣的。</div></div></div>
		<div id="earD_header">
      <div class="earD_con">
        <div class="time_earning">
          <el-button @click='getDailyDate' v-bind:class="{active: isDay}">今日</el-button>
          <el-button @click='getWeekDate' v-bind:class="{active: isWeek}">本周</el-button>
          <el-button @click='getMonthDate' v-bind:class="{active: isMonth}">本月</el-button>
          <el-button @click='getAllDate' v-bind:class="{active: AllTime}">所有日期</el-button>
          <el-button @click='handleChangeType' v-bind:class="{active: spceTime}">指定时间段</el-button>
        </div>
        <el-date-picker v-model="timeLine" style="vertical-align: middle; margin-top: 0px;" v-show="show" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right">
        </el-date-picker>
        <el-button v-show="show2" class="earning_btn" @click="searchByTimeLine">查询</el-button>        
      </div>
		</div>

		<div id="earD_excel">
			<div id="earD_all">
				<h1>
          <el-tooltip class="item" effect="dark" content="所有车辆骑行收益" placement="bottom-end"> 
					  <p>实际收益合计：<span>{{sumMoney?sumMoney:0}}元</span></p>
          </el-tooltip>
					<p @click='export_excel'>导出明细到Excel</p>
				</h1>
			</div>
		</div>

		<div id="earD_body">
			<el-table
      :data="tableData"    
      v-loading="loading2"
      element-loading-text="拼命加载中"
      :empty-text="emptyText"
      style="width: 100%">
      <el-table-column
        label="车辆编号"
        min-width="10%"
        >
         <template scope="scope">
            <!-- <a>{{scope.row.bikeCode}}</a> -->
            <router-link style="color:rgb(118, 103, 233); text-decoration: none;" target='_blank' v-bind:to="{path:'/index/carManager/carUseDetail', query: {code:scope.row.bikeCode}}">{{scope.row.bikeCode}}</router-link>
            <!-- <a @click="$router.push({path:'/carUseDetail', query: {code:scope.row.bikeCode}})">{{scope.row.bikeCode}}</a>  -->
          </template>
      </el-table-column>
      <el-table-column
        prop="placeOrderTime"
        min-width="15%"
        label="下单时间">
      </el-table-column>
      <el-table-column
        prop="rideTime"
        label="骑行时间（分钟）"
        min-width="15%"
       >
      </el-table-column>
      <el-table-column
        prop="rideMileage"
        label="骑行里程（米）"
        min-width="15%"
        >
      </el-table-column>
      <el-table-column
        prop="orderMoney"
        label="订单费用"
        min-width="10%"
        >
      </el-table-column>
      <el-table-column
        prop="couponAmount"
        label="优惠券支付"
        min-width="10%"
       >
      </el-table-column>
      <el-table-column
        :render-header="rendHeader"
        prop="balanceAmount"
        label="实际收益（元）?"
        min-width="15%"
       >
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
	</div>
</template>

<style scoped>
  html,body,h1,h2,h3,h4,h5,h6,td,tr,th,table,thead,tbody,dl,dt,dd,p,span,ul,li,ol {
  	margin: 0;
  	padding: 0;
  }

  body {
  	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .loading_class {
    background: rgba(68,68,68,0.4);
  }

	#earD_header {
    /*width: 100%;*/
    height: 75px;
    line-height: 52px;
    background: #fff;
    border: 1px solid #e7ecf1;
	}

  .el-table td:nth-of-type(1) .cell {
    color: #f60;
  }

  #earD_header div.time_earning {
    display:block;
    float:left;
    margin-right: 8px;
    margin-top: 8px;
    padding-left: 20px;
  }

  #earD_header div.time_earning button {
    margin-left: 8px;
    display: inline-block;
    border: 1px solid #ddd;
    outline: none;
    font-size: 12px;
    color: #666;
    /*background: rgba(66, 66, 66, 0.8);*/
    background: #fff;
    /*transition: all .2s linear 0s;*/
    box-sizing: border-box;
    height: 35px;
  }

  #earD_header div.time_earning button.active {
    /*background: rgb(66, 66, 66);*/
    background: rgba(	255,140,0, 0.8);
    color: #fff;
    border: 1px solid rgba(	255,140,0, 0.5);
  }

  /*#earD_header div.time_earning button:hover{color:#999;}*/

	#earD_excel {
    padding: 0px 30px 0px 30px;
		background:#fff;
    border: 1px solid #e7ecf1;
    border-bottom: none;
    margin-bottom: -10px;
    margin-top: 20px;
	}

	#earD_all {
		width: 100%;
		height: 40px;
		background: #fcfcd3;
		margin-top: 20px;
		margin-bottom: 10px;
	}

	#earD_all h1 {
		width: 100%;
		line-height: 40px;
		height: 40px;
	}

	#earD_all h1 p:nth-of-type(1) {
		float: left;
		margin-left: 10px;
		font-size: 12px;
		color: #868671;
    cursor: pointer;
	}

	#earD_all h1 p:nth-of-type(2) {
		float: right;
		font-size: 12px;
		margin-right: 10px;
		color: #ff9900;
	}

	#earD_all h1 p:nth-of-type(2):hover {
		text-decoration: underline;
    cursor: pointer;
	}

	#earD_body {
    padding: 10px 20px 20px 20px;

    background: #fff;
    /*margin-top: 20px;*/
    padding-left: 28px;
    padding-right: 28px;
    border: 1px solid #e7ecf1;
    border-bottom: none;
    border-top: none;
	}

  #earD_body tr.el-table__row div.cell {
    color: #f60;
  }

	#earD_page {
    padding: 4px 10px 0 18px;
		padding-bottom: 100px;
		background: #fff;
		border: 1px solid #e7ecf1;
		border-top: none;
		min-height: 233px;
	}

  #earD_header .earning_btn {
      width: 80px;
      /*float: right;*/
      height: 36px;
      line-height: 11px;
      margin-right: 30px;
      color: #fff;
      margin-top: 18px;
      outline: none;
      border: none;
      /* border-radius: 4px; */
      background: rgba(52,52,67, 0.8);
  }

  #earD_header .earning_btn:hover {
      background: rgba(52,52,67, 0.9);
      color: #fff;
  }
  div.el-pagination{margin-top: 20px;
    margin-left: 0;
    padding-left: 0;
    margin-bottom: 10px;}
    div.el-notification{right:-330px;}

</style>

<script>
import $ from 'jquery'
import request from 'superagent'
import moment from 'moment'

import {host} from '../../../config/index'
require('../../../assets/lib/js/Blob.js')
export default {
  data () {
    return {
      notice:false,
      emptyText: ' ',
       currentPage3: 1,
      totalItems: null,
      pageShow: false,
      tableData: [],
      sumMoney:'',
      isDay:false,
      isWeek:false,
      isMonth:false,
      AllTime:false,
      spceTime:false,
      timer: null,
      totalPage: '',
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      timeLine: '',
      show: false,
      show2: false,
      loading2: false,
      startTime:'',
      endTime: ''
    }
  },
  mounted () {
    $(".sign").removeClass('is-active')
    $('.sign[name="1401"]').addClass('is-active')
    this.loading2 = true
    this.loadData(this.currentPage3)
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
    loadData (currentPage) {
      var type = this.$route.query.type
      if(type === 'getRevenueCurDay') {
        this.isDay = true
        this.isWeek = false
        this.isMonth = false
        this.AllTime = false
        this.spceTime = false
        type = 0
        this.show = false
        this.show2 = false
      }else if(type === 'getRevenueCurWeek'){
        this.show = false
        this.show2 = false
        this.isWeek = true
        this.isDay = false
        this.isMonth = false
        this.AllTime = false
        this.spceTime = false
        type = 1
      }else if(type === 'getRevenueCurMonth'){
        this.show = false
        this.show2 = false
        this.isMonth = true
        this.isWeek = false
        this.isDay = false
        this.AllTime = false
        this.spceTime = false
        type = 2
      }else if(type === 'getAllRevenue'){
        this.show = false
        this.show2 = false
        this.isMonth = false
        this.isWeek = false
        this.isDay = false
        this.AllTime = true
        this.spceTime = false
        type = 3
      }else{
        this.isMonth = false
        this.isWeek = false
        this.isDay = false
        this.AllTime = false
        this.spceTime = true
        this.show = true
        this.show2 = true
        type = 4
      }
        this.loading2 = true
        this.emptyText =  ' '
      request
        .post(host + 'beepartner/franchisee/order/getOrders')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send(
          {
            type:type,
            startTime: this.startTime,
            endTime: this.endTime,
            pageNum:currentPage
          }
        )
        .end((err, res) => {
          if (err) {
            this.loading2 = false
            this.emptyText = '暂无数据'
            console.log('err:' + err)
          } else {
            this.loading2 = false
            var newArr = JSON.parse(res.text).data||[]
            var pageNumber = JSON.parse(res.text).totalPage
            this.totalPage = pageNumber
            this.sumMoney = JSON.parse(res.text).sumMoney
            if(pageNumber>1){
              this.emptyText = ' '
              this.pageShow = true
            }else {
              this.pageShow = false
              this.emptyText = '暂无数据'
            }
            // var arr2 = this.tableDataDel(newArr)
            this.$store.dispatch('earningsDate_action', { newArr })
            // loading 关闭
            this.loading2 = false
            this.tableData = this.$store.state.users.earningsDate.newArr
            this.totalItems  = Number(JSON.parse(res.text).totalItems)
          }
        })
    },
    handleSizeChange(val) {
      
    },
    handleCurrentChange(val) {
      
    },
    handleChangeType (e) {
      if (e.currentTarget.innerText === '指定时间段') {
        this.$router.push('/index/earningsDetail?type=getRevenueDefine')    
        this.show = true
        this.show2 = true
        this.spceTime = true
        this.isDay = false
        this.isMonth = false
        this.AllTime = false
        this.isWeek = false
        this.startTime = ' '
        this.endTime = ' '
      } else {
        //this.show = false
        //this.show2 = false
      }
    },
    export_excel () {
      this.$confirm('确认导出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
       
        require.ensure([], () => {
          this.$loading({customClass: 'loading_class'})
          var that = this
          setTimeout(() => {
            const { export_json_to_excel } = require('../../../assets/lib/js/Export2Excel.js')
            const tHeader = ['车辆编号', '下单时间', '骑行时间（分钟）', '骑行里程(米)', '订单费用', '优惠券支付','实际收益（元）']
            const filterVal = ['bikeCode', 'placeOrderTime', 'rideTime', 'rideMileage', 'orderMoney', 'couponAmount', 'balanceAmount']
            var type = that.$route.query.type
            var newType
            var startTime,endTime
            switch (type) {
              case 'getRevenueCurDay': {
                newType = 0
                break
              }
              case 'getRevenueCurWeek': {
                newType = 1
                break
              }
              case 'getRevenueCurMonth': {
                newType = 2
                break
              }
              case 'getAllRevenue': {
                newType = 3
                break
              }
              case 'getRevenueDefine': {
                if (this.timeLine === '') {
                  this.$message({
                    message: '请输入时间段',
                    type: 'warning'
                  })
                } else {
                  newType = 4
                  startTime = moment(this.timeLine[0]).format('YYYY-MM-DD HH:MM:SS')
                  endTime = moment(this.timeLine[1]).format('YYYY-MM-DD HH:MM:SS')
                }
              }
            }
            request
              .post(host + 'beepartner/franchisee/order /exportOrders')
              .withCredentials()
              .set({
                'content-type': 'application/x-www-form-urlencoded'
              })
              .send({
                type:newType,
                'startTime': startTime,
                'endTime': endTime
              })
              .end((err, res) => {
                if (err) {
                  console.log('err:' + err)
                } else {
                  // 数据处理
                  var list = JSON.parse(res.text).data
                  //var newList = this.tableDataDel(list)
                  if (list.length === 0) {
                    this.$message.error('当前查询没有信息，无法导出哦~');
                  } else {
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, '营收明细列表excel')
                    that.$message({
                      type: 'success',
                      message: '导出成功'
                    })
                     that.$loading({customClass: 'loading_class'}).close()
                  }

                }
              })
          }, 1000)
        })
      }).catch(() => {
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    tableDataDel (arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.money = arr[i].money
        obj.bikeCode = arr[i].bikeCode
        obj.placeOrderTime = arr[i].placeOrderTime
        obj.journey = arr[i].mileage
        obj.orderDate = moment(arr[i].chargeTime).format('YYYY-MM-DD')
        /**
         * 下面的数据为新增数据
         * 需跟后台对接
         * */
        obj.couponAmount = arr[i].couponAmount
        obj.userPayAmount = arr[i].userPayAmount
        arrDeled.push(obj)
      }
      return arrDeled
    },
    getAllDate () {
      this.$router.push('/index/earningsDetail?type=getAllRevenue')
      this.currentPage3 = 1
      this.loadData(this.currentPage3)
    },
    getMonthDate () {
      this.$router.push('/index/earningsDetail?type=getRevenueCurMonth')
      this.loading2 = true
      this.currentPage3 = 1
      this.loadData(this.currentPage3)
    },
    getDailyDate () {
      this.$router.push('/index/earningsDetail?type=getRevenueCurDay')
      this.loading2 = true
      this.currentPage3 = 1
      this.loadData(this.currentPage3)
    },
    getWeekDate () {
      this.$router.push('/index/earningsDetail?type=getRevenueCurWeek')
      this.loading2 = true
      this.currentPage3 = 1
      this.loadData(this.currentPage3)
    },
    dataUpdate () {
       this.currentPage3 = 1
      var type = this.$route.query.type
      if (type === 'getRevenueDefine') {
        return
      } else {
        this.loading2 = true
        this.loadData()
      }
    },
    searchByTimeLine () {
      if (this.timeLine === '') {
        this.$message({
          message: '请输入时间段',
          type: 'warning'
        })
      } else {
        if(this.timeLine[0]&&this.timeLine[1]){
          this.startTime = moment(this.timeLine[0]).format('YYYY-MM-DD HH:MM:SS')
          this.endTime = moment(this.timeLine[1]).format('YYYY-MM-DD HH:MM:SS')
        }else{
          this.startTime = ''
          this.endTime = ''
        }
        
        this.loading2 = true
        this.loadData(this.currentPage3)
        this.spceTime = true
      }
      this.form
    }
  },
  created () {
    //this.dataUpdate()
  },
  watch: {
    currentPage3: {
      handler: function(val,oldVal){
        var type = this.$route.query.type || 'getRevenueCurDay'
        this.loadData(val)
      },
      deep: true
    }
  }
}
</script>
