<template>
  <div>
    <div v-title data-title="首页"></div>
    <div class="incomming module">
      <el-row>
        <el-col :span='12' class="mounthIncoming">
          <div class="income_title">
            <span class="income_time mounthtime ">本月营收</span>
            <span class="income_detail" @click="$router.push({path: '/index/earningsDetail?type=getRevenueCurMonth'})">>></span>
          </div>
          <div v-loading="loading2">
            <div class="income_count monthcount">
              {{monthIncoming===null?'暂无数据':'￥' + monthIncoming}}
            </div>
            <div class="income_diff">
              <span>较上月：{{monthIncrease===null?'暂无数据':monthIncrease}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span='12' class="dayIncoming">
          <div class="income_title">
            <span class="income_time daytime ">今日营收</span>
            <span class="income_detail" @click="$router.push({path: '/index/earningsDetail?type=getRevenueCurDay'})">>></span>
          </div>
          <div v-loading="loading3">
             <div>
               <div class="income_count daycount">
                {{todayIncoming===null?'暂无数据':'￥' + todayIncoming}}
                </div>
             </div>
            <div class="income_diff">
              <span>较昨日：{{todayIncrease===null?'暂无数据':'￥' + todayIncrease}}</span>
            </div>
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
             <el-col :span="24" v-loading="loading3">
              <el-col :span="5">{{allCarsNum===null?'车辆总数暂无':'车辆总数' + allCarsNum +'辆'}}</el-col>
              <el-col :span="5" class="using">{{waitLend===null?'待出租暂无':'待出租' + waitLend +'辆'}}</el-col>
              <el-col :span="5"> {{rented===null?'已出租暂无':'已出租' + rented +'辆'}}</el-col>
              <el-col :span="5">{{ordered===null?'已预定暂无':'已预定' + ordered +'辆'}}</el-col>
              <el-col :span="4">{{repaired===null?'维护中暂无':'维护中' + repaired +'辆'}} <span  style="color:gray;font-weight:normal; float:right;cursor:pointer" class="arrow" @click="$router.push({path:'/index/carManager'})">&gt;&gt;</span></el-col>
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
            <span  style="font-weight:normal;font-size:12px;color:#bbb;">时间段内车辆接单数,每10分钟自动刷新</span>
            <span class="arrow">>></span>
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
          <div class="list" v-loading="loading">
            <div>
              <ul>
                <li v-bind:key="statu.carNum" v-for="statu of status">
                  <el-row>
                    <el-col :span="6">+{{statu.balanceAmount}}</el-col>
                    <el-col :span="6">车辆：{{statu.bikeCode}}</el-col>
                    <el-col :span="12">{{statu.endTimeStr}}</el-col>
                  </el-row>
                </li>
              </ul>
              <div v-show="status.length===0" class="nodata">
                暂无数据
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  
    <div style="background:#fff;">
      <div class="settlementInfo module">
        <el-row v-loading="loading5">
          <el-col :span="8">
            当前已为您赚到<span class="earn">{{franchiseeAllIncome===null?'暂无数据':'￥' + franchiseeAllIncome}}</span>
          </el-col>
          <el-col :span="8">
            已结算<span class="settle">{{alreadyWidthDrawMoney===null?'暂无数据':'￥' + alreadyWidthDrawMoney}}</span>
          </el-col>
          <el-col :span="8">
            可结算<span class="wait">{{canWidthDrawMoney===null?'暂无数据':'￥' + canWidthDrawMoney }}</span>
            <el-button v-show="!(canWidthDrawMoney===null||canWidthDrawMoney===0)"  name="1402" class="sign withdrawal" @click="$router.push('/index/settlementRecord')">确认结算</el-button>
            <el-button style="float:right;width:80px;height:38px;margin-top:2px;" disabled v-show="canWidthDrawMoney===null||canWidthDrawMoney===0">确认结算</el-button>
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
  color:gray
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
  background: #fff;
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
  cursor: pointer;
  color:gray;
  font-weight:normal;
}
div.status div.list{height:237px;}
div.status div.list ul li {
  list-style-type: none;
  background: #ffffff;
  color: #a29696;
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
  width: 88px;
  height: 40px;
  border: 1px solid #f9f9f9;
  background: rgba(255,153,0,0.8);
  color: #fff;
  border-radius: 6px;
  display: block;
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
div.settlementInfo div.el-col-8:nth-child(3){text-align: left;}
div.nodata{line-height:200px;text-align:center;}
.el-button.is-disabled:hover{color:#bfcbd9;}
</style>
<script>
import myCanvas from '../../../components/highChartRectIndex.vue'
// import Gamp from '../../../components/map.vue'
import request from 'superagent'
import {host} from '../../../config/index'
export default {
  data: function () {
    return {
      loading:true,
      loading2:true,
      loading3:true,
      loading4:true,
      loading5:false,
      todayShow:false,
      monthIncoming:'',
      monthIncrease:'',
      todayIncoming:'',
      todayIncrease:'',
      cityPartner:{},
      allKindsCars:[],
      waitLend:'',
      rented:'',
      ordered:'',
      repaired:'',
      allCarsNum:'',
      alreadyWidthDrawMoney:'',
      canWidthDrawMoney:'',
      franchiseeAllIncome:'',
      status: []
    }
  },
  components: {
    myCanvas,
    // Gamp
  },
  methods:{
    loadIndexData(){
      /*今日营收*/
       request
        .post(host + 'beepartner/franchisee/statistics/franchiseeRevenue')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
        .end((err, res) => {
          if (err) {
            console.log(err)
            this.loading3  = false
          } else {
            this.loading3  = false
            var code = JSON.parse(res.text).resultCode
            if(code!=-1){
               var result = JSON.parse(res.text).data
              this.todayIncoming = result.currentRevenue
              if(this.todayIncoming!=null){
                this.todayShow = true
              }else{
                this.todayShow = false
              }
             this.todayIncrease = result.todayIncrease
            }else{
              this.todayIncoming = null;
              this.todayIncrease = null;
             
            }
           
          }
        })
        /*本月营收*/
        request
        .post(host + 'beepartner/franchisee/statistics/franchiseeMonthRevenue')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
        .end((err, res) => {
          if (err) {
            console.log(err)
            this.loading2  = false
          } else {
             var code = JSON.parse(res.text).resultCode
            this.loading2  = false
            if(code!=-1){
              var result = JSON.parse(res.text).data
              this.monthIncoming = result.monthRevenue
              this.monthIncrease = result.monthIncrease
            }else{
              this.monthIncoming = null
              this.monthIncrease = null
            }
          }
        })
        // /*车辆运营信息*/
        request
        .post(host + 'beepartner/franchisee/withDraw/homePageWithDrawMoney')
        .withCredentials()
        .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
        .end((err, res) => {
          if (err) {
            console.log(err)
          } else {
            
            this.cityPartner = JSON.parse(res.text).cityPartner
            var code = JSON.parse(res.text).resultCode
            if(code!=-1){
                this.allCarsNum = this.cityPartner.bikeNum
                this.allKindsCars = JSON.parse(res.text).cityPartner.bikeStates||[]
                this.waitLend = this.allKindsCars[0].cnt
                this.rented = this.allKindsCars[2].cnt
                this.ordered = this.allKindsCars[3].cnt
                this.repaired = this.allKindsCars[1].cnt
                this.alreadyWidthDrawMoney = JSON.parse(res.text).cityPartner.alreadyWidthDrawMoney
                this.canWidthDrawMoney = JSON.parse(res.text).cityPartner.canWidthDrawMoney
                this.franchiseeAllIncome = JSON.parse(res.text).cityPartner.franchiseeAllIncome
            }else{
               this.waitLend = null
                this.rented = null
                this.ordered = null
                this.repaired = null
                this.allCarsNum = null
                 this.alreadyWidthDrawMoney = null
                this.canWidthDrawMoney = null
                this.franchiseeAllIncome = null
            }
            
          }
        })
        /*当前动态*/
        request
          .post(host + 'beepartner/franchisee/statistics/franchiseeCurrent')
            .withCredentials()
            .set({
              'content-type': 'application/x-www-form-urlencoded'
            })
          .end((err, res) => {
            if (err) {
              console.log(err)
              this.loading  = false
            } else {
               this.loading  = false
              var result = JSON.parse(res.text).data||[]
              this.status = result
            }
          })
    },
    checkoutSeesion(){
      request
        .post(host + 'beepartner/franchisee/Own/findFranchiseeUserOwn')
        .withCredentials()
        .set({
        'content-type': 'application/x-www-form-urlencoded'
        })
        .send()
        .end((err, res) => {
          if (err) {
              console.log('err2:' + err)
          } else {
              var message = JSON.parse(res.text).message
              if(message === '用户登录超时'){
                  this.$router.push('/login')
              }else{
                return
              }
          }
      })
    } 
  },
  mounted:function(){
    $(".sign").removeClass('is-active')
    $('.sign[name="1100"]').addClass('is-active')
   this.checkoutSeesion()
    this.loadIndexData()
     
  }
}
</script>
