<template>
<div style="margin-right: 20px;">
		<div id="hotmap_controller">
			<el-row class="DatePicker">
        <el-col class="timebtn">
          <div class="timeBtn">
            <el-button  class="active" @click='handleChangeType'>实时</el-button>
            <el-button @click='handleChangeType'>今日</el-button>
            <el-button @click='handleChangeType'>本周</el-button>
            <el-button @click='handleChangeType'>本月</el-button>
            <el-button @click='handleChangeType'>所有日期</el-button>
            <el-button @click='handleChangeType'>指定时间段</el-button>
          </div>
          <el-date-picker v-show="show" v-model="value4" type="datetimerange" :picker-options="pickerOptions2" placeholder="选择时间范围" align="right">
          </el-date-picker>
          <!-- <el-button id="btn2" v-show="show2" >查询</el-button> -->
          <!-- <div v-show="show3" id="my_border"></div> -->
        </el-col>
      </el-row>
      <div class="hotmap_search">
        <input type="text"
               placeholder="请输入加盟区域内地址，其他区域无法看到数据"
               class="hotmap_search_place">
        <el-button class="my_btn" @click="searchByTimeline">查询</el-button>
      </div>
		</div>

    <div style="margin-bottom: -10px;">
      <el-row class="showTime">
        <el-col class="dateArrow" ref="dateArrow" v-bind:data-timetype="arrowTimeType">
          <button @click="dateMinus">
            <i class="el-icon-arrow-left"></i>
          </button>
          <span class="nowTime">{{nowTime}}</span>
          <button @click="dateAplus">
            <i class="el-icon-arrow-right"></i>
          </button>
        </el-col>
        <el-col>
          骑行热力展示
        </el-col>
      </el-row>
    </div>

		<div class="gmap">
		  <div id="map-container"></div>
		</div>

 </div>
</template>
<style scoped>
#hotmap_controller {
  padding: 20px 30px 20px 30px;
  background: #fff;
  margin-bottom: 10px;
}


#hotmap_controller .hotmap_search_place {
    min-width: 460px;
    padding-left: 10px;
    border-radius: 4px;
    height: 34px;
    outline: none;
    margin-top: 10px;
    border: 1px solid #ddd;
    display: inline-block;
}

