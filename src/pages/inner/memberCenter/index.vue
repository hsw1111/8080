<template>
	<div>
		<div v-title data-title="个人中心"></div>
		<div id="homepage_content">
			<div id="home_header">
				<h1>
					<!-- <img src="../../../assets/homepage/2.jpg"> -->
					<el-upload class="my_upload" :show-file-list="true" :with-credentials='true' action='' :http-request='uploadWay' :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<!-- <img src="../../../assets/homepage/2.jpg"> -->
                    	<i v-else style="font-size: 180px; color: #fff;" class="icon iconfont icon-touxiang"></i>
						<!-- <h3>点击上传营业执照</h3> -->
					</el-upload>

				</h1>
				<div class="homepage_info">
					<h2>{{name}}</h2>
					<p>{{userName}}</p>
				</div>
			</div>
		</div>

		<div class="homepage_select">
			<h1>账户信息</h1>
			<ul>
				<li>
					<span>
						<i v-if="telBinded" class="iconfont right">&#xe616;</i>
						<i v-else class="iconfont err">&#xe600;</i>
					</span>
					<span>手机验证</span>
					<span>{{this.phoneNoBand === 0?'未绑定':'已绑定'}}</span>
					<span>{{this.phoneNoBand === 0?'您的手机号' +this.phone+ '尚未绑定，请尽快绑定账号':'手机号码' + this.phone + '已验证'}}</span>

					<span>
						<button :class="{disabled:btnDisabled}" :disabled="btnDisabled" @click='$router.push({path:"/index/memberCenter/bindTel"})'>绑定手机号</button>
					</span>

					<span v-show="editPhone">
						<button @click='$router.push({path:"/index/memberCenter/updateTel"})'>修改手机号</button>
					</span>
				</li>
				<!-- <li>
						<span><i v-if="emailBinded" class="iconfont">&#xe616;</i><i v-else class="iconfont right">&#xe600;</i></span>
						<span>邮箱验证</span>
						<span>{{this.email === ''?'未绑定':'已绑定'}}</span>
						<span>{{this.email === ''?'您尚未验证邮箱，请尽快登录邮箱进行验证':'邮箱' + this.email + '已验证'}}</span>
						
						<span>
							<button @click='$router.push({path:"/index/memberCenter/bindEamil"})'>绑定邮箱</button>
						</span>

						<span>	
							<button @click='$router.push({path:"/index/memberCenter/updateEmail"})'>修改邮箱</button>
						</span>
					</li> -->

				<li>
					<span>
						<i class="iconfont right">&#xe616;</i>
					</span>
					<span>登录密码</span>
					<span class="suggest">建议使用6-20个字符，包含字母、数字、下划线</span>
					<button @click='$router.push({path:"/index/memberCenter/amendPassword"})'>修改密码</button>
				</li>
			</ul>
		</div>

		<router-view id="member_router"></router-view>
	</div>
</template>

<style scoped>
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
td,
tr,
th,
table,
thead,
tbody,
dl,
dt,
dd,
p,
span,
ul,
li,
ol {
	margin: 0;
	padding: 0;
}

body {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#member_router {
	width: 100%;
	height: 100%;
	background: rgba(68, 68, 68, 0.6);
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
}

.suggest {
	font-size: 14px;
	color: #ccc;
}

#homepage_content {
	padding: 20px;
	background: #fff;
	margin-bottom: 20px;
	/* border: 1px solid #e7ecf1; */
}

#home_header {
	height: 200px;
	width: 100%;
	background: #efcfa8;
}

#home_header div {
	width: 200px;
	float: left;
}

#home_header h1 {
	float: left;
	margin-left: 108px;
	border-radius: 50%;
	margin-top: 0;
}

#home_header h1 img {
	display: block;
	margin-top: 10px;
	width: 90%;
	height: 180px;
	border-radius: 50%;
}

.homepage_info {
	margin-left: 60px;
	position: relative;
}

.homepage_info h2 {
	float: left;
	height: 30px;
	text-align: left;
	/* width: 80px; */
	line-height: 30px;
	margin-top: 25px;
}

.homepage_info p {
	float: left;
	height: 30px;
	text-align: left;
	width: 80px;
	line-height: 30px;
	margin-top: 25px;
	position: absolute;
	top: 30px;
}

.homepage_info h3 {
	position: absolute;
	color: #009900;
	padding: 5px;
	padding-top: 2px;
	padding-bottom: 2px;
	border: 1px solid #009900;
	left: 0;
	top: 100px;
}


/* homepage_select */

.homepage_select {
	/*width: 100%;*/

	/* border: 1px solid #e7ecf1; */
	padding: 2px 20px 0 20px;
	background: #fff;
	line-height: 60px;
}

.homepage_select h1 {
	border-bottom: 2px solid #444;
	text-align: left;
	text-indent: 20px;
	font-size: 22px;
	width: 100%;
	height: 60px;
}

.homepage_select i {
	margin-top: 10px;
	margin-left: 20px;
	font-size: 20px;
}

.homepage_select ul {
	list-style: none;
	overflow: hidden;
}

.homepage_select ul li {
	height: 40px;
	border-bottom: 1px solid #e7ecf1;
	line-height: 20px;
	margin: 20px 0px;
}

.homepage_select ul li span:nth-of-type(1) i {
	margin-right: 10px;
}

