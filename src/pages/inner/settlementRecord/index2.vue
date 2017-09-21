<template>
  <div class="container">
    <div class="wrap">
       <div class="inline subCount">
        累计已结算：<span>{{	alreadyWidthDrawTimes }}</span>次
      </div>
				
      <div class=" inline subCount">
        共获得收益金额：<span>{{alreadyWithDrawMoney }}</span>元
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
      >
        <el-table-column
           label="结算单周期"
        >
          <template scope="scope">
            <span class="date">{{scope.row.withDrawMonth}}</span>
          </template>
        </el-table-column>
        <el-table-column
           prop="applyMoney"
           label="周期总收益(￥)"
        >
           <template scope="scope">
             <span class="profit">{{scope.row.totalProfit}}</span>
          </template>
        </el-table-column>
         <el-table-column
           prop="applyMoney"
           label="可结算收益(￥)"
        >
           <template scope="scope">
             <span class="profit">{{scope.row.applyMoney}}</span>
          </template>
        </el-table-column>
         <el-table-column
           prop="status"
           label="状态"
        >
          <template scope="scope">
            <span :class="{wait:scope.row.status==1?true:false}">
              <i v-if="scope.row.status==1">待确认</i>
              <i v-else-if="scope.row.status==2">待结算</i>
              <i v-else>已结算</i>
            </span>
          </template>
        </el-table-column>
         <el-table-column
           label="操作"
        >
          <template scope="scope">
           <router-link target="_blank" :class="{active:scope.row.status==1?true:false,normal:scope.row.status!==0?true:false}" v-bind:to="{path:'/index/settlementRecord/detail', query: {month:scope.row.date}}">确认结算</router-link>
          </template>
        </el-table-column>
         <el-table-column
           prop="description"
           label="财务备注"
        >
           <template scope="scope">
             <span class="profit">{{scope.row.description}}</span>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
        v-show="pageShow"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import request from 'superagent'
import moment from 'moment'
import { host } from '../../../config/index'
  export default {
    data(){
      return {
        pageShow:true,
        currentPage3:1,
        totalItems:30,
        tableData: [{
          date: '2016-05-02',
          profit: '1122',
          canSettle: '1122',
          status:0,//待确认
          desc: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          profit: '1122',
          canSettle: '1122',
          status:1,//待结算
          desc: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          profit: '1122',
          canSettle: '1122',
          status:2,//已结算
          desc: '上海市普陀区金沙江路 1518 弄'
        }
        ]
      }
    },
    methods:{
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted(){
       request
      .post(host + 'beepartner/franchisee/withDraw/findWithDraw')
      .withCredentials()
      .set({
        'content-type': 'application/x-www-form-urlencoded'
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
          this.loading2 = false
          this.emptyText = '暂无数据'
          this.pageShow = false
        } else {
          // loading 关闭
          this.loading2 = false
          var code = JSON.parse(res.text).resultCode
          if (code != -1) {
            var newArr = JSON.parse(res.text).data
            this.tableData = newArr
        
            // 页面总数
            var pageNumber = JSON.parse(res.text).totalPage
            // 总记录数
            this.totalItems = Number(JSON.parse(res.text).totalItems)
            this.totalPage = pageNumber
            if (pageNumber > 1) {
              this.pageShow = true
            } else {
              this.pageShow = false
              this.emptyText = ' 暂无数据'
            }
         
          }else{
            this.pageShow = false
            this.emptyText = ' 暂无数据'
            var newArr = []
          
            this.tableData = []
          }

        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  div.wrap{
    background:rgba(255, 255, 204, 0.8);
    margin-bottom:20px;
    padding:16px;
    div.inline{
      height:30px;
      display: inline-block;
      margin-right:40px;
      line-height: 30px;
    }
  }
   div.table{
      padding:16px;
      background:#fff;
      font-family:'微软雅黑';
      a.active{color:rgb(2, 2, 255);text-decoration:underline;}
      a.normal{color:rgb(228, 228, 228);text-decoration:none;cursor:default}
      span.date{color:#0202ff;}
      span.profit,span.canSettle,span.desc{color:#8c8c8c}
      span.wait{color:rgb(255, 204, 0);}
      i{font-style:normal}
      .el-pagination{padding:0;margin-top:20px;border-left:none;}
    }
   
</style>
