<template>
  <div class="queryLists">
    <div v-title>报表管理-消费数据-列表</div>
    <h3>
      <button class="btn_list" @click="handeClick">查看统计图</button>
      <h1>{{$store.state.moment}}</h1>
    </h3>
    <div>
      <el-table
        :data="lists"
        v-loading="loading2"
        element-loading-text="拼命加载中"
        :empty-text="emptyText"
        style="width: 100%">
        <el-table-column
          prop="time"
          label="订单日期"
          sortable
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="totalBill"
          label="订单数"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="money"
          label="订单总额">
        </el-table-column>
        <el-table-column
          prop="couponApplyMoney"
          label="优惠卷支付总额">
        </el-table-column>
        <el-table-column
          min-width="80"
          label="实际收益（元） ?"
          prop='bikeCode'>
          <template scope="scope">
            <el-tooltip placement="top">
              <!--<div slot="content">多行信息<br/>第二行信息</div>
              <el-button>Top center</el-button>-->
            </el-tooltip>
            <span>11</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
		<div id="earD_page">
			<div class="M-box">
			</div>
		</div>
  </div>
</template>
<style scoped>

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

div.queryLists h3 {
  text-align: right;
  margin-bottom: 15px;
}

div.queryLists {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px 20px 30px;
}

div.queryLists h3 button {
  margin-right: 0px;
  width: 137px;
}



#earD_page {
  padding: 14px 0px 0px 0px;
  background: #fff;
  /*border: 1px solid #e7ecf1;*/
  border-top: none;
  min-height: 233px;
  margin-left: -9px;
}

.btn_list {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  font-size: 14px;
  margin: 0;
  padding: 10px 15px;
  outline: none;
  border-radius: 4px;
}