.homepage_select ul li button {
	width: 100px;
	height: 24px;
	line-height: 24px;
	display: inline-block;
	border: none;
	outline: none;
	font-size: 12px;
	color: green;
	/*background: rgba(66,66,66, 0.8);*/
	transition: all .2s linear 0s;
	background: #fff;
	text-align: left;
	text-decoration: underline;
}

.homepage_select ul li button:hover {
	/*background: rgba(66,66,66, 0.8);*/
	/*background: rgb(66,66,66);*/
	text-decoration: underline;
}

.homepage_select ul li:nth-of-type(1) span:nth-child(3) {
	margin-left: 20px;
}

.homepage_select ul li:nth-of-type(2) span:nth-child(3) {
	margin-left: 20px;
}

.homepage_select ul li:nth-of-type(1) span:nth-child(4) {
	margin-left: 40px;
	color: #ccc;
	font-size: 14px;
}

.homepage_select ul li:nth-of-type(1) button {
	float: right;
	margin-right: 20px;
	cursor: pointer;
}

.homepage_select ul li:nth-of-type(2) span:nth-child(4) {
	margin-left: 40px;
	color: #ccc;
	font-size: 14px;
}

.homepage_select ul li:nth-of-type(2) button {
	float: right;
	margin-right: 20px;
	cursor: pointer;
}


/* 
	.homepage_select ul li:nth-of-type(3) span:nth-child(1) i {
		color: green;
		font-size: 22px;
	} */

.homepage_select ul li:nth-of-type(3) span:nth-child(3) {
	margin-left: 110px;
	font-size: 14px;
}

.homepage_select ul li:nth-of-type(3) button {
	float: right;
	margin-right: 20px;
	cursor: pointer;
}

.homepage_select ul li .right {
	color: green;
	font-size: 22px;
}

.homepage_select ul li .err {
	color: red;
}

.homepage_select ul li button.disabled {
	color: #bfcbd9;
	text-decoration: none;
}

</style>

<script>
import { updateEmail } from '../../../api/modifyEmail.api'
import $ from 'jquery'
import request from 'superagent'
import { host } from '../../../config/index.js'
import {mapState, mapActions, mapGetters } from 'vuex'  
export default {
	name: 'HomePage',
	data: function () {
		return {
			imageUrl: '',
			phoneNoBand: '',
			btnDisabled: false,
			updateEmail: '',
			name: '',
			userName: '',
			phone: null,
			email: null,
			telBinded: false,
			emailBinded: false,
			editPhone: true
		}
	},
	computed:{
		...mapGetters(['franchiseeUserIconUrl'])
	},
	methods: {
		...mapActions(['setfranchiseeUserIconUrl']),
		beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png')
			const isLt2M = file.size / 2048 / 2048 < 2
			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG、JPEG、PNG 格式!')
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		},
		handleAvatarSuccess(res, file) {
			//this.imageUrl = URL.createObjectURL(file.raw)
		},
		uploadWay(file) {
			var that = this
			var reader = new FileReader();
			reader.readAsDataURL(file.file);
			reader.onload = function (e) {
				var res = this.result
				that.imageUrl = res
				request
					.post(host + 'beepartner/franchisee/Own/getFaceImageUrl')
					.withCredentials()
					.set({
						'content-type': 'application/x-www-form-urlencoded'
					})
					.send({
						'file': that.imageUrl
					})
					.end((err, res) => {
						if (err) {
							console.log('err:' + err)
						} else {
							if (JSON.parse(res.text).resultCode === 1) {
								that.$message({
									type: 'success',
									message: JSON.parse(res.text).message
								})
								that.getInfo()
							} else {
								that.$message({
									type: 'warning',
									message: JSON.parse(res.text).message
								})
							}
						}
					})
			}
		},
		modifyEmail() {
			this.$prompt('请输入邮箱', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				inputErrorMessage: '邮箱格式不正确'
			}).then(({ value }) => {
				// if(value) {
				// 	updateEmail(
				// 		{	
				// 			id: 1123339,
				// 			email: '123@.com'
				// 		},function(error,res){

				// 	})
				// }
				this.$message({
					type: 'success',
					message: '你的邮箱是: ' + value
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				})
			})
		},
		verify_tel() {
			this.$prompt('请输入手机号', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /0?(13|14|15|18)[0-9]{9}/,
				inputErrorMessage: '手机格式不正确'
			}).then(({ value }) => {
				this.$message({
					type: 'success',
					message: '你的手机号是: ' + value
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				})
			})
		},
		getInfo() {
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
						if (JSON.parse(res.text).data) {
							this.name = JSON.parse(res.text).data.name
							this.userName = JSON.parse(res.text).data.userName
							this.phone = JSON.parse(res.text).data.phoneNo
							this.phoneNoBand = JSON.parse(res.text).data.phoneNoBand
							this.imageUrl = JSON.parse(res.text).data.franchiseeUserIconUrl
							this.setfranchiseeUserIconUrl(this.imageUrl)
							if (this.phoneNoBand === 0) {
								this.btnDisabled = false
								this.telBinded = false
								// 没有绑定手机号时，修改手机号功能影藏。
								this.editPhone = false
							} else {
								this.btnDisabled = true
								this.telBinded = true

								this.editPhone = true
							}

						}
					}
				})
		}
	},
	mounted() {

		this.imageUrl = this.franchiseeUserIconUrl
		this.getInfo()
		$(".sign").removeClass('is-active')
		$('.sign[name="1600"]').addClass('is-active')
	},
	watch: {
		'$route': 'getInfo'
	}
}
</script>

