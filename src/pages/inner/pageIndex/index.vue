<template>
  <div>
    <div class="incomming module">
      <el-row>
        <el-col :span='12' class="mounthIncoming">
          <div class="income_title">
            <span class="income_time mounthtime ">本月营收</span>
            <span class="income_detail" @click="$router.push({path: '/index/earningsDetail?type=getRevenueCurMonth'})">>></span>
          </div>
          <div class="income_count monthcount">
            ￥18800000.00
          </div>
          <div class="income_diff">
            <span>较上月：+12300.00</span>
          </div>
        </el-col>
        <el-col :span='12' class="dayIncoming">
          <div class="income_title">
            <span class="income_time daytime ">今日营收</span>
            <span class="income_detail" @click="$router.push({path: '/index/earningsDetail?type=getRevenueCurDay'})">>></span>
          </div>
          <div class="income_count daycount">
            ￥900000.00
          </div>
          <div class="income_diff">
            <span>较昨日：+300.00</span>
          </div>
        </el-col>
      </el-row>
    </div>
      <div class="hotmap module">
      <div class="mapHeader">
        <div class="mapTitle">
          <el-row>
            <!-- <el-col :span="10">
              <span>运营热力图
              </span>
              <span  style="font-size:12px;color:rgba(148,148,148,1);">每十分钟自动刷新</span>
            </el-col> -->
            <el-col :span="24">
              <el-col :span="5">车辆总数2000辆</el-col>
              <el-col :span="5" class="using">待出租1900辆</el-col>
              <el-col :span="5">已出租99辆</el-col>
              <el-col :span="5">已预定1辆</el-col>
              <el-col :span="4">维护中1辆 <span  style=" float:right;cursor:pointer" class="arrow">&gt;&gt;</span></el-col>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="mapWrap">
          <Gamp></Gamp>
        </div> -->
      </div>
    </div>
    <div class="statuAndData module">
      <el-row>
        <el-col :span='12' class="datas">
          <div class="datas_title">
            <span class="data_display ">24小时趋势
            </span>
            <span  style="font-weight:normal;font-size:12px;color:rgba(148,148,148,1);">时间段内车辆接单数,每10分钟自动刷新</span>
            <span class="arrow" @click="$router.push({path:'/index/allDaysData?type=0'})">>></span>
          </div>
          <div class="Histogram">
            <myCanvas></myCanvas>
          </div>
        </el-col>
        <el-col :span='12' class="status">
          <div class="status_title">
            <span>当前动态</span>
            <span class="arrow" @click="$router.push({path: '/index/earningsDetail?type=getRevenueCurDay'})">>></span>
          </div>
          <div class="list">
            <div>
              <ul>
                <li v-bind:key="statu.carNum" v-for="statu of status">
                  <el-row>
                    <el-col :span="6">+{{statu.money}}</el-col>
                    <el-col :span="6">车辆：{{statu.carNum}}</el-col>
                    <el-col :span="12">{{statu.time}}</el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  
    <div style="background:#fff;">
      <div class="settlementInfo module">
        <el-row>
          <el-col :span="8">
            当前已为您赚到<span class="earn">￥18800000.00</span>
          </el-col>
          <el-col :span="8">
            已结算<span class="settle">￥60000.00</span>
          </el-col>
          <el-col :span="8">
            待结算<span class="wait">￥300000.00</span>
            <el-button class="withdrawal" @click="$router.push('/index/settlementRecord')">结算</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  
  
  </div>
