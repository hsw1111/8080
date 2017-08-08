<template>
	<div style="margin-right: 20px;">
		<div id="abnormalData_header">
			 <div class="abnormalData_checked">
			 		<span>异常数据：</span>
				  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
				  </el-checkbox-group>

				  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			 </div>

			 <div class="abnormalData_timeLine">
				  <div class="block">
				    <span class="demonstration">数据时间段</span>
				    <el-date-picker
				      v-model="value7"
				      type="daterange"
				      align="right"
				      placeholder="选择日期范围"
				      :picker-options="pickerOptions2">
				    </el-date-picker>

				    <el-button icon="search" class="timeSelect_button">查询</el-button>
				  </div>
			 </div>
		</div>

		<div id="abnormalData_table">
			<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="licensePlateNumber"
        label="车牌号"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="number"
        label="终端编号"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="time"
        label="异常情况首次出现日期"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="abnormalData"
        label="异常情况"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="readAlready"
        label="">
        <template scope="scope">
				  <el-checkbox v-model="tableData[0].readAlready">设为已读</el-checkbox>
				</template>
      </el-table-column>
    </el-table>
		</div>

		<div id="abnormalData_page">
      <div class="M-box"></div>
		</div>
	</div>
</template>

<style>
  html,body,h1,h2,h3,h4,h5,h6,td,tr,th,table,thead,tbody,dl,dt,dd,p,span,ul,li,ol {
  	margin: 0;
  	padding: 0;
  }

  body {
  	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  /*   abnormalData_header    */

	#abnormalData_header {
    /* width: 100%; */
    height: 100px;
    padding: 10px 20px 10px 20px;
    margin-bottom: 20px;
    line-height: 60px;
    background: #fff;
    border: 1px solid #e7ecf1;
	}

	#abnormalData_header button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    float: right;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 10px 20px;
    padding: 10px 15px;
    border-radius: 4px;
	}

	#abnormalData_header button:hover {
		background: rgba(106,215,209,0.8);
		color: #fff;
	}

	#abnormalData_header button.active {
		background: #ff9900;
		color: #fff;
	}

	#abnormalData_header div.abnormalData_checked {
    margin-left: 10px;
  	overflow: hidden;
    margin-top: -20px;
    height: 70px;
    width: 100%;
  }

  #abnormalData_header div.abnormalData_checked>span {
  	float: left;
  	color: #444;
  	font-weight: 500;
  	font-size: 14px;
  }

  #abnormalData_header div.abnormalData_checked .el-checkbox {
    width: 167px;
    height: 30px;
    display: block;
    float: left;
  }

 	#abnormalData_header div.abnormalData_checked .el-checkbox:nth-of-type(1) {
 		margin-left: 10px;
 	}

 	#abnormalData_header div.abnormalData_checked .el-checkbox:nth-of-type(3) {
 		margin-right: 6px;
 	}

 	#abnormalData_header div.abnormalData_checked .el-checkbox:nth-of-type(5) {
 		margin-left: 10px;
 	}

 	#abnormalData_header .abnormalData_timeLine {
 		display: block;
 		width: 100%;
 		margin-left: 10px;
 	}

 	#abnormalData_header .abnormalData_timeLine span.demonstration {
 		float: left;
  	color: #444;
  	margin-right: 10px;
  	font-weight: 500;
  	font-size: 14px;
 	}

  div.el-picker-panel {
    width: 220px;
    transform-origin: center top 0px;
    z-index: 2001;
    position: fixed;
    top: 225px;
    left: 279px;
  }

 	#abnormalData_header .abnormalData_timeLine button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 10px 20px;
    padding: 10px 15px;
    border-radius: 4px;
 	}

 	#abnormalData_header .abnormalData_timeLine button:hover {
    color: #20a0ff;
    border-color: #20a0ff;
 	}


  /*  abnormalData_table  */
  #abnormalData_table {
    padding: 30px 30px 10px 30px;
    background: #fff;
    border: 1px solid #e7ecf1;
    border-bottom: none;
  }

	/*    abnormalData_page    */
	#abnormalData_page {
		padding: 4px 10px 0 20px;
		padding-bottom: 88px;
		background: #fff;
		border: 1px solid #e7ecf1;
		border-top: none;
		min-height: 230px;
	}

</style>

<script>
import $ from 'jquery'
require('../../../assets/lib/js/jquery.pagination.js')
import '../../../assets/css/pagination.css'
const cityOptions = ['2天以上没有消费数据', '行驶速度超过标准速度', '有骑行数据但没有计费的', '扫码失败次数5次以上', '车辆不在运营范围内的']

export default {
  data () {
    return {
      tableData: [{
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: true,
        isActive: false
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: false
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: true
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: false
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: true
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: true
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: true
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: true
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: true
      }, {
        licensePlateNumber: '1001',
        number: '6815010000555030',
        time: '2017-01-01 10:01:01',
        abnormalData: '2天以上没有消费数据',
        readAlready: true
      }],
      currentPage: 3,
      checkAll: true,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      // 时间段选择
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value6: '',
      value7: ''
    }
  },
  mounted () {
    $('.M-box').pagination({
      pageCount: 50,
      jump: true,
      coping: true,
      homePage: '首页',
      endPage: '尾页',
      prevContent: '«',
      nextContent: '»'
    })
  },
  methods: {
    handleCheckAllChange (event) {
      this.checkedCities = event.target.checked ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>
