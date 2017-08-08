<template>
  <div class="allDays">
    <div v-title>报表管理-24小时数据走势</div>
    <el-row class="DatePicker">
      <el-col class="timebtn">
        <div class="timeSelectBtn">
          <el-button  class="active" @click='handleChangeType'>今日</el-button>
          <el-button @click='handleChangeType'>本周</el-button>
          <el-button @click='handleChangeType'>本月</el-button>
          <el-button @click='handleChangeType'>最近六个月</el-button>
          <!--<el-button @click='handleChangeType'>指定时间段</el-button>-->
        </div>
        <!--<el-date-picker v-show="show" v-model="value4" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right">
        </el-date-picker>
        <el-button icon="search" class="timeSelect_button" @click="getDateByTimeLine">查询</el-button>-->
      </el-col>
    </el-row>
    <el-row class="showTime">
      <el-col class="dateArrow" ref="dateArrow" v-bind:data-timetype="arrowTimeType">
        <button @click="dateMinus" style="color: #444;">
          <i class="el-icon-arrow-left"></i>
        </button>
        <span class="nowTime">{{nowTime}}</span>
        <button @click="dateAplus">
          <i class="el-icon-arrow-right"></i>
        </button>
      </el-col>
      <el-col>
        24小时数据走势
      </el-col>
    </el-row>
    <el-row class="watchButton">
      <el-col :span="2">
        <span class="orderMoney"></span>
        <i>实际收益</i>
      </el-col>
      <el-col :span="2">
        <span class="orderNum"></span>
        <i>单数</i>
      </el-col>
    </el-row>
    <el-col style="padding-bottom:190px; background:#fff; height: 600px;">
      <highChart></highChart>
    </el-col>
    </el-row>
  </div>
</template>
<style scoped>
div.allDays {
  margin-right: 20px;
}

div.allDays div.DatePicker {
  padding: 20px 30px 20px 30px;
  background: #fff;
}

div.allDays div.showTime {
  margin-top: 20px;
}

div.allDays div.showTime div.el-col {
  text-align: center;
  background: #fff;
}

div.allDays div.showTime div.el-col:nth-last-of-type(2) {
  font-size: 18px;
  padding-bottom: 10px;
}

div.allDays div.watchButton {
  padding: 20px;
  background: #fff;
}

div.allDays div.watchButton div.el-col-2 {
  float: right;
  /* margin-left: 20px; */
  width: 8.8%
}

div.allDays div.watchButton span {
  vertical-align: middle;
  width: 0;
  height: 0;
  padding: 10px;
  display: inline-block;
  border:  none;
}

div.allDays div.watchButton span.orderNum {
  background: #996600;
}

div.allDays div.watchButton span.orderMoney {
  background: #00cdcd;
  /* ff4949 */
}

