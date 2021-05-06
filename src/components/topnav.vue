<template>
  	<div class="topnav">
		<el-menu :default-active="activeIndex" :class="activeIndex=='2'||activeIndex=='3'||activeIndex=='4'?'el-menu-demo':''" mode="horizontal" background-color="#252B43" text-color="#ffffff" active-text-color="#FFD302" @select="routerPath">
		  	<el-menu-item index="1">
				<img :src="topIcon" class="icon">  
				医维度
			</el-menu-item>
			<el-menu-item index="2">
				专业版
			</el-menu-item>
			<el-menu-item index="3">
				企业版
			</el-menu-item>
			<el-menu-item index="4">
				自测练习
			</el-menu-item>
			<el-menu-item index="5">
				软件下载
			</el-menu-item>
			<el-menu-item index="6">
				功能介绍
			</el-menu-item>
	  	</el-menu>
		<div class="searchBox">
			<img src="../../static/image/top/icon_search@2x.png" @click="searchAll">
			<input type="text" placeholder="搜索标本、视频以及更多内容"  @input="changVal($event)" :value="searchstr">
			<div class="btnBox">
				<p @click="searchAll">搜全站</p>|<p @click="searchPage">搜本页</p>
			</div>
		</div>
		<div class="userBox" @click="isLogin">
			<img :src="arrUser?arrUser.avatar?arrUser.avatar:'../../static/image/top/icon_user@2x.png':'../../static/image/top/icon_user@2x.png'">
			<p>{{arrUser?arrUser.nickname?arrUser.nickname:'用户名':'用户名'}}</p>
		</div>
		<!-- 登陆、注册、忘记密码 -->
		<el-dialog title="登陆" :visible.sync="logoVisible" :append-to-body="true" :close-on-click-modal="false" center>
			<el-form :model="logoform" label-width="80px" :rules="logorules" ref="logoform">
				<el-form-item label="账号" prop="name">
					<el-input v-model="logoform.name" type="text" placeholder="请输入手机号或邮箱"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input v-model="logoform.pwd" type="password" placeholder="请输入密码"></el-input>
					<p @click="forgetPwd">忘记密码?</p>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="login('logoform')">登 录</el-button>
				<div class="fdiv1">还没有账号？<span @click="openReg">注册</span></div>
				<div class="fdiv2">用第三方账号登录</div>
				<div class="fdiv3">
					<img src="../../static/image/top/icon_qq@2x.png">
					<img src="../../static/image/top/icon_wechat@2x.png">
				</div>
			</div>
		</el-dialog>
		<!-- 忘记密码 -->
		<el-dialog title="忘记密码" :visible.sync="forgetVisible" :append-to-body="true" :close-on-click-modal="false" center custom-class="forget" top="13vh">
			<el-form :model="forgetform" label-width="80px" :rules="forgetrules" ref="forgetform">
				<el-form-item label="账号" prop="phone">
					<el-input v-model="forgetform.phone" type="text" placeholder="请输入手机号或邮箱"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input v-model="forgetform.pwd" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="truePwd">
					<el-input v-model="forgetform.truePwd" type="password" placeholder="请确定密码"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="regStr">
					<el-input v-model="forgetform.regStr" type="text" placeholder="请输入验证码"></el-input>
					<p @click="getForgetReg(forgetform.phone)">{{forgetStr}}</p>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="changePwd('forgetform')">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 注册 -->
		<el-dialog title="注册" :visible.sync="regVisible" :append-to-body="true" :close-on-click-modal="false" center custom-class="forget regUser" top="13vh">
			<el-form :model="regform" label-width="80px" :rules="forgetrules" ref="regform">
				<el-form-item label="账号" prop="phone">
					<el-input v-model="regform.phone" type="text" placeholder="请输入手机号或邮箱"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input v-model="regform.pwd" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="truePwd">
					<el-input v-model="regform.truePwd" type="password" placeholder="请确定密码"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="regStr">
					<el-input v-model="regform.regStr" type="text" placeholder="请输入验证码"></el-input>
					<p @click="getForgetReg(regform.phone)">{{forgetStr}}</p>
				</el-form-item>
				<!-- <el-form-item label="邀请码" prop="inviteStr">
					<el-input v-model="regform.inviteStr" type="text" placeholder="请输入邀请码"></el-input>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="regUser('regform')">注 册</el-button>
				<div class="fdiv1">
					已有账号，<span @click="regVisible=false">马上登录</span>
				</div>
			</div>
		</el-dialog>
		<!-- 提示 -->
		<el-dialog title="通知" :visible.sync="toastVisible" :append-to-body="true" :close-on-click-modal="false" center custom-class="regUser toast" top="13vh" @close="Toastclose()">
			<div>亲爱的医维度用户您好！</div>
			<div class="txt">
				 温馨提示您，版本更新后，取消会员积分充值规则，现可开通专业版会员享更多资源，或加入组织成为企业版用户，享全站查看权限。您之前的会员积分现已转换成超值会员时长，详情可至个人中心查看。如有疑问，请扫描下方二维码，关注“医维度”公众号，咨询客服人员。感谢您的配合！
			</div>
			<img src="../../static/image/top/pic_ewm@2x.png" alt="">
			<p>扫描二维码，关注医维度公众号</p>
		</el-dialog>
  </div>
