<template>
<div style="margin-right:20px;">
  <div v-title>结算记录</div>
	<div id="settleRed_content">
		<div id="settleRed_header">
      <p class="total">*每月结算一次，本月结算的是上月收益的分成；本月的收益分成，次月进行结算。</p>
			<h2>
				<p>可结算金额：</p><span>10000</span><span>元</span>
			</h2>
			<button @click="$router.push({path:'/index/applyaccount'})">申请结算</button>
			<span></span>
			<h3>
				<p>本月已获收益分成：</p><span>20000</span><span>元</span>
				<p>累计已结算金额：</p><span>90000</span><span>元</span>
			</h3>
		</div>	
	</div>

	<div id="settleRed_table">
		<el-table
      :data="tableData"
      v-loading="loading2"
      element-loading-text="拼命加载中"
      style="width: 100%"
			@cell-click='goDetail'
      :empty-text="emptyText"
      >
      <el-table-column
        prop="settled_time"
        label="结算月份"
				myId="withdrawalCode"
				myAdmin='id'
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="结算金额"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="apply_time"
        label="申请时间"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="财务备注">
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
  .el-pagination{    margin-left: 0;
    padding-left: 0;
    border-left: none;
    margin-top: 20px;}
	.my_table_class {
		color: #f60;cursor: pointer;
	}

	#settleRed_content {
		/*padding:20px 30px 20px 30px;*/
    padding: 0 30px 0 20px;
		background:#fff;
		margin-bottom: 20px;
		border: 1px solid #e7ecf1;		
	}
	#settleRed_header {
		width: 100%;
		height: 80px;
		line-height: 60px;
		padding: 10px 0;
		background: #fff;
    position: relative;
	}

	#settleRed_header h2,button,span {
		float: left;
	}

  #settleRed_header .total {
    position: absolute;
    color: #ddd;
    font-size: 10px;
    left: 10px;
    font-style: normal;
    top: -4px;
  }

	#settleRed_header h2 {
		font-size: 10px;
		height: 60px;
    margin-top: 30px;
	}

	#settleRed_header h2 p {
		float: left;
		margin-left: 10px;
		font-size: 16px;
		font-weight: 500;
	}

	#settleRed_header h2 span:nth-of-type(1) {
		color: red;
		font-size: 16px;
	}

	#settleRed_header h2 span:nth-of-type(2) {
		margin-left: 10px;
		font-size: 16px;
	}

	#settleRed_header span:nth-of-type(3) {
		color: red;
		font-size: 16px;
	}

	#settleRed_header button {
		width: 120px;
		height: 40px;
		margin:10px 0 0 10px;
		border: 1px solid #f9f9f9;
		background: rgba(255,153,0,0.8);
		color: #fff;
    margin-top: 40px;
		border-radius: 6px;
		display: inline-block;
		outline: none;
	}

	#settleRed_header button:hover {
		background: rgba(255,153,0,1);
		cursor: pointer;
	}

	#settleRed_header button + span{
		color: #aaa;
		margin: 6px 0 0 5px;
		font-style: italic;
	}

	#settleRed_header h3 {
		font-size: 16px;
		height: 60px;
		float: right;
    margin-top: 30px;
	}

	#settleRed_header h3 p {
		float: left;
		margin-left: 10px;
		font-weight: 500;
	}

	#settleRed_header h3 span:nth-of-type(1) {
		color: red;
	}

	#settleRed_header h3 span:nth-of-type(2) {
    margin-right: 60px;
	}

	#settleRed_table {
    padding: 20px 20px 10px 20px;
    background: #fff;
    margin-top: 20px;
    padding-left: 28px;
    padding-right: 28px;
    border: 1px solid #e7ecf1;
    border-bottom: none;
	}

  #settleRed_table .el-table--enable-row-transition .el-table__body tr td:nth-of-type(1) {
    color: #f60;
    cursor: pointer;
  }

	#settleRed_page {
		padding: 4px 10px 0 18px;
		padding-bottom: 100px;
		background: #fff;
		border: 1px solid #e7ecf1;
		border-top: none;
		min-height: 230px;
	}
</style>

