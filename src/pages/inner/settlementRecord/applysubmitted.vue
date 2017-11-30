<template>
  <div style="margin-right:20px;">
  <div v-title>结算记录-结算状态</div>
  <el-dialog
    title="提示"
    :modal=false
    :visible="dialogVisible"
    size="tiny">
    <span>提现金额必须大于0, 且需从最后一次提现月份开始提现</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

    <div id="apply_account_header">
        <h1>申请结算</h1>

        <ul> 
          <li>结算月份：
            <button class="active">{{withDrawMonth}}</button>
          </li>
          <li>本次可结算金额:{{withDrawRecord.canApplyMoney}}元<span>*每月结算一次，结算金额=上个月所有车辆的盈利*80%+以前遗留的未结算金额。</span></li>
          <li>
            <span>申请结算金额：{{withDrawRecord.applyMoney}}</span>
            <!-- <input type="text" ref="my_val" id="apply_money" readonly> -->
            <button class="status">{{withDrawRecord.statusName}}</button>
          </li>
        </ul>
    </div>
  
    <!-- apply_account_table -->
    <div class="apply_account_table">
  
      <!-- 表单 -->
      <el-table 
            :data="tableData"
            v-loading="loading2"
            :empty-text="emptyText"
            element-loading-text="拼命加载中"
            style="width: 100%; font-size:13px;">
        <el-table-column prop="placeOrderTimeStr" label="订单时间" min-width="260"></el-table-column>
        <el-table-column prop="bikeCode" label="车牌号" min-width="180"></el-table-column>
        <el-table-column prop="rideTime" label="骑行时间" min-width="180"></el-table-column>
        <el-table-column prop="rideMileage" label="骑行距离" min-width="200"></el-table-column>
        <el-table-column prop="actualAmount" label="消费金额"></el-table-column>
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
    
<script>
// import $ from 'jquery'
import request from 'superagent'

import {host} from '../../../config/index'
export default {
  data () {
    return {
      emptyText: ' ',
      currentPage3:1,
      totalItems:1,
      pageShow:false,
      withDrawRecord:{},
      withDrawMonth:'',
      input: '',
      totalPage: 3,
      tableData: [{
        riding_time: '2017-06-01 20:10:12',
        bike_number: '10023',
        riding_duration: '12分钟',
        riding_dis: '6公里',
        riding_consume: '20.8元'
      }],
      router_show: false,
      dialogVisible: false,
      apply_money_data: '2017-01',
      status: '',
      loading2: false
    }
  },
  mounted () {
    var data1 = this.$route.params.id
    this.withDrawMonth = data1
    this.loading2 = true
    request
      .post(host + 'beepartner/franchisee/withDraw/getWithDrawRecordDetail')
      .withCredentials()
      .set({
        'content-type': 'application/x-www-form-urlencoded'
      })
      .send({
        currentPage:1,
        withDrawMonth:this.withDrawMonth
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
            this.loading2 = false
        } else {
          this.withDrawRecord = JSON.parse(res.text).withDrawRecord
          var pageNumber = JSON.parse(res.text).totalPage
          this.totalItems = Number(JSON.parse(res.text).totalItems)
          if(pageNumber >1) {
            this.pageShow = true
            this.emptyText = ' '
          }else{
            this.pageShow = false
            this.emptyText = '暂无数据'
          }
          // loading关闭
          this.loading2 = false
          this.tableData = JSON.parse(res.text).data
        }
      })
  },
  methods: {
     handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    change () {
      console.log('this is entry')
      this.$router.push('/index/accountManager/addaccount')
      this.router_show = true
    }
  },
  watch:{
    currentPage3:{
      handler:function (val,oldVal) {
         this.loading2 = true
        request
          .post(host + 'beepartner/franchisee/withDraw/getWithDrawRecordDetail')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            currentPage:val,
            withDrawMonth:this.withDrawMonth
          })
          .end((err, res) => {
            if (err) {
              console.log('err:' + err)
                this.loading2 = false
            } else {
              console.log(res)
              console.log(JSON.parse(res.text).data)
              this.withDrawRecord = JSON.parse(res.text).withDrawRecord
              var pageNumber = JSON.parse(res.text).totalPage
              this.totalItems = Number(JSON.parse(res.text).totalItems)
              if(pageNumber >1) {
                this.pageShow = true
                this.emptyText = ' '
              }else{
                this.pageShow = false
                this.emptyText = '暂无数据'
              }
              // loading关闭
              this.loading2 = false
              this.tableData = JSON.parse(res.text).data
            }
          })
      },
      deep:true
    }
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
    height: 160px;
    background: #fff;
    border: 1px solid #e7ecf1;
    overflow: hidden;
    padding: 0px 0px 10px 0px;
  }

  #apply_account_header>h1 {
    height: 30px;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    width: 100%;
    display: block;
    color: #444;
    font-weight: 600;
    border-bottom: 1px solid #eee;
    padding: 2px 0px 2px 20px;
    line-height: 30px;
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
    width: 100%;
    list-style: none;
    padding: 2px 20px 2px 20px;
  }

  #apply_account_header ul li {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 500;
  }

  #apply_account_header ul li:nth-of-type(1) button {
    width: 100px;
    height: 30px;
    margin-left: 32px;
    border: 1px solid #ddd;
    outline: none;
    border-radius: 4px;
    background: #fff;
  }

  #apply_account_header ul li:nth-of-type(1) button.active {
    background: rgba(255,153,0,1);
    border: 1px solid rgba(255,153,0,1);
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
    width: 120px;
    text-indent: 1em;
    outline: none;
  }

  #apply_account_header ul li:nth-of-type(3) button {
    width: 120px;
    height: 40px;
    margin: 10px 0 0 0px;
    border: 1px solid #f9f9f9;
    /*background: rgba(255,153,0,0.8);*/
    color: #fff;
    border-radius: 6px;
    display: inline-block;
    outline: none;
  }

  /*#apply_account_header ul li:nth-of-type(3) button:hover {
    cursor: pointer;
    background: rgb(255,153,0);
  }*/

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
    background: rgba(68,68,68,0.6);
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
    background: rgba(66,66,66, 0.8);
    transition: all .2s linear 0s;
  }

  div.apply_account_table>h1 button:hover {
    background: rgb(66,66,66);
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

  .el-switch__label, .el-switch__label *{font-size:12px;}
  div.el-pagination{margin-left:0;padding-left:0;margin-top:20px;margin-bottom:10px;}
  </style>