</template>

<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import {register,getUserCode,passwordReset,login} from '../services/api/topnav';
export default {
	data () {
		// 验证手机号
		var checkPhone = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入有效的手机号或邮箱'));
			} else {
				const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
				const emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if (reg.test(value)||emailreg.test(value)) {
					callback();
				} else {
					return callback(new Error('请输入有效的手机号或邮箱'));
				}
			}
		};
		// 确认密码
		var truePwd=(rule,value,callback)=>{
			if(!value){
				return callback(new Error('请确认密码'))
			}else{
				let pwd=this.forgetVisible?this.forgetform.pwd:this.regform.pwd;
				if(value!=pwd){
					return callback(new Error('两次密码不一致'));
				}else{
					callback();
				}
			}
		}
		return {
			searchstr:'',
			logoVisible:false,
			forgetVisible:false,
			regVisible:false,
			toastVisible:true,
			logoform:{
				name:'',
				pwd:''
			},
			logorules:{
				name:[
					{ required: true, message: '请输入手机号或邮箱', trigger: 'blur' },
					{validator: checkPhone, trigger: 'blur'}
				],
				pwd:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{min:6,message: '密码不能小于6个字符', trigger: 'blur' }
				]
			},
			forgetform:{
				phone:'',
				pwd:'',
				truePwd:'',
				regStr:''
			},
			forgetrules:{
				phone:[
					{ required: true, message: '请输入手机号或邮箱', trigger: 'blur' },
					{validator: checkPhone, trigger: 'blur'}
				],
				pwd:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{min:6,message: '密码不能小于6个字符', trigger: 'blur' }
				],
				truePwd:[
					{ required: true, message: '请确认密码', trigger: 'blur' },
					{validator: truePwd, trigger: 'blur'}
				],
				regStr:[{ required: true, message: '请输入验证码', trigger: 'blur' }]
			},
			regform:{
				phone:'',
				pwd:'',
				truePwd:'',
				regStr:'',
				inviteStr:''
			},
			arrUser:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):''
		}
	},
	store,
	created(){
		this.searchstr=this.searchval;
		this.toastVisible=localStorage.getItem('toastVisible')?false:true;
		if(localStorage.getItem('endTime')&&localStorage.getItem('endTime')>new Date().getTime()){
			this.forgetTime();
		}
	},
	props: {
		topIcon: {
			type: String,
		},
		activeIndex: {
			type: String,
		}
	},
	methods:{
		...mapMutations(["forgetTime","changeSearch"]),
		// 改变搜索框内容
		changVal(e){
			this.searchstr=e.target.value;
			this.changeSearch(this.searchstr);
		},
		// 全站查询
		searchAll(){
			this.changeSearch(this.searchstr);
			if(this.activeIndex=='0'){
				this.$emit('searchFu',this.searchstr)
			}else{
				this.$router.push({
					name:'Search',
					params:{
						val:this.searchstr
					}
				})
			}
		},
		// 搜索本页
		searchPage(){
			if(this.activeIndex=='0'||this.activeIndex=='2'||this.activeIndex=='3'){
				this.$emit('searchPage',this.searchstr)
			}else{
				 this.$alert('此页面不支持本页搜索','提示',{
					confirmButtonText:'确定',
					center:true,
					callback:()=>{
						console.log('确定')
					}
				})
			}
		},
		// 是否登录
		isLogin(){
			let arr=localStorage.getItem('user');
			if(arr){
				this.$router.push('/personal')
			}else{
				this.logoVisible=true;
			}
		},
		// 登录
		login(formName){
			this.$refs[formName].validate((valid)=>{
				let data={};
				if(valid){
					data["username"]=this.logoform.name;
					data["password"]=this.logoform.pwd;
					login(data).then((res)=>{
						if(res.data.code==0){
							this.$message({
								showClose: true,
								message: res.data.msg,
								type:'success',
								onClose:()=>{
									this.logoVisible=false;
								}
							});
							localStorage.setItem('user',JSON.stringify(res.data.data));
							this.arrUser=res.data.data;
						}else{
							this.$message({
								showClose: true,
								message: res.data.msg,
								type:'error'
							});
						}
					})
				}
			})
		},
		// 忘记密码
		forgetPwd(){
			this.forgetVisible=true;
		},
		// 获取验证码
		getForgetReg(str){
			const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			const emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(reg.test(str)||emailreg.test(str)){
				if(this.forgetStr=='获取验证码'){
					getUserCode({username:str}).then((res)=>{
						if(res.data.code==0){
							this.$message({
								showClose: true,
								message: res.data.msg,
								type:'success'
							});
							localStorage.setItem('endTime',new Date().getTime()+60000);
							this.forgetTime();
						}else{
							this.$message({
								showClose: true,
								message: res.data.msg,
								type:'error'
							});
						}
					})
				}else{
					this.$message({
						showClose: true,
						message: '请在倒计时结束后获取验证码',
					});
				}
			}else{
				 this.$message({
					showClose: true,
					message: '请输入有效的手机号或邮箱',
					type: 'error',
				});
			}
		},
		// 确定更改密码
		changePwd(formName){
			this.$refs[formName].validate((valid)=>{
				let data={};
				if(valid){
					data["username"]=this.forgetform.phone;
					data["password"]=this.forgetform.pwd;
					data["confirm_password"]=this.forgetform.truePwd;
					data["code"]=this.forgetform.regStr;
					passwordReset(data).then((res)=>{
						if(res.data.code==0){
							this.$message({
								showClose: true,
								message: res.data.msg,
								type:'success',
								onClose:()=>{
									this.forgetVisible=false;
								}
							});
						}else{
							this.$message({
								showClose: true,
								message: res.data.msg,
								type:'error'
							});
						}
					})
				}
			})
		},
		// 打开注册
		openReg(){
			this.regVisible=true;
		},
		// 注册用户
		regUser(formName){
			this.$refs[formName].validate((valid)=>{
				let data={};
				if(valid){
					data["username"]=this.regform.phone;
					data["password"]=this.regform.pwd;
					data["code"]=this.regform.regStr;
					register(data).then((res)=>{
						if(res.data.code==0){
							this.$message({
								showClose: true,
								message: res.data.msg,
								type:'success',
								onClose:()=>{
									this.regVisible=false;
								}
							});
						}else{
							this.$message({
								showClose: true,
								message: res.data.msg,
								type:'error'
							});
						}
					})
				}
			})
		},
		// 跳转路由
		routerPath(key){
			if(key==1){
				this.$router.push({path:'/'})
			}else if(key==2){
				this.$router.push({path:'/professional'})
			}else if(key==3){
				this.$router.push({path:'/enterprise'})
			}else if(key==6){
				this.$router.push({path:'/fslist'})
			}else if(key==5){
				this.$router.push({path:'/downLoad'})
			}else if(key==4){
				this.$router.push({path:'/exercise'})
			}
		},
		// 通知窗口关闭回调
		Toastclose(){
			localStorage.setItem('toastVisible',true);
		}
	},
	computed:mapState(["forgetReg","forgetStr","searchval"])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	/* 登录、注册、忘记密码 */
	.el-dialog{
		width: 450px;
		height: 420px;
		border-radius: 10px;
	}
	.forget.el-dialog{
		width: 400px;
		height: 450px;
	}
	.regUser.el-dialog{
		height: 530px;
	}
	.toast.el-dialog{
		width: 400px;
		height: 600px;
	}
	.toast.el-dialog div{
		font-size: 16px;
		color: #666;
		line-height: 30px;
		letter-spacing: 2px;
	}
	.toast.el-dialog div.txt{
		text-indent: 20px;
		text-align: left;
	}
	.toast.el-dialog img{
		width: 172px;
		height: 172px;
		display: block;
		margin: 0 auto;
	}
	.toast.el-dialog p{
		text-align: center;
		font-size: 14px;
		color: #999;
	}
	.el-dialog__header{
		border-bottom: 1px solid #ddd;
	}
	.el-dialog__body{
		padding-left:30px !important;
		padding-right:50px !important;
	}
	.toast.el-dialog .el-dialog__body{
		padding-right:30px !important;
	}
	.el-form-item{
		position: relative;
	}
	.el-form-item p{
		padding: 0;
		margin: 0;
		height: 60%;
		position: absolute;
		top:6%;
		right:10px;
		z-index: 1;
		background-color: #fff;
		color: #6495ed;
	}
	.forget .el-form-item p{
		font-size: 12px;
		color: #989898;
		top: 0;
		background-color: transparent;
	}
	.el-form-item p:hover{
		cursor: pointer;
	}
	.el-button{
		width:50%;
	}
	.el-menu.el-menu--horizontal{
		border-bottom: none !important;
	}
	.topnav .el-menu-demo>.el-menu-item.is-active{
		border-bottom: none;
		background-color: rgb(97, 101, 118)  !important;
	}
