<template>
  	<div class="topnav">
		<el-menu :default-active="activeIndex" :class="activeIndex=='2'||activeIndex=='3'||activeIndex=='4'?'el-menu-demo':''" mode="horizontal" background-color="#3A485D" text-color="#ffffff" active-text-color="#FFD302" @select="routerPath">
		  	<el-menu-item index="1" :class="activeIndex==1?'isIndex':''">
				<img :src="topIcon" class="icon">  
				医维度
			</el-menu-item>
			<el-menu-item index="2" :class="activeIndex==2?'isIndex':''">
				个人版
			</el-menu-item>
			<el-menu-item index="3" :class="activeIndex==3?'isIndex':''">
				企业版
			</el-menu-item>
			<el-menu-item index="4" :class="activeIndex==4?'isIndex':''">
				自测练习
			</el-menu-item>
			<el-menu-item index="5" :class="activeIndex==5?'isIndex':''">
				软件下载
			</el-menu-item>
			<el-menu-item index="6" :class="activeIndex==6?'isIndex':''">
				功能介绍
			</el-menu-item>
	  	</el-menu>
		<div>
			<div class="searchBox">
				<img :src="require('../../static/image/top/icon_search@2x.png')" @click="searchAll">
				<input type="text" placeholder="搜索标本、视频以及更多内容"  @input="changVal($event)" :value="searchval">
				<div class="btnBox">
					<p @click="searchAll">搜全站</p>|<p @click="searchPage">搜本页</p>
				</div>
			</div>
			<div class="userBox" @click="isLogin">
				<img :src="arrUser?arrUser.avatar?arrUser.avatar:require('../../static/image/top/icon_user@2x.png'):require('../../static/image/top/icon_user@2x.png')">
				<p>{{arrUser?arrUser.nickname?arrUser.nickname:'用户名':'用户名'}}</p>
			</div>
		</div>
		<!-- 登陆、注册、忘记密码 -->
		<el-dialog title="登陆" :visible.sync="logoVisible" :append-to-body="true" :close-on-click-modal="false" center custom-class="login" top="341px">
			<el-form :model="logoform" label-width="70px" :rules="logorules" ref="logoform">
				<el-form-item label="账号" prop="name">
					<el-input v-model="logoform.name" type="text" placeholder="请输入账号" autocomplete="on" name="logoformName"></el-input>
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
					<img :src="require('../../static/image/top/icon_qq@2x.png')" @click="thirdParty('qq')">
					<img :src="require('../../static/image/top/icon_wechat@2x.png')" @click="thirdParty('wechat')">
				</div>
			</div>
		</el-dialog>
		<!-- 忘记密码 -->
		<el-dialog title="忘记密码" :visible.sync="forgetVisible" :append-to-body="true" :close-on-click-modal="false" center custom-class="forget" top="332px">
			<el-form :model="forgetform" label-width="100px" :rules="forgetrules" ref="forgetform">
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
		<el-dialog title="注册" :visible.sync="regVisible" :append-to-body="true" :close-on-click-modal="false" center custom-class="regUser" top="332px">
			<el-form :model="regform" label-width="100px" :rules="forgetrules" ref="regform">
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
		<el-dialog title="通知" :visible.sync="toastVisible" :append-to-body="true" :close-on-click-modal="false" center custom-class="regUser toast" top="300px" @close="Toastclose()">
			<div>亲爱的医维度用户您好！</div>
			<div class="txt">
      			温馨提示您，当前版本已更新，如有疑问，请扫描下方二维码，关注“医维度”公众号，咨询客服人员。感谢您的配合！
			</div>
			<img :src="require('../../static/image/top/pic_ewm@2x.png')" alt="">
			<p>扫描二维码，关注医维度公众号</p>
		</el-dialog>
		<!-- 绑定手机 -->
        <el-dialog title="绑定手机" :visible.sync="bindPhone" :append-to-body="true" :close-on-click-modal="false" center custom-class="bindPhone" top="246px">
			<el-form :model="phoneform" label-width="80px" :rules="phonerules" ref="phoneform">
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="phoneform.phone" type="text" placeholder="请输入手机号"></el-input>
				</el-form-item>
                <el-form-item label="验证码" prop="regtxt">
					<el-input v-model="phoneform.regtxt" type="text" placeholder="请输入验证码"></el-input>
                    <p @click="getForgetRegb">{{forgetStr}}</p>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="phoneBind('phoneform')">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 加入组织 -->
        <el-dialog title="加入组织" :visible.sync="joinIntop" :append-to-body="true" :close-on-click-modal="false" center :custom-class="arrUser.user_status==2?'joinIntop':'joinIntop shenHe'" top="246px">
			<p>
				您当前的账号为个人版，查看企业版内容需要加入企业用户组，升级为企业版账号。如果您所在的院校或企业已购买企业版并为您提供了邀请码，请在下方输入相关信息升级为企业版账号，企业版账号拥有全站查看权限！
			</p>
			<el-form :model="joinform" label-width="80px" :rules="joinrules" ref="joinform"  v-if="arrUser.user_status==2">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="joinform.name" type="text" placeholder="请输入姓名"></el-input>
				</el-form-item>
                <el-form-item label="学号" prop="job">
					<el-input v-model="joinform.job" type="text" placeholder="请输入学号"></el-input>
				</el-form-item>
                <el-form-item label="邀请码" prop="code">
					<el-input v-model="joinform.code" type="text" placeholder="请输入邀请码"></el-input>
				</el-form-item>
			</el-form>
			<el-form  label-width="60px"   v-if="arrUser.user_status==3">
				<el-form-item label="姓名">
					<el-input :value="arrUser.realname" type="text" placeholder="请输入姓名" disabled></el-input>
				</el-form-item>
                <el-form-item label="学号">
					<el-input :value="arrUser.student_id" type="text" placeholder="请输入学号" disabled></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="joinInclicktop('joinform')" v-if="arrUser.user_status==2">确 定</el-button>
				<el-button type="primary" v-if="arrUser.user_status==3">审核中</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import {register,getUserCode,passwordReset,login,socials,wechatwebcallback,mobilebind,qqcallback,wechatBind,QQBind,qqcode2user} from '../services/api/topnav'