.btn_list:hover {
  color: rgba(255,140,0, 0.8);
  border: 1px solid rgba(	255,140,0, 0.8);
}
.el-pagination{    margin-left: 0px;padding-left: 0;margin-top: 14px;}
</style>
<script>
import $ from 'jquery'
import request from 'superagent'
import moment from 'moment'
import '../../../assets/css/pagination.css'
require('../../../assets/lib/js/jquery.pagination.js')
import { host } from '../../../config/index.js'
export default {
  data () {
    return {
      lists: [],
      emptyText: ' ',
      pageTotal: '',
      totalItems:1,
      noDate: false,
      loading2: false,
      currentPage3: 1,
      pageShow: false
    }
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    handeClick () {
      this.$router.push('/index/consumeData/queryCharts')
    },
    dataUpdate () {
      var flag = true
      this.loading2 = true
      if (this.$route.query.type === undefined) {
        return
      } else if (flag === true) {
        console.log(this.$route.query)
        request
          .post(host + 'franchisee/report/consume/' + this.$route.query.type)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin'
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
              this.loading2 = false
            } else {
              var arr = JSON.parse(res.text).list
              var pageNumber = JSON.parse(res.text).totalPage
              this.totalItems = JSON.parse(res.text).totalItems
              if(pageNumber>1) {
                this.pageShow = true
              }else {
                this.pageShow = false
              }
              // loading关闭
              this.loading2 = false
              var newArr = []
              if (this.$route.query.type === 'week') {
                for (var i = 0; i < arr.length; i++) {
                  var obj = {}
                  obj.time = moment(arr[i].time).format('YYYY年第WW周')
                  obj.totalBill = arr[i].totalBill
                  obj.money = arr[i].money
                  newArr.push(obj)
                }
              } else if (this.$route.query.type === 'day') {
                for (var i = 0; i < arr.length; i++) {
                  var obj = {}
                  obj.time = moment(arr[i].time).format('YYYY年MM月DD号')
                  obj.totalBill = arr[i].totalBill
                  obj.money = arr[i].money
                  newArr.push(obj)
                }              
              } else { 
                for (var i = 0; i < arr.length; i++) {
                  var obj = {}
                  obj.time = moment(arr[i].time).format('YYYY年MM月')
                  obj.totalBill = arr[i].totalBill
                  obj.money = arr[i].money
                  newArr.push(obj)
                }                
              }
              // console.log(newArr)
              this.$store.dispatch('consumeData_action', {newArr})
              this.lists = this.$store.state.consumeData
              flag = false
            }
          })
      } else {
        return
      }
    },
    getDateMount () {
      this.loading2 = true
       //alert(this.$store.state.consumeDataType)
      var timeType = this.$store.state.consumeDataType
      request
        .post(host +'franchisee/report/consume/' + timeType)
        .send({
          'franchiseeId': '123456',
          'userId': 'admin'
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
            this.loading2 = false
            this.emptyText = ' 暂无数据'
          } else {
            var arr = JSON.parse(res.text).list
            this.loading2 = false
            console.log(arr)
            // loading关闭
            this.loading2 = false
            var pageNumber = JSON.parse(res.text).totalPage
            this.totalItems = JSON.parse(res.text).totalItems
            if(pageNumber>1){
              this.pageShow = true
            }else {
              this.pageShow = false
              this.emptyText = ' 暂无数据'
            }
            var newArr = []
            for (var i = 0; i < arr.length; i++) {
              var obj = {}
              if(timeType==='day'){
                obj.time = moment(arr[i].time).format('YYYY年MM月DD号')
              }else if(timeType==='week'){
                obj.time = moment(arr[i].time).format('YYYY第WW周')
              }else {
                obj.time = moment(arr[i].time).format('YYYY年MM月')
              }
              obj.totalBill = arr[i].totalBill
              obj.money = arr[i].money
              newArr.push(obj)
            }
            this.$store.dispatch('consumeData_action', {newArr})
            this.lists = this.$store.state.consumeData
          }
        })
    },
    time () {
      if (this.$store.state.timeline.length === 0) {
        return
      } else { 
        var type
        if (this.$route.query.type === 'day') {
          type = 0
        } else if (this.$route.query.type === 'week') {
          type = 1
        } else {
          type = 2
        }
        this.loading2 = true
        var that = this
          request
            .post(host + 'franchisee/report/consume/userDefine')
            .send({
              'franchiseeId': '123456',
              'userId': 'admin',
              'start': that.$store.state.timeline.newObj.time1,
              'end': that.$store.state.timeline.newObj.time2,
              'type': type
            })
            .end((error, res) => {
              if (error) {
                console.log('error:', error)
                this.loading2 = false
              } else {
                // console.log(JSON.parse(res.text))
                if (JSON.parse(res.text).list.length === 0) {
                  this.lists = ''
                  that.pageShow = false
                  this.loading2 = false
                  this.emptyText = ' 暂无数据'
                } else {
                    var arr = JSON.parse(res.text).list
                    var newArr = []

                    // 关闭Loading
                    this.loading2 = false

                    for (var i = 0; i < arr.length; i++) {
                      var obj = {}
                      if (this.$route.query.type === 'day') {
                         obj.time = moment(arr[i].time).format('YYYY年MM月DD号')
                      } else if (this.$route.query.type === 'week') {
                         obj.time = moment(arr[i].time).format('YYYY年第WW周')
                      } else {
                         obj.time = moment(arr[i].time).format('YYYY年MM月')
                      }
                      obj.totalBill = arr[i].totalBill
                      obj.money = arr[i].money
                      newArr.push(obj)
                    }
                    that.$store.dispatch('consumeData_action', {newArr})
                    that.lists = that.$store.state.consumeData
                  }
                }
            })
      }
    }
  },
  mounted () {
    if (this.$store.state.timeline.length === 0) {
      this.getDateMount()
    } else {
      return
    }
  },
  beforeMount () {
    if (this.$store.state.consumeData === '') {
      this.noDate = true
    }
    this.time()
  },
  beforeUpdate () {
    if (this.lists === '') {
      this.noDate = true
    } else {
      this.noDate = false
      return
    }
  },
  watch: {
    '$route': 'dataUpdate',
    '$store.state.timeline': 'time',
    currentPage3: {
      handler: function(val,oldVal){
          request
          .post(host + 'franchisee/report/consume/' + this.$route.query.type + '?page=' + val)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin'
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              var arr = JSON.parse(res.text).list
              if(arr.length===0) {
                this.pageShow = true
              }else {
                this.pageShow = true
              }
              var pageNumber = JSON.parse(res.text).totalPage

              // loading关闭
              this.loading2 = false
              // 设置data分页
              this.pageTotal = pageNumber
              // 这里需要设置分页总数！！！！！！
              var newArr = []
              if (this.$route.query.type === 'week') {
                for (var i = 0; i < arr.length; i++) {
                  var obj = {}
                  obj.time = moment(arr[i].time).format('YYYY年第ww周')
                  obj.totalBill = arr[i].totalBill
                  obj.money = arr[i].money
                  newArr.push(obj)
                }
              } else if (this.$route.query.type === 'day') {
                for (var i = 0; i < arr.length; i++) {
                  var obj = {}
                  obj.time = moment(arr[i].time).format('YYYY年MM月DD号')
                  obj.totalBill = arr[i].totalBill
                  obj.money = arr[i].money
                  newArr.push(obj)
                }              
              } else { 
                for (var i = 0; i < arr.length; i++) {
                  var obj = {}
                  obj.time = moment(arr[i].time).format('YYYY年MM月')
                  obj.totalBill = arr[i].totalBill
                  obj.money = arr[i].money
                  newArr.push(obj)
                }                
              }
              // console.log(newArr)
              this.$store.dispatch('consumeData_action', {newArr})
              this.lists = this.$store.state.consumeData
              this.flag = false
            }
          })
      },
      deep: true
    }
  }
}
</script>
