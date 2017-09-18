<template>
  <div class="container">
    <div class="wrap">
       <div class="inline subCount">
        累计已结算：<span>10</span>次
      </div>
      <div class=" inline subCount">
        共获得收益金额：<span>10000</span>元
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
            <span class="date">{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column
           prop="profit"
           label="周期总收益(￥)"
        >
           <template scope="scope">
             <span class="profit">{{scope.row.profit}}</span>
          </template>
        </el-table-column>
         <el-table-column
           prop="canSettle"
           label="可结算收益(￥)"
        >
           <template scope="scope">
             <span class="profit">{{scope.row.canSettle}}</span>
          </template>
        </el-table-column>
         <el-table-column
           prop="status"
           label="状态"
        >
          <template scope="scope">
            <span :class="{wait:scope.row.status==0?true:false}">
              <i v-if="scope.row.status==0">待确认</i>
              <i v-else-if="scope.row.status==1">待结算</i>
              <i v-else>已结算</i>
            </span>
          </template>
        </el-table-column>
         <el-table-column
           label="操作"
        >
          <template scope="scope">
           <router-link target="_blank" :class="{active:scope.row.status==0?true:false,normal:scope.row.status!==0?true:false}" to>确认结算</router-link>
          </template>
        </el-table-column>
         <el-table-column
           prop="desc"
           label="财务备注"
        >
           <template scope="scope">
             <span class="profit">{{scope.row.desc}}</span>
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
    }
   
</style>
