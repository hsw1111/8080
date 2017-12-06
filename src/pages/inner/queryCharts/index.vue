<template>
  <div class="queryCharts">
    <el-row class="watchLists">
      <span class="tips">*统计图只显示数据周期内的{{dateTypeText}}的柱状图，统计的数据为订单实际收益</span>
      <button class="btn_list" @click="handleClick">查看列表</button>
    </el-row>
    <el-row class="watchButton">
      <el-col :span="2">
        <span class="orderNum"></span>
        <i>单数</i>
      </el-col>
      <el-col :span="2">
        <span class="orderMoney"></span>
        <i>实际收益</i>
        
      </el-col>
    </el-row>
    <div class="chartsRect">
      <highChartRect></highChartRect>
    </div>
  </div>
</template>
<style scoped>
div.queryCharts {
  width: 100%;
  box-sizing: border-box;
  height: 800px;
  padding: 20px;
  border: 1px solid #e7ecf1;
}

div.queryCharts table {
  width: 100%;
  border-collapse: collapse;
}

div.queryCharts table tr th {
  text-align: left;
  border: 1px solid #cccfd2;
  padding: 10px;
  background: #1c84d2;
  color: #444;
}

div.queryCharts table tr th {
  text-align: left;
  border: 1px solid #cccfd2;
  padding: 10px;
  background: #1c84d2;
  color: #fff;
}

div.queryCharts div.chartsRect {
  width: 100%;
}

div.queryCharts div.watchLists {
  line-height: 40px;
  height: 40px;
  text-align: right;
}

div.queryCharts div.watchLists button {
  margin-right: 0px;
  width: 137px;
}
div.queryCharts div.watchLists span.tips{float:left;font-size:12px;color:#ccc;}
div.queryCharts div.watchButton {
  margin-bottom: 20px;
  margin-top: 20px;
}

div.queryCharts div.watchButton div.el-col-2 {
  float: right;
  /* margin-left: 20px; */
  width: 91px;
}

div.queryCharts div.watchButton span {
  vertical-align: middle;
  width: 0;
  height: 0;
  padding: 10px;
  display: inline-block;
  border: none;
}

div.queryCharts div.watchButton span.orderNum {
  background: #058DC7;
}

div.queryCharts div.watchButton span.orderMoney {
  background: #50B432;
}

div.queryCharts div.watchButton i {
  font-style: normal;
  margin-left: 5px;
  vertical-align: middle;
  font-size: 14px;
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
</style>
<script>
import highChartRect from '../../../components/highChartRect..vue'
export default {
  data: function () {
    return {
      dateTypeText:'',
    }
  },
  methods: {
    handleClick () {
      var type = this.$route.query.type
      this.$router.push('/index/consumeData?type=' + type)
    }
  },
  components: {
    highChartRect
  },
  mounted:function(){
     var type = this.$route.query.type
          if(type=='daily'){
            this.dateTypeText = '12个最近日期'
          }
          if(type=='weekly'){
             this.dateTypeText = '12个最近周'
          }
          if(type=='monthly'){
             this.dateTypeText = '12个最近月份'
          }
    document.title="订单数据"
  },
  watch:{
    '$route':{
      handler:function(){
          var type = this.$route.query.type
          if(type=='daily'){
            this.dateTypeText = '12个最近日期'
          }
          if(type=='weekly'){
             this.dateTypeText = '12个最近周'
          }
          if(type=='monthly'){
             this.dateTypeText = '12个最近月份'
          }
      },
      deep:true
    }
  }
}
</script>
