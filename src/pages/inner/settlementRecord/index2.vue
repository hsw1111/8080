<template>
  <div class="container">
    <div class="wrap">
       <div class="inline subCount">
        累计已结算：<span>{{alreadyWidthDrawTimes}}</span>次
      </div>
				
      <div class=" inline subCount">
        共获得收益金额：<span>{{alreadyWidthDrawMoney}}</span>元
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
         v-loading="loading"
         element-loading-text="拼命加载中"
      >
        <el-table-column
            width="250"
           label="结算单周期"
        >
          <template scope="scope">
            <span class="date">
               <router-link target="_blank" style="color:#0202ff;text-decoration:none;" v-bind:to="{path:'/index/settlementRecord/detail', query: {month:scope.row.withDrawMonth}}"> {{scope.row.withDrawMonth}}</router-link>
             </span>
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
            <span :class="{wait:scope.row.statusName=='待确认'?true:false}">
             {{scope.row.statusName}}
            </span>
            
          </template>
        </el-table-column>
         <el-table-column
           label="操作"
        >
          <template scope="scope">
            <div v-show="scope.row.statusName==='待确认'">
                <router-link target="_blank" :class="{active:scope.row.statusName==='待确认'?true:false,normal:scope.row.statusName==='待确认'?false:true}"  v-bind:to="{path:'/index/settlementRecord/detail', query: {month:scope.row.withDrawMonth}}">确认结算</router-link>
            </div>
           <div v-show="scope.row.statusName!=='待确认'">
                <a :class="{active:scope.row.statusName==='待确认'?true:false,normal:scope.row.statusName==='待确认'?false:true}">确认结算</a>
            </div>
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
        loading:true,
        alreadyWidthDrawMoney:'',
        alreadyWidthDrawTimes:'',
        pageShow:false,
        currentPage3:1,
        totalItems:30,
        tableData: [
        ]
      }
    },
    methods:{
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted(){
      document.title="结算管理"
        $(".sign").removeClass('is-active')
    $('.sign[name="1402"]').addClass('is-active')
       request
      .post(host + 'beepartner/franchisee/withDraw/findWithDraw')
      .withCredentials()
      .set({
        'content-type': 'application/x-www-form-urlencoded'
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
          this.loading = false
          this.emptyText = '暂无数据'
          this.pageShow = false
        } else {
          // loading 关闭
          this.loading2 = false
          var code = JSON.parse(res.text).resultCode
          if(code === -1){
             this.alreadyWidthDrawMoney = 0;
             this.alreadyWidthDrawTimes = 0;
             this.loading = false
          }
          if (code === 1) {
            this.loading = false;
            var newArr = JSON.parse(res.text).data
            this.alreadyWidthDrawMoney = JSON.parse(res.text).cityPartner.alreadyWidthDrawMoney
            this.alreadyWidthDrawTimes = JSON.parse(res.text).cityPartner.alreadyWidthDrawTimes
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