div.gmap{
    /*width:100%;*/
    height: 800px;position: relative; left: 0; top: 10px; 
    padding:20px 30px 10px 30px;  
    background: #fff;}
  #map-container {
      
      height:100%;
  }
  div.menu{position:absolute;width:30%;left:70%;top:0;bottom:0;right:0;z-index:3000;}
  div#myPageTop{
    padding:0 15px;
    height: 50px;
    width:80%;
    box-sizing:border-box;
    margin:0 auto;
    border-radius:5px;
    background: rgba(0, 0, 0, .3)
  }
  div#myPageTop div{height:50px;padding-top: 10px;box-sizing:border-box;}
  div#myPageTop i{
      height: 32px;
      line-height: 32px;
      margin-right:-1px;
      border: 1px solid rgba(0,0,0,.5);
      display: inline-block;
      padding: 0 10px;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      width: 30px;
      overflow: hidden;
      box-sizing: border-box;
      vertical-align: middle;
      background:#fff;
      color:#000;
    }
    div#myPageTop input{line-height: 30px;
    height: 30px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    text-indent: 5px;
    outline: none;
    border: 1px solid rgba(0,0,0,.5);}
    div.group-button{margin-top:20px;}
    div#panel{ 
            position: relative;
            background-color: white;
            max-height: 90%;
            overflow-y: auto;
           width:90%;
           margin:0 auto;
           top:10px;}   
    div#editPath{margin-top: 10px;}
    div#editPath div.el-col-2 span{line-height: 32px}
    div.showCurrentCity{margin-top:10px;}
    div.amap-copyright{display: none!important;}
    .amap-logo img{display:none;}
    div.timebtn {
      background:#fff;
    }

    div.timebtn #btn2 {
      width: 60px;
      height: 36px;
      color: #fff;
      outline: none;
      text-align: center;
      border: none;
      /* border-radius: 4px; */
      background: rgba(52,52,67, 0.8);  
    }

   div.timebtn #btn2:hover {
      background: rgba(52,52,67, 0.9);
      color: #fff;
    }

   /* div.timebtn #my_border {
      border: 1px solid #ccc;
      height: 30px;
      width: 100px;
      display: block;
      position: absolute;
      left: 0;
    } */

    #hotmap_controller div.timeBtn {
      display:block;
      float:left;
      margin-right: 8px;
    }

    #hotmap_controller div.timeBtn button {
      /*margin-left: 8px;*/
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

    #hotmap_controller div.timeBtn button.active {
      background: rgba(	255,140,0, 0.8);
      color: #fff;
      border: 1px solid rgba(	255,140,0, 0.5);
    }

    #hotmap_controller div.timeBtn button.active:hover {
      color: #fff !important;
    }


    div.showTime {
      margin-top: 20px;
    }

    div.showTime div.el-col {
      text-align: center;
      background: #fff;
      font-size: 18px;
    }


    div.showTime div.el-col button {
      border: none;
      padding: 5px 0 10px 0;
    }

    div.showTime div.el-col button:hover {
      color: #666;
    }

    div.showTime div.el-col:nth-of-type(1) {
      padding: 20px 0 10px 20px
    }

    div.showTime div.el-col:nth-of-type(2) {
      margin-top: -10px;
      text-indent: 0.8em;
    }

    div.timeBtn button.active {
      /*background: rgb(66, 66, 66);*/
      background: rgba(	255,140,0, 0.8);
      color: #fff;
      border: 1px solid rgba(	255,140,0, 0.5);
    }

    div.timeBtn button.active:hover {
      color: #fff !important;
    }
    

    .my_btn {
      width: 80px;
      float: right;
      height: 36px;
      line-height: 11px;
      color: #fff;
      margin-top: 10px;
      outline: none;
      border: none;
      /* border-radius: 4px; */
      background: rgba(52,52,67, 0.8);
    }

    .my_btn:hover {
      background: rgba(52,52,67, 0.9);
      color: #fff;
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

</style>
<script>
import AMap from 'AMap'
import { siblings } from '../../../../utils/index.js'
import moment from 'moment'
import request from 'superagent'
var map, auto, placeSearch, heatmap, driving, citysearch
import {host} from '../../../config/index'
// 输入提示
var autoOptions = {
  input: 'tipinput'
}
export default {
  data: function () {
    return {
      isShowDriving: false,
      startDriving: '',
      endDriving: '',
      city: '北京',
      value4: '',
      nowTime: '',
      arrowTimeType: 'now',
      clickTimes: 0,
      show: false,
      show2: false,
      // show3: false,
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
      }

    }
  },
  mounted: function () {
    this.$router.push({ query: { type:  'curHour'}})
    // 加载实时热力图
    request
      .post(host + 'franchisee/report/hot/curHour')
      .send({
        'franchiseeId': '123456',
        'userId': 'admin'
      })
      .end((err, res) => {
        if (err) {
          console.log('err:' + err)
        } else {
          // console.log(JSON.parse(res.text))
          var arr = JSON.parse(res.text)
          this.init(arr)
        }
      })

    this.nowTime = moment().format('YYYY-MM-DD')
  },
  methods: {
    init (arr) {
      map = new AMap.Map('map-container', {
        zoom: 13,
        center: [116.397428, 39.90923],
        resizeEnable: true
      })
      // 安装插件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Heatmap', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Driving', 'AMap.Geolocation', 'AMap.CitySearch'], function () {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.Autocomplete())
        map.addControl(new AMap.PlaceSearch())
        map.addControl(new AMap.Driving())
        map.addControl(new AMap.Geolocation())
        map.addControl(new AMap.CitySearch())
        // 热力图数据这里我用的模拟数据（北京部分公园数据）
        var heatmapData = arr
        // 初始化heatmap对象
        heatmap = new AMap.Heatmap(map, {
          radius: 25, // 给定半径
          opacity: [0, 0.8],
          // 颜色配置
          gradient: {
            0.5: 'blue',
            0.65: 'rgb(117,211,248)',
            0.7: 'rgb(0, 255, 0)',
            0.9: '#ffea00',
            1.0: 'red'
          }
        })
        // 设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
          data: heatmapData,
          max: 100
        })
      })
      auto = new AMap.Autocomplete(autoOptions)
      // 构造地点查询类
      placeSearch = new AMap.PlaceSearch({
        map: map
      })
      // 注册监听，当选中某条记录 会触发
      AMap.event.addListener(auto, 'select', this.selectCity)
      // 构造驾车路线导航类
      driving = new AMap.Driving({
        map: map,
        panel: 'panel'
      })
    },
    heatmapShow () {
      heatmap.show()
    },
    heatmapHide () {
      heatmap.hide()
    },
    selectCity (e) {
      placeSearch.setCity(e.poi.adcode)
      // 关键字查询
      placeSearch.search(e.poi.name)
    },
    queryDrivingPath () {
      // 根据起终点名称规划驾车导航路线
      if (this.isShowDriving === '' || this.endDriving === '') {
        alert('起点或终点不能为空！')
      } else {
        driving.search([
          {keyword: this.startDriving, city: this.city},
          {keyword: this.endDriving, city: this.city}
        ])
        this.isShowDriving = true
        this.startDriving = ''
        this.endDriving = ''
      }
    },
    showCurrentCity () {
      // 实例化城市查询类
      citysearch = new AMap.CitySearch()
      // 自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            var cityinfo = result.city
            var citybounds = result.bounds
            console.log('您当前所在城市：' + cityinfo)
            // 地图显示当前城市
            map.setBounds(citybounds)
          }
        } else {
          console.log(result.info)
        }
      })
    },
    handleChangeType (e) {
      var siblingsBtn = siblings(e.currentTarget)
      for (var i = 0; i < siblingsBtn.length; i++) {
        siblingsBtn[i].setAttribute('class', 'el-button el-button--default')
      }
      e.currentTarget.setAttribute('class', 'el-button active el-button--default')
      if (e.currentTarget.innerText === '指定时间段') {
        this.show = true
        this.show2 = true
      } else {
        this.show = false
        this.show2 = false
      }
      var nowTime
      switch (e.currentTarget.innerText) {
        case '实时': {
          nowTime = moment().format('YYYY-MM-DD')
          this.$router.push({ query: { type:  'curHour'}})
          this.nowTime = nowTime
          this.arrowTimeType = 'now'
          this.clickTimes = 0
          break
        }
        case '今日': {
          nowTime = moment().format('YYYY-MM-DD')
          this.$router.push({ query: { type:  'curDay'}})
          this.nowTime = nowTime
          this.arrowTimeType = 'day'
          this.clickTimes = 0
          break
        }
        case '本周': {
          nowTime = moment().format('YYYY年第ww周')
          this.$router.push({ query: { type:  'curWeek'}})
          this.nowTime = nowTime
          this.arrowTimeType = 'week'
          this.clickTimes = 0
          break
        }
        case '本月': {
          nowTime = moment().format('YYYY年MM月')
          this.$router.push({ query: { type:  'curMonth'}})
          this.nowTime = nowTime
          this.arrowTimeType = 'month'
          this.clickTimes = 0
          break
        }
        case '所有日期': {
          nowTime = moment().format('YYYY年MM月')
          this.$router.push({ query: { type:  'getAll'}})
          this.nowTime = nowTime
          // this.arrowTimeType = 'month'
          this.clickTimes = 0
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
          this.$router.push({ query: { type:  'day', date: moment(lastDay).format('YYYY-MM-DD')}})
          this.searchByDirType()
          break
        }
        case 'week': {
          nums = --this.clickTimes
          var lastweek = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * nums
          this.nowTime = moment(lastweek).format('YYYY年第WW周')
          this.$router.push({ query: { type:  'week', date: moment(lastweek).format('YYYY-MM-DD')}})
          this.searchByDirType()
          break
        }
        case 'month': {
          nums = --this.clickTimes
          var lastmonth = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * 4 * nums
          this.nowTime = moment(lastmonth).format('YYYY年MM月')
          this.$router.push({ query: { type:  'month', date: moment(lastmonth).format('YYYY-MM-DD')}})
          this.searchByDirType()
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
          this.$router.push({ query: { type:  'day', date: moment(lastDay).format('YYYY-MM-DD')}})
          this.searchByDirType()
          break
        }
        case 'week': {
          nums = ++this.clickTimes
          var lastweek = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * nums
          this.nowTime = moment(lastweek).format('YYYY年第WW周')
          this.$router.push({ query: { type:  'week', date: moment(lastweek).format('YYYY-MM-DD')}})
          this.searchByDirType()
          break
        }
        case 'month': {
          nums = ++this.clickTimes
          var lastmonth = new Date().getTime() + 24 * 60 * 60 * 1000 * 7 * 4 * nums
          this.nowTime = moment(lastmonth).format('YYYY年MM月')
          this.$router.push({ query: { type:  'month', date: moment(lastmonth).format('YYYY-MM-DD')}})
          this.searchByDirType()
          break
        }
      }
    },
    dataUpdate () {
      var flag = true
      console.log(this.$route.query.type)
      if (this.$route.query.type === 'curHour') {
        return
      } else if (flag === true) {
        this.requestWay(this.$route.query.type)
      } else {
        return
      }
      
      this.requestWay(this.$route.query.type)
    },
    searchByTimeline () {
      var startTime, endTime
      if (this.show2 === true && this.value4 === '') {
        this.$message({
          message: '请选择想要查询的时间段！',
          type: 'warning'
        })
      } else {
        startTime = moment(this.value4[0]).format('YYYY-MM-DD HH:MM:SS')
        endTime = moment(this.value4[1]).format('YYYY-MM-DD HH:MM:SS')
        request
          .post(host + 'franchisee/report/hot/defineTime')
          .send({
            "account": {
              'franchiseeId': '123456',
              'userId': 'admin'
            },
            'startDate': startTime,
            'endDate': endTime
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              console.log(res)
              var arr = JSON.parse(res.text)
              this.init(arr)
            }
          })
      }
    },
    searchByDirType () {
      switch (this.$route.query.type) {
        case 'day': {
          this.requestWay(day)
          break
        }
        case 'week': {
          this.requestWay(week)
          break
        }
        case 'month': {
          this.requestWay(month)
          break
        }
      }
    },
    requestWay (type) {
      request
        .post(host + 'franchisee/report/hot/' + type)
        .send({
          "account": {
            'franchiseeId': '123456',
            'userId': 'admin'
          },
          "date": this.$route.query.date
        })
        .end((error, res) => {
          // console.log('this is entry')
          if (error) {
            console.log('error:', error)
          } else {
            console.log(res)
            var arr = JSON.parse(res.text)
            this.init(arr)
          }
        })
    }
  },
  created () {
    this.dataUpdate()
  },
  watch: {
    '$route': 'dataUpdate'
  }
}
</script>