</template>
<style scoped>
div.mapHeader{background:#fff;}
div.module {
  margin-bottom:20px
}

div.el-col-12 {
  padding: 10px;
  width:49%;
  box-sizing: border-box
}

div.el-col-12:nth-child(1) {
  float: right;
}

div.el-col-12 .income_title {
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
}

div.el-col-12 .income_title .income_time {
  font-size: 16px;
}

div.el-col-12 .income_title .income_detail {
  font-size: 14px;
  float: right;
}

div.el-col-12 .income_count {
  margin-bottom: 5px;
  font-size: 30px;
  color:rgba(255,153,0,1);
  padding-left: 50px
}
div.el-col-12 .income_count.monthcount{color:rgba(102,102,102,1)}

div.el-col-12 .income_diff {
  text-align: right;
}

div.mounthIncoming {
  background: #fff;
  color: #000;
}

div.dayIncoming {
  background: #fff;
  color: #000;
}

span.income_time {
  font-weight: bold;
}

span.income_detail {
  cursor: pointer;
}

div.status {
  background: #ffc0cb;
  padding: 0;
}

div.status_title,
div.datas_title {
  background: #fff;
  line-height: 40px;
  font-weight: bold;
  color: #000
}

div.status_title span,
div.datas_title span {
  margin-left: 10px;
}

div.datas_title span.data_display small {
  margin-left: 5px;
  color: rgba(148,148,148,1);
  font-weight:normal;
}

div.status_title span.arrow,
div.datas_title span.arrow {
  margin: 0 10px 0 0;
  float: right;
  cursor: pointer
}

div.status div.list ul li {
  list-style-type: none;
  background: #ffffff;
  color: #040404;
  line-height: 30px;
  height: 30px;
  padding: 5px 0;
  border-bottom: 1px dashed #eadddd;
}

div.status div.list ul li:nth-last-child(1) {
  border-bottom: none
}

div.status div.list ul li div.el-col-12 {
  padding: 0 10px 0 0;
  text-align: right;
}

div.status div.list ul li div.el-col-6:nth-child(1) {
  padding-left: 10px;
}

div.datas {
  padding: 0
}

div.Histogram {
  height: 244px;
  width: 100%;
  background: #fff;
}

div.settlementInfo {
  background: #fff;
  line-height: 40px;
  height: 40px;
  color: #000;
  padding:10px;
}

div.settlementInfo button.withdrawal {
  float: right;
  margin-right: 20px;
  width: 120px;
  height: 40px;
  border: 1px solid #f9f9f9;
  background: rgba(255,153,0,0.8);
  color: #fff;
  border-radius: 6px;
  display: block;
  margin-left: 30px;
}
div.settlementInfo button.withdrawal:hover{background:rgba(255,153,0,1);}

div.mapWrap {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  padding: 8px;
}

div.mapTitle {
  line-height: 40px;
  height: 40px;
  background: #fff;
  padding: 5px 10px;
  margin-bottom: 5px;
}
div.mapTitle span {
  font-size:16px;
  font-weight:bold;
}
span.earn, span.settle {color:rgba(134,134,134,1);font-weight: bold;margin-left:8px;}
span.wait{color:rgba(255,102,0,1);font-weight: bold;margin-left:8px;}
div.using{color:rgba(255,102,0,1);}
div.settlementInfo div.el-col-8:nth-child(3){text-align: right;}
</style>
<script>
import myCanvas from '../../../components/highChartRectIndex.vue'
import Gamp from '../../../components/map.vue'
import request from 'superagent'
import {host} from '../../../config/index'
export default {
  data: function () {
    return {
      status: [
        {
          money: 99,
          countNum: 1011,
          time: '2017-01-01 10:01:01'

        },
        {
          money: 199,
          countNum: 1111,
          time: '2017-02-02 10:01:01'

        },
        {
          money: 299,
          countNum: 1211,
          time: '2017-03-03 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        },
        {
          money: 399,
          countNum: 1311,
          time: '2017-04-04 10:01:01'

        }
      ]
    }
  },
  components: {
    myCanvas,
    Gamp
  },
  methods:{
  },
  mounted:function(){
     request
     .post(host + 'franchisee/home/allianceIndex')
      .withCredentials()
      .set({
        'content-type': 'application/x-www-form-urlencoded'
      })
     .end((err, res) => {
       if (err) {
         console.log(err)
       } else {
         var result = JSON.parse(res.text).data
       }
     })
  }
}
</script>