</style>
<style scoped>
	a{
		text-decoration: none;
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.topnav{
		width: 100%;
		height: 100%;
		font-size: 18px;
		padding-left: 50px;
        box-sizing: border-box;
		background-color: #252B43;
		display: flex;
		align-items: center;
		position: relative;
	}
	.icon{
		width: 28px;
		height: 32px;
		margin-right: 5px;
	}
	.searchBox{
		width: 480px;
		height: 35px;
		border: 1px solid #FFFFFF;
		border-radius: 5px;
		display: flex;
		align-items: center;
		padding-left: 10px;
		box-sizing: border-box;
		position: absolute;
		top:12.5px;
		right: 230px;
		z-index: 1;
	}
	.searchBox img{
		width: 21.41px;
		height: 21.42px;
		margin-right: 10px;
	}
	.searchBox input{
		width: 260px;
		height: 28px;
		background-color: #252B43;
		outline: none;
		border: none;
		color: #fff;
		font-size: 14px;
	}
	.searchBox .btnBox{
		width: 178.59px;
		height: 100%;
		border-radius: 0 3px 3px 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		color: #252B43;
	}
	.searchBox .btnBox p:hover,.searchBox img:hover{
		cursor: pointer;
	}
	.searchBox .btnBox p:first-child{
		width: 80px;
		font-size: 14px;
	}
	.searchBox .btnBox p:last-child{
		width: 80px;
		font-size: 14px;
	}
	.userBox{
		width:150px;
		height: 100%;
		display: flex;
		align-items: center;
		color: #fff;
		position: absolute;
		top:0;
		right: 50px;
		z-index: 1;
		font-size: 16px;
	}
	.userBox:hover{
		cursor: pointer;
	}
	.userBox img{
		width: 32px;
		height: 32px;
		margin-right: 5px;
	}
	.userBox p{
		height: 36.19px;
		line-height: 36.19px;
	}
	.fdiv1{
		height: 50px;
		line-height: 50px;
		color:#333;
		font-size: 16px;
	}
	.fdiv1 span{
		font-size: 12px;
		color: #6495ed;
	}
	.fdiv1 span:hover{
		cursor: pointer;
	}
	.fdiv2{
		margin-bottom:10px;
		font-size: 18px;
		color: #999;
	}
	.fdiv3 img{
		width:30px;
		height: 30px;
		margin:0 5px;
	}
</style>