import {info,user_mobile_code,joinReq} from '../services/api/personal'
import CryptoJS from 'crypto-js';
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
					{ required: true, message: '请输入账号', trigger: 'blur' },
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
			bindPhone:false,
			phoneform:{
                phone:'',
                regtxt:''
            },
            phonerules:{
                phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator: checkPhone, trigger: 'blur'}
                ],
                regtxt:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ]
            },
			bindData:{},
			joinIntop:false,
			joinform:{
				name:'',
				job:'',
				code:''
			},
			joinrules:{
				name:[
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				],
				job:[
					{ required: true, message: '请输入工号', trigger: 'blur' },
				],
				code:[
					{ required: true, message: '请输入邀请码', trigger: 'blur' },
				]
			}
		}
	},
	store,
	created(){
		// 判断搜索值
		this.searchstr=this.searchval;
		// 判断确认弹窗
		this.toastVisible=localStorage.getItem('toastVisible')?false:true;
		// 判断微信、QQ登陆弹窗;微信、QQ绑定
		if(this.getQueryString('code')&&this.getQueryString('state')){
			if(this.arrUser&&!this.arrUser.weixin){
				let data={};
				data['token']=this.arrUser.token;
				data['code']=this.getQueryString('code');
				data['type']='web';
				wechatBind(data).then((res)=>{
					if(res.data.code==0){
						this.alertTxt({'msg':res.data.msg,'type':'success'});
						info().then((res)=>{
							if(res.data.code==-200){
								localStorage.removeItem('token');
								this.changeUser('');
								this.$router.push('/');
							}else{
								this.changeUser(JSON.stringify(res.data.data));
							}
						})
					}else{
						this.alertTxt({'msg':res.data.msg,'type':'error'});
					}
				})
			}else{
				let data={};
				data['code']=this.getQueryString('code');
				wechatwebcallback(data).then((res)=>{
					if(res.data.code==422){
						this.bindPhone=true;
						this.bindData=res.data.data;
					}else if(res.data.code==0){
						this.alertTxt({'msg':res.data.msg,'type':'success'});
						this.changeUser(JSON.stringify(res.data.data));
						localStorage.setItem('token',res.data.data.token);
					}
				})
			}
		}else if(this.getQueryString('code')&&!this.getQueryString('state')){
			if(this.arrUser&&!this.arrUser.qq){
				let data={};
				data['code']=this.getQueryString('code');
				data['path']='https://www.evdo.vip/web/#'+this.$route.path;
				qqcode2user(data).then((res)=>{
					if(res.data.code==0){
						let data={};
						data['token']=this.arrUser.token;
						data['nickname']=res.data.data.qq_nickname;
						data['unionid']=res.data.data.qq_unionid;
						data['openid']=res.data.data.qq_openid;
						QQBind(data).then((res)=>{
							if(res.data.code==0){
								this.alertTxt({'msg':res.data.msg,'type':'success'});
								info().then((res)=>{
									if(res.data.code==-200){
										localStorage.removeItem('token');
										this.changeUser('');
										this.$router.push('/');
									}else{
										this.changeUser(JSON.stringify(res.data.data));
									}
								})
							}else{
								this.alertTxt({'msg':res.data.msg,'type':'error'});
							}
						})
					}else{
						// this.alertTxt({'msg':res.data.msg,'type':'error'});
					}
				})
			}else{
				let data={};
				data['code']=this.getQueryString('code');
				data['path']='https://www.evdo.vip/web/#'+this.$route.path;
				qqcallback(data).then((res)=>{
					if(res.data.code==422){
						this.bindPhone=true;
						this.bindData=res.data.data;
					}else if(res.data.code==0){
						this.alertTxt({'msg':res.data.msg,'type':'success'});
						this.changeUser(JSON.stringify(res.data.data));
						localStorage.setItem('token',res.data.data.token);
					}
				})
			}
		}
		// 判断获取验证码倒计时
		if(localStorage.getItem('endTime')&&localStorage.getItem('endTime')>new Date().getTime()){
			this.forgetTime();
		}
		// 判断用户登录失效
		info().then((res)=>{
			if(res.data.code==-200){
				localStorage.removeItem('token');
				this.changeUser('');
				if(this.activeIndex=='8'||this.activeIndex=='3'||this.activeIndex=='4'){
                	this.$router.push('/');
				}
			}else{
				this.changeUser(JSON.stringify(res.data.data));
			}
		});
		// 判断账号密码
		if(localStorage.getItem('loginName')&&localStorage.getItem('loginPwd')){
			this.logoform.name=localStorage.getItem('loginName');
			this.logoform.pwd=this.decryptBy(localStorage.getItem('loginPwd'));
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
		...mapMutations(["forgetTime","changeSearch","alertTxt","changeUser"]),
		// 改变搜索框内容
		changVal(e){
			this.searchstr=e.target.value;
			this.changeSearch(this.searchstr);
		},
		// 全站查询
		searchAll(){
			if(this.activeIndex=='0'){
				this.$emit('searchFu',this.searchval)
			}else{
				this.$router.push({
					path:'/search',
					query:{
						val:this.searchval
					}
				})
			}
		},
		// 搜索本页
		searchPage(){
			if(this.activeIndex=='0'||this.activeIndex=='2'||this.activeIndex=='3'){
				this.$emit('searchPage',this.searchval)
			}else{
				 this.$alert('此页面不支持本页搜索','提示',{
					confirmButtonText:'确定',
					center:true,
					callback:()=>{
					}
				})
			}
		},
		// 是否登录
		isLogin(){
			info().then((res)=>{
				if(res.data.code==-200){
					localStorage.removeItem('token');
					this.changeUser('');
					if(this.activeIndex=='8'||this.activeIndex=='3'||this.activeIndex=='4'){
						this.$router.push('/');
					}else{
						this.logoVisible=true;
					}
				}else{
					this.$router.push('/personal')
				}
			})
		},
		// 弹出登陆弹窗
		jumpLogin(){
			this.logoVisible=true;
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
							this.alertTxt({'msg':res.data.msg,'type':'success'});
							this.logoVisible=false;
							this.changeUser(JSON.stringify(res.data.data));
							localStorage.setItem('token',res.data.data.token);
							localStorage.setItem('loginName',data.username);
							localStorage.setItem('loginPwd',this.encryptBy(data.password));
							// this.$router.go(0);
						}else{
							this.alertTxt({'msg':res.data.msg,'type':'error'});
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
							this.alertTxt({'msg':res.data.msg,'type':'success'});
							localStorage.setItem('endTime',new Date().getTime()+60000);
							this.forgetTime();
						}else{
							this.alertTxt({'msg':res.data.msg,'type':'error'});
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
		// 获取验证码绑定手机
		getForgetRegb(){
			const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			if(reg.test(this.phoneform.phone)){
				if(this.forgetStr=='获取验证码'){
                    user_mobile_code({mobile:this.phoneform.phone,type:'none'}).then((res)=>{
                        if(res.data.code==0){
							this.alertTxt({'msg':res.data.msg,'type':'success'});
							localStorage.setItem('endTime',new Date().getTime()+60000);
							this.forgetTime();
						}else{
							this.alertTxt({'msg':res.data.msg,'type':'error'});
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
					message: '请输入有效的手机号',
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
							this.alertTxt({'msg':res.data.msg,'type':'success','fun':()=>{this.forgetVisible=false}});
						}else{
							this.alertTxt({'msg':res.data.msg,'type':'error'});
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
							this.alertTxt({'msg':res.data.msg,'type':'success','fun':()=>{this.regVisible=false}});
						}else{
							this.alertTxt({'msg':res.data.msg,'type':'error'});
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
				info().then((res)=>{
					if(res.data.code==-200){
						localStorage.removeItem('token');
						this.changeUser('');
						if(this.activeIndex=='8'||this.activeIndex=='3'||this.activeIndex=='4'){
							this.$router.push('/');
						}else{
							// this.$alert('请登录后访问此页面','提示',{
							// 	confirmButtonText:'确 定',
							// 	center:true,
							// 	callback:()=>{
							// 		this.$router.go(0);
							// 	}
							// })
							this.logoVisible=true;
						}
					}else{
						if(res.data.data.is_enterprise){
							this.$router.push({path:'/enterprise'})
						}else{
							// this.$alert('此页面需企业级账号权限，请加入组织后访问','提示',{
							// 	confirmButtonText:'确 定',
							// 	center:true,
							// 	callback:()=>{
							// 		// this.$router.go(0);
							// 	}
							// })
							this.showJoin();
						}
					}
				})
			}else if(key==6){
				this.$router.push({path:'/fslist'})
			}else if(key==5){
				this.$router.push({path:'/downLoad'})
			}else if(key==4){
				info().then((res)=>{
					if(res.data.code==-200){
						localStorage.removeItem('token');
						this.changeUser('');
						if(this.activeIndex=='8'||this.activeIndex=='3'||this.activeIndex=='4'){
							this.$router.push('/');
						}else{
							// this.$alert('请登录后访问此页面','提示',{
							// 	confirmButtonText:'确 定',
							// 	center:true,
							// 	callback:()=>{
							// 		this.$router.go(0);
							// 	}
							// })
							this.logoVisible=true;
						}
					}else{
						this.$router.push({path:'/exercise'})
					}
				})
			}
		},
		// 通知窗口关闭回调
		Toastclose(){
			localStorage.setItem('toastVisible',true);
		},
		// 第三方登录
		thirdParty(str){
			if(str=='wechat'){
				let data={};
				data['type']=str;
				data['path']='web/#'+this.$route.path;
				socials(data).then((res)=>{
					if(res.data.code==0){
						window.location.href=res.data.data;
					}else{
						this.alertTxt({'msg':res.data.msg,'type':'error'});
					}
				})
			}else{
				let url=encodeURIComponent('https://www.evdo.vip/web/#');
				window.location.href=`https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101952659&redirect_uri=${url}&scope=scope`;
			}
		},
		// 绑定手机号
		phoneBind(formName){
			this.$refs[formName].validate((valid)=>{
				if(valid){
					let data=this.bindData;
					data['mobile']=this.phoneform.phone;
					data['mobile_code']=this.phoneform.regtxt;
					mobilebind(data).then((res)=>{
						if(res.data.code==0){
							this.alertTxt({'msg':res.data.msg,'type':'success'});
							this.changeUser(JSON.stringify(res.data.data));
							localStorage.setItem('token',res.data.data.token);
							this.bindPhone=false;
						}else{
							this.alertTxt({'msg':res.data.msg,'type':'error'});
						}
					})
				}
			})
		},
		// 获取路径参数
		getQueryString(name) {
			let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			if(window.location.hash.indexOf("?") < 0){
					return null;
			}
			let r = window.location.hash.split("?")[1].match(reg); 　　
			if (r != null) return decodeURIComponent(r[2]); 
		　　    return null; 
		},
		// 加入组织
		showJoin(){
			this.joinIntop=true;
		},
		joinInclicktop(formName){
             this.$refs[formName].validate((valid)=>{
                if(valid){
                    let data={};
                    data["code"]=this.joinform.code;
                    data["name"]=this.joinform.name;
                    data["student_id"]=this.joinform.job;
                    joinReq(data).then((res)=>{
                        if(res.data.code==0){
                            this.alertTxt({msg:res.data.msg,type:'success'});
                            this.joinIntop=false;
                            let arr=this.arrUser;
                            arr.user_status=3;
                            info().then((res)=>{
								if(res.data.code==0){
									this.changeUser(JSON.stringify(res.data.data));
								}else if(res.data.code==200){
									localStorage.removeItem('token');
									this.changeUser('');
								}
							})
                        }else{
                            this.alertTxt({msg:res.data.msg,type:'error'});
                        }
                    })
                }
			})
        },
		// 加密
		encryptBy(message){
			var key = '12345678';
			function encryptByDES (message, key) {
			var keyHex = CryptoJS.enc.Utf8.parse(key)
			var option = {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7}
			var encrypted = CryptoJS.DES.encrypt(message, keyHex, option)
			return encrypted.ciphertext.toString()
			}
			return encryptByDES(message, key);
		},
		// 解密
		decryptBy(message){
			var key = '12345678';
			//DES  ECB模式解密
			function decryptByDES(message,key){
			var keyHex = CryptoJS.enc.Utf8.parse(key);
			var decrypted = CryptoJS.DES.decrypt({
			ciphertext: CryptoJS.enc.Hex.parse(message)
			}, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
			});
			var result_value = decrypted.toString(CryptoJS.enc.Utf8);
			return result_value;
			}
			return decryptByDES(message, key);
		}
	},
	computed:mapState(["forgetReg","forgetStr","searchval","arrUser"])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	/* 登录、注册、忘记密码 */
	.el-dialog .el-dialog__header{
        padding: 0;
        height: 44px;
        background: #F1F4F5;
        border-radius: 10px 10px 0 0;
        line-height: 44px;
    }
	.el-dialog .el-dialog__header .el-dialog__title{
		font-size: 16px;
		display: inline-block;
		height: 44px;
		line-height: 44px;
	}
    .el-dialog .el-dialog__header .el-dialog__headerbtn{
        top:15px;
    }
	.el-dialog,.login.el-dialog,.bindPhone.el-dialog,.regUser.el-dialog{
		border-radius: 10px;
	}
	/* login */
	.login.el-dialog{
		width: 360px;
		height: 398px;
	}
	.el-dialog .el-dialog__body{
		padding: 30px 27px 0 27px!important;
	}
	.el-dialog .el-dialog__body .el-form-item__label{
		padding-right: 20px;
		font-size: 16px;
		color: #666;
		text-align: left;
	}
	.el-dialog .el-dialog__body .el-form-item{
		margin-bottom: 16px;
	}
	.el-dialog .el-button{
		width: 200px;
		height: 44px;
		font-size: 16px;
		border-radius: 0;
	}
	/* reguser */
	.regUser.el-dialog,.forget.el-dialog{
		width: 380px;
		height: 417px;
	}
	.bindPhone.el-dialog{
		width: 380px;
		height: 280px;
	}
	.toast.el-dialog{
		width: 380px;
		height: 480px;
		border-radius: 10px;
	}
	.toast.el-dialog .el-dialog__body{
		padding-left: 40px !important;
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
	.joinIntop.el-dialog{
		width: 360px;
		height: 500px;
		border-radius: 10px;
	}
	.joinIntop.shenHe.el-dialog{
		height: 440px;
	}
	.joinIntop.shenHe.el-dialog .el-button--primary{
		background-color: #96BAFA;
		border: 1px solid #96BAFA;
	}
	.joinIntop.el-dialog .el-dialog__body{
		padding: 25px !important;
	}
	.joinIntop.el-dialog p{
		width: 100%;
		font-size: 16px;
		margin-bottom: 30px;
	}
	.joinIntop.el-dialog .dialog-footer{
		margin-top:-30px !important;
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
	.topnav .el-menu>.el-menu-item.is-active{
		color: #fff !important;
		border-bottom-color: transparent !important;
	}
	.topnav .el-menu-demo>.el-menu-item.isIndex{
		color: #FFD302 !important;
		border-bottom-color: transparent;
		background-color:#576376  !important;
	}
	.topnav .el-menu>.el-menu-item.isIndex{
		color: #FFD302 !important;
	}
	.topnav .el-menu{
		width: 700px;
	}
	.topnav .el-menu>.el-menu-item{
		font-size: 18px;
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
		background-color: #3A485D;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}
	.topnav>div{
		display: flex;
	}
	.icon{
		width: 28px;
		height: 32px;
		margin-right: 5px;
	}
	.searchBox{
		width: 410px;
		height: 35px;
		border: 1px solid #FFFFFF;
		border-radius: 5px;
		display: flex;
		align-items: center;
		padding-left: 10px;
		box-sizing: border-box;
		/* position: absolute;
		top:12.5px;
		right: 230px; */
		z-index: 1;
		margin-right: 150px;
	}
	.searchBox img{
		width: 21.41px;
		height: 21.42px;
		margin-right: 10px;
	}
	.searchBox input{
		width: 190px;
		height: 28px;
		background-color: #3A485D;
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
		width:230px;
		height: 100%;
		display: flex;
		align-items: center;
		color: #fff;
		position: sticky;
		top:0;
		right: 0;
		z-index: 1;
		font-size: 16px;
		/* margin-left: 50px;
		margin-right: 80px; */
		background-color: #3A485D;
	}
	.userBox:hover{
		cursor: pointer;
	}
	.userBox img{
		width: 32px;
		height: 32px;
		margin-right: 5px;
		border-radius: 16px;
	}
	.userBox p{
		height: 36.19px;
		line-height: 36.19px;
		overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
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
		font-size: 14px;
		color: #999;
	}
	.fdiv3 img{
		width:44px;
		height: 44px;
		margin:0 5px;
	}
	.fdiv3 img:hover{
		cursor: pointer;
	}
</style>
