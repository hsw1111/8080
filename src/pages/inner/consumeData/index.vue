<template>
  <div class="consumeData">
    <div v-title>报表管理-消费数据</div>
    <div class="countInfo">
      <el-row class="countTitle">
        <span class="countDimension labelAlign" style="margin-right: 0px;">统计维度</span>
        <div class="timeSelectBtn">
          <el-button v-bind:class="{active: isDay}" @click="handleChangeType" type="primary">日</el-button>
          <el-button v-bind:class="{active: isWeek}" @click="handleChangeType">周</el-button>
          <el-button v-bind:class="{active: isMonth}" @click="handleChangeType">月</el-button>
        </div>
        <span class="timePeried labelAlign">数据时间段</span>
        <el-date-picker :format="form.formatType" v-model='form.data1' :type="form.type" placeholder="选择日期"></el-date-picker>
        <span class="division">至</span>
        <el-date-picker :format="form.formatType" v-model='form.data2' :type="form.type" placeholder="选择日期"></el-date-picker>
        <el-button class="my_btn" @click="getDateByTimeLine" >查询</el-button>
      </el-row>
    </div>
    <el-row class="countDetail">
      <router-view></router-view>
    </el-row>
  </div>
</template>
<script>
// import $ from 'jquery'
import { siblings } from '../../../../utils/index.js'
import moment from 'moment'
export default {
  data: function () {
    return {
      isDay: true,
      isWeek: false,
      isMonth: false,
      form: {
        data1: '',
        data2: '',
        type: 'date',
        formatType: 'yyyy-MM-dd'
      },
      active: false
    }
  },
  mounted () {
    var timeType = this.$route.query.type
    if(timeType === 'day') {
      this.isDay = true
      this.isWeek = false
      this.isMonth = false
      
    }else if(timeType === 'week') {
      this.isDay = false
      this.isWeek = true
      this.isMonth = false
     
    }else {
      this.isDay = false
      this.isWeek = false
      this.isMonth = true
      
    }
    this.$store.commit('recodeConsumeDataType',timeType)
    console.log(this.$store.state.consumeDataType)
  },
  methods: {
    handleChangeType(e) {
      switch (e.target.innerText) {
        case '日': {
          this.form.type = 'date'
          this.$router.push({ query: { type: 'day' } })
          this.form.formatType = 'yyyy-MM-dd'
          this.$store.commit('recodeConsumeDataType','day')
          console.log(this.$store.state.consumeDataType)
          break
        }
        case '周': {
          this.form.type = 'week'
          this.$router.push({ query: { type: 'week' } })
          this.form.formatType = 'yyyy 第 WW 周'
          this.$store.commit('recodeConsumeDataType','week')
          console.log(this.$store.state.consumeDataType)
          break
        }
        case '月': {
          this.form.type = 'month'
          this.$router.push({ query: { type: 'month' } })
          this.form.formatType = ''
          this.$store.commit('recodeConsumeDataType','month')
          console.log(this.$store.state.consumeDataType)
          break
        }
      }
      var siblingsBtn = siblings(e.currentTarget)
      for (var i = 0; i < siblingsBtn.length; i++) {
        siblingsBtn[i].setAttribute('class', 'el-button el-button--default')
      }
      e.currentTarget.setAttribute('class', 'el-button active el-button--default')
    },
    getDateByTimeLine() {
      if (this.form.data1 === '' || this.form.data2 === '') {
        this.$message({
          message: '请输入日期',
          type: 'warning'
        })
      } else {
        var timeStart = moment(this.form.data1).format('YYYY-MM-DD')
        var timeEnd = moment(this.form.data2).format('YYYY-MM-DD')
        var newObj = {}
        newObj.time1 = timeStart
        newObj.time2 = timeEnd
        this.$store.dispatch('timeline_action', { newObj })
      }
    }
  }
}
</script>
<style>
div.consumeData {
  margin-right: 20px;
}

div.countInfo {
  padding: 20px 30px 20px 30px;
  background: #fff;
  margin-bottom: 20px;
}


/*div.countTitle {
  background: #f3f0f0;
  padding: 20px;
  color: #444;
}*/

div.countDetail {
  background: #fff;
}

span.labelAlign {
  float: left;
  margin-right: 10px;
  text-align: right;
  display: block;
  line-height: 35px;
  font-size: 14px;
  color: #555;
}

span.division {
  font-size: 14px;
  color: #555;
  width: 32px;
  display: inline-block;
  text-align: center;
}

span.timePeried {
  margin-left: 50px;;
}

span.division {
  font-size: 14px;
  color: #555;
}

button.query {
  float: initial;
}

button.isClick {
  background: red;
}

div.timeSelectBtn {
  display: block;
  float: left;
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
  border: 1px solid #bbb;
  color: #666;
}

div.timeSelectBtn button.active {
  /*background: rgb(66, 66, 66);*/
  background: rgba(	255,140,0, 0.8);
  color: #fff;
  border: 1px solid rgba(	255,140,0, 0.5);
}

.timeSelect_button {
  font-size: 12px;
  height: 35px;
}

.my_btn {
    width: 80px;
    float: right;
    height: 36px;
    line-height: 11px;
    color: #fff;
    /*margin-top: 10px;*/
    outline: none;
    border: none;
    /* border-radius: 4px; */
    background: rgba(52,52,67, 0.8);
}

.my_btn:hover {
    background: rgba(52,52,67, 0.9);
    color: #fff;
}

.el-input__inner {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

.el-input__inner::-webkit-input-placeholder {
  color: #ddd;
}

.el-date-table td.current:not(.disabled), .el-date-table td.end-date, .el-date-table td.start-date {
  background: black !important;
  color: #fff !important;
}

.el-input__inner:hover {
  border: 1px solid #bbb;
}

.el-month-table td.current:not(.disabled) .cell {
  background: black !important;
  color: #fff;
}

.el-button:focus, .el-button:hover {
  color: #fff;
}
div.consumeData .el-button--primary{width:initial}
</style>
