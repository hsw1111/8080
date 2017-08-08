<template>
   <div id="container"></div>
</template>
<script>
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  export default {
    mounted: function () {
       // 创建图表
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
          categories: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00'],
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
            data: [
              {
                color: 'red',
                y: 200
              },
              {
                color: 'green',
                y: 300
              },
              {
                color: 'blue',
                y: 1300
              },
              {
                color: 'orange',
                y: 3200
              },
              {
                color: 'brown',
                y: 2300
              },
              {
                color: 'gray',
                y: 300
              },
              {
                color: 'pink',
                y: 600
              }
            ],
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
    }
  }
</script>
<style>
  div#container{width:100%;height:237px;padding-top: 6px;}
  div#container g.highcharts-legend-item{display:none;}
</style>