div.allDays div.watchButton i {
  font-style: normal;
  margin-left: 5px;
  vertical-align: middle;
  font-size: 14px;
}
div.timebtn{background:#fff;}
div.timeSelectBtn {
  display:block;
  float:left;
  margin-right: 8px;
}

div.timeSelectBtn button {
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

div.timeSelectBtn button:hover {
  color: #666;
}

div.timeSelectBtn button.active {
  /*background: rgb(66, 66, 66);*/
  background: rgba(	255,140,0, 0.8);
  color: #fff;
  border: 1px solid rgba(	255,140,0, 0.5);
}

div.dateArrow {
  padding: 20px 20px 0 20px;
  background: #fff;
}

/* div.dateArrow button:nth-of-type(1) {
  margin-left: 10px;
}

div.dateArrow button:nth-of-type(2) {
  margin-left: -10px;
} */

div.dateArrow button {
  cursor: pointer;
  border: none;
  padding-left: 2px;
  background: #fff;
  outline: none;
  padding-right: 2px;
  /* margin-left: -10px; */
}

div.dateArrow button span:hover {
  color: #777 !important;
}

div.dateArrow button:hover {
  color: #777 !important;
}
/* 
div.dateArrow span.nowTime {
   margin-left: 5px; 
   margin-right: 5px 
} */

[class*=" el-icon-"], [class^=el-icon-] {
  font-family: element-icons!important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: top;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

div.el-date-editor--datetimerange{margin-right: 8px;}
</style>
<script>
import request from 'superagent'
import highChart from '../../../components/highChart.vue'
import { siblings } from '../../../../utils/index.js'
import moment from 'moment'
require('highcharts-no-data-to-display')
export default {
  data () {
    return {
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
      value4: '',
      nowTime: '',
      timeStamp: '',
      show: false,
      clickTimes: 0,
      arrowTimeType: 'day'
    }
  },
  components: {
    highChart
  },
  methods: {
    handleChangeType (e) {
      var siblingsBtn = siblings(e.currentTarget)
      for (var i = 0; i < siblingsBtn.length; i++) {
        siblingsBtn[i].setAttribute('class', 'el-button el-button--default')
      }
      e.currentTarget.setAttribute('class', 'el-button active el-button--default')
      if (e.currentTarget.innerText === '指定时间段') {
        this.show = true
      } else {
        this.show = false
      }
      var nowTime
      switch (e.currentTarget.innerText) {
        case '今日': {
          nowTime = moment().format('YYYY-MM-DD')
          this.$router.push({ query: { type:  '0'}})
          this.nowTime = nowTime
          this.arrowTimeType = 'day'
          this.clickTimes = 0
          break
        }
        case '本周': {
          nowTime = moment().format('YYYY年第ww周')
          this.$router.push({ query: { type:  '1'}})
          this.nowTime = nowTime
          this.arrowTimeType = 'week'
          this.clickTimes = 0
          break
        }
        case '本月': {
          nowTime = moment().format('YYYY年MM月')
          this.$router.push({ query: { type:  '2'}})
          this.nowTime = nowTime
          this.arrowTimeType = 'month'
          this.clickTimes = 0
          break
        }
        case '最近六个月': {
          this.$router.push({ query: { type:  '3'}})
          this.nowTime = '近6个月'
          break
        }
      }
    },
    dateMinus () {
      var dateTimeType = this.$refs.dateArrow.$el.dataset.timetype
      var nums = null
      switch (dateTimeType) {
        case 'day': {
          nums = --this.clickTimes
          var lastDay = new Date().getTime() + 24 * 60 * 60 * 1000 * nums
          this.nowTime = moment(lastDay).format('YYYY-MM-DD')
          this.$router.push({ query: {type:  '0', date: moment(lastDay).format('YYYY-MM-DD')}})
          break
        }
        case 'week': {
          nums = --this.clickTimes
          var lastweek = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * nums
          this.nowTime = moment(lastweek).format('YYYY年第WW周')
          this.$router.push({ query: {type:  '1', date: moment(lastweek).format('YYYY-MM-DD')}})
          break
        }
        case 'month': {
          nums = --this.clickTimes
          var lastmonth = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * 4 * nums
          this.nowTime = moment(lastmonth).format('YYYY年MM月')
          this.$router.push({ query: {type:  '2', date: moment(lastmonth).format('YYYY-MM-DD')}})
          break
        }
      }
    },
    dateAplus () {
      var dateTimeType = this.$refs.dateArrow.$el.dataset.timetype
      var nums = null
      switch (dateTimeType) {
        case 'day': {
          nums = ++this.clickTimes
          var lastDay = new Date().getTime() + 24 * 60 * 60 * 1000 * nums
          this.nowTime = moment(lastDay).format('YYYY-MM-DD')
          this.$router.push({ query: {type:  '0', date: moment(lastDay).format('YYYY-MM-DD')}})
          break
        }
        case 'week': {
          nums = ++this.clickTimes
          var lastweek = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * nums
          this.nowTime = moment(lastweek).format('YYYY年第WW周')
          this.$router.push({ query: {type:  '1', date: moment(lastweek).format('YYYY-MM-DD')}})
          break
        }
        case 'month': {
          nums = ++this.clickTimes
          var lastmonth = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * 4 * nums
          this.nowTime = moment(lastmonth).format('YYYY年MM月')
          this.$router.push({ query: {type:  '2', date: moment(lastmonth).format('YYYY-MM-DD')}})
          break
        }
      }
    },
    getDateByTimeLine () {
      if (this.value4 === '') {
        this.$alert('请选择想要查询的日期', 'Warning', {
          confirmButtonText: '确定'
        })
      } else {
        var timeStart = moment(this.value4[0]).format('YYYY-MM-DD ')
        var timeEnd = moment(this.value4[1]).format('YYYY-MM-DD ')
        console.log(timeStart, timeEnd)
        var newObj = {}
        newObj.time1 = timeStart
        newObj.time2 = timeEnd
        this.$store.dispatch('timeline_action', { newObj })
      }
    }
  },
  mounted () {
    this.nowTime = moment().format('YYYY-MM-DD')
    this.$router.push({ query: { type:  '0'}})
  }
}
</script>
