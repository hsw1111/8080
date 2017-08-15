<template>
   <div id="container" v-loading="loading" element-loading-text="拼命加载中"></div>
</template>
<script>
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  import request from 'superagent'
  import {host} from '../config/index'
  export default {
    data (){ 
      return {
        categories:[],
        data:[],
        loading:true
      }
    },
    methods:{
      generateAxis () {
        var nowTime = new Date().getHours().toString()
        var count = 0
        for(var i=nowTime; i > 0 ; i--){
          count++
          if(count<=7){
            this.categories.unshift(Number(i) + ":00")
          }else{
            break
          }
        }
      },
      generateCharts(categories,data){
         Highcharts.chart('container', {
          /** Highcharts 配置 */
          lang: {
            printChart: '打印图表',
            contextButtonTitle: '图表导出菜单',
            decimalPoint: '.',
            downloadJPEG: '下载JPEG图片',
            downloadPDF: '下载PDF文件',
            downloadPNG: '下载PNG文件',
            downloadSVG: '下载SVG文件'
          },
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'column'                           // 指定图表的类型，默认是折线图（line）
          },
          title: {
            text: ' '                 // 指定图表标题
          },
          xAxis: {
            categories: categories,
            crosshair: true
          },
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              step: 1
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
          },
          series: [
            {
              name: ' ',
              color: '#74f7af',
              data:data,
              tooltip: {
                valueSuffix: '单',
                useHTML: true,
                headerFormat: '<span style="font-size: 12px">时间 {point.key}</span><br/>',
                pointFormatter: function () {
                  return '<span style="color:{' + this.series.color + '}"></span>单数: <b>' + this.y + '</b>'
                }
              }
            }
          ]

        })
      },
      loadData(){
        console.log(this.categories)
        request.post(host + 'beepartner/franchisee/statistics/franchiseeTrend')
        .withCredentials()
        .set({
        'content-type': 'application/x-www-form-urlencoded'
        })
        .send()
        .end((err, res) => {
          if (err) {
              console.log('err2:' + err)
              this.loading = false
          } else {
            this.loading = false
            var data = JSON.parse(res.text).data
            var res = data.map((item)=>{
              return {totalBill:item.totalBill}
            })
            console.log(res)
            this.data =  [
              {
                color: 'red',
                y: res[0].totalBill
              },
              {
                color: 'green',
                y: res[1].totalBill
              },
              {
                color: 'blue',
                y: res[2].totalBill
              },
              {
                color: 'orange',
                y: res[3].totalBill
              },
              {
                color: 'brown',
                y: res[4].totalBill
              },
              {
                color: 'gray',
                y: res[5].totalBill
              },
              {
                color: 'pink',
                y: res[6].totalBill
              }
            ]
            this.generateCharts(this.categories,this.data)
          }
        })
      }
    },
    mounted: function () {
      var that = this
      this.generateAxis()
      this.loadData()
      setInterval(this.loadData,10*60*1000)
       // 创建图表
    }
  }
</script>
<style>
  div#container{width:100%;height:237px;padding-top: 6px;}
  div#container g.highcharts-legend-item{display:none;}
</style>