<script>
import $ from 'jquery'
import request from 'superagent'
import moment from 'moment'
import {host} from '../../../config/index'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
export default {
  data () {
    return {
      tableData: [],
      totalPage: '',
      loading2: false,
      currentPage3:1,
      pageShow: false,
      totalItems:1,
      emptyText: ' '
    }
  },
  mounted () {
    this.loading2 = true
    request
      .post( host + 'franchisee/withdrawal/getAllWithdrawal')
      .send({
        'franchiseeId': '123456',
        'userId': 'admin'
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
          this.loading2 = false
          this.emptyText = '暂无数据'
          this.pageShow = false
        } else {
          console.log(JSON.parse(res.text).list)
          var newArr = JSON.parse(res.text).list
          // 页面总数
          var pageNumber = JSON.parse(res.text).totalPage
          // 总记录数
          this.totalItems = JSON.parse(res.text).totalItems
          this.totalPage = pageNumber
          if(pageNumber>1){
            this.pageShow = true
          }else {
            this.pageShow = false
          }
          this.emptyText = '  '
          // loading 关闭
          this.loading2 = false

          var arr2 = this.tableDataDel(newArr)
          this.$store.dispatch('settlementDate_action', { arr2 })
          this.tableData = this.$store.state.settlementDate.arr2
        }
      })
  },
  beforeUpdate () {
    var that = this
    // $('.M-box').click('a', function (e) {
    //   // console.log(e)
    //   that.pageUpdate(e)
    // })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    tableDataDel (arr) {
      var arrDeled = []
      for (var i = 0; i < arr.length; i++) {
        var obj = {}
        obj.settled_time = arr[i].month
        obj.amount = arr[i].money
        obj.apply_time = moment(arr[i].applyTime).format('YYYY-MM-DD')
				obj.myId = arr[i].withdrawalCode
				obj.myAdmin = arr[i].id
        if (arr[i].state === 1) {
          obj.status = '审核中'
        } else {
          obj.status = '已结算'
        }
        if (obj.des === '') {
          obj.remark = '未添加备注'
        } else {
          obj.remark = arr[i].des
        }
        arrDeled.push(obj)
      }

      // console.log('arrDeled:', arrDeled)
      return arrDeled
    },
		goDetail (row, column, cell) {
			console.log(row)
			if (column.label === '结算月份' && row.status === '审核中') {
				this.$router.push('/index/applysubmitted/' + row.myId + '&1')
			} else if (column.label === '结算月份' && row.status === '已结算') {
				this.$router.push('/index/applysubmitted/' + row.myId + '&2')
			} else {
        return
      }
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
          console.log($('.M-box span.active')[0].innerHTML)
          e.target.innerHTML = Number($('.M-box span.active')[0].innerHTML) + 1
        } else if (e.target.innerHTML === '...') {
          return
        }
      } else {
        return
      }
      var type = this.$route.query.type
      this.timer = setTimeout(function () {
        request
          .post(host + 'franchisee/withdrawal/getAllWithdrawal?page=' + e.target.innerHTML)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin'
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(JSON.parse(res.text))
              var pagedata = (JSON.parse(res.text)).list
              var arr2 = that.tableDataDel(pagedata)
              
              //关闭loading 
              that.loading2 = false

							that.$store.dispatch('settlementDate_action', { arr2 })
							that.tableData = that.$store.state.settlementDate.arr2
            }
          })
      }, 200)
    }
  },
  watch: {
    currentPage3:{
      handler: function(val,oldVal){
        request
        .post( host + 'franchisee/withdrawal/getAllWithdrawal?page=' + val)
        .send({
          'franchiseeId': '123456',
          'userId': 'admin'
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
          } else {
            console.log(JSON.parse(res.text).list)
            var newArr = JSON.parse(res.text).list
            // 页面总数
            var pageNumber = JSON.parse(res.text).totalPage
            // 总记录数
            this.totalItems = JSON.parse(res.text).totalItems
            this.totalPage = pageNumber
            if(pageNumber>1){
              this.pageShow = true
            }else {
              this.pageShow = false
            }
            // loading 关闭
            this.loading2 = false
            var arr2 = this.tableDataDel(newArr)
            this.$store.dispatch('settlementDate_action', { arr2 })
            this.tableData = this.$store.state.settlementDate.arr2
          }
        })
      },
      deep: true
    }
  }
}
</script>
