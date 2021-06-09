<template>
    <div class="personalItem" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div style="display:flex;justify-content: center;">
            <div class="rightBox">
                <p class="title">账户信息</p>
                <div class="upload">
                    <el-upload
                    class="avatar-uploader"
                    action="123"
                    :headers="{'Content-Type':'multipart/form-data'}"
                    :http-request="uploadFile"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload">
                    <img :src="require('../../static/image/personal/icon_xiangji@2x.png')">
                    </el-upload>
                    <img v-if="arrUser.avatar" :src="arrUser.avatar" class="avatar">
                    <img v-else :src="require('../../static/image/personal/touxiang1@2x.png')" class="avatar">
                </div>
                <div class="formBox">
                    <el-form  label-width="100px" >
                        <el-form-item label="昵称" prop="phone">
                            <el-input type="text" :value="arrUser.nickname" disabled v-if="arrUser"></el-input>
                            <p @click="showName">修改</p>
                        </el-form-item>
                        <el-form-item label="账号" prop="pwd">
                            <el-input  type="text" :value="arrUser.user_login" v-if="arrUser" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="truePwd">
                            <el-input type="password" value="123456" disabled></el-input>
                            <p @click="showPwd">修改</p>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="bindBox">
                    <div class="item">
                        <div class="left">
                            <div>
                                <img :src="arrUser.mobile?require('../../static/image/personal/icon_phone2@2x.png'):require('../../static/image/personal/icon_phone@2x.png')">
                                手机
                            </div>
                            <p>{{arrUser.mobile?arrUser.mobile:'未绑定'}}</p>
                        </div>
                        <div :class="arrUser.mobile?`btn`:`btn isbind`" @click="showPhone">{{arrUser.mobile?'修改手机':'去绑定'}}</div>
                    </div>
                    <div class="item">
                        <div class="left">
                            <div>
                                <img :src="arrUser.weixin?require('../../static/image/personal/icon_wechat2@2x.png'):require('../../static/image/personal/icon_wechat@2x.png')">
                                微信
                            </div>
                            <p>{{arrUser.weixin?'已绑定':'未绑定'}}</p>
                        </div>
                        <div :class="arrUser.weixin?`btn`:`btn isbind`" @click="showWeixin(arrUser.weixin)">{{arrUser.weixin?'解绑':'去绑定'}}</div>
                    </div>
                    <div class="item">
                        <div class="left">
                            <div>
                                <img :src="arrUser.qq?require('../../static/image/personal/icon_qq2@2x.png'):require('../../static/image/personal/icon_qq@2x.png')">
                                QQ
                            </div>
                            <p>{{arrUser.qq?'已绑定':'未绑定'}}</p>
                        </div>
                        <div :class="arrUser.qq?`btn`:`btn isbind`" @click="showQQ(arrUser.qq)">{{arrUser.qq?'解绑':'去绑定'}}</div>
                    </div>
                </div>
                <!-- <div class="loginOut" @click="logOut">退出登陆</div> -->
            </div>
            <div class="leftBox">
                <p class="title">组织信息</p>
                <div v-if="arrUser.is_enterprise&&arrUser.user_status==1">
                    <div class="formBox">
                        <el-form :model="detailform" label-width="100px"  ref="detailform">
                            <el-form-item label="院校" prop="organization">
                                <el-input v-model="detailform.organization" type="text" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="班级" prop="class">
                                <el-input v-model="detailform.class" type="text" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="detailform.name" type="text" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="学号" prop="sno">
                                <el-input v-model="detailform.sno" type="text" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="邀请码" prop="code">
                                <el-input v-model="detailform.code" type="text" disabled></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="btnBox" @click="quitGroup">
                        退出组织
                    </div>
                </div>
                <div v-else-if="!arrUser.is_enterprise" class="addZz">
                    <p>您暂时未加入任何组织</p>
                    <div class="addBtn" @click="addJoin">
                        加入组织
                    </div>
                </div>
                <!-- <div v-else-if="!arrUser.is_enterprise&&arrUser.user_status==3">
                    <div class="formBox">
                        <el-form :model="detailform" label-width="100px"  ref="detailform">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="detailform.name" type="text" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="学号" prop="sno">
                                <el-input v-model="detailform.sno" type="text" disabled></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="addBtn">
                        正在审核中
                    </div>
                </div> -->
            </div>
        </div>
        </vue-scroll>
        <!-- 修改昵称 -->
        <el-dialog title="修改昵称" :visible.sync="changeName" :append-to-body="true" :close-on-click-modal="false" center custom-class="changeName" top="13vh">
			<el-form :model="nameform" label-width="80px" :rules="namerules" ref="nameform">
				<el-form-item label="新昵称" prop="name">
					<el-input v-model="nameform.name" type="text" placeholder="请输入新的昵称"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="nameChange('nameform')">确 定</el-button>
			</div>
		</el-dialog>
        <!-- 修改密码 -->
         <el-dialog title="修改密码" :visible.sync="changePwd" :append-to-body="true" :close-on-click-modal="false" center custom-class="changePwd" top="13vh">
			<el-form :model="pwdform" label-width="80px" :rules="pwdrules" ref="pwdform">
				<el-form-item label="原密码" prop="oldPwd">
					<el-input v-model="pwdform.oldPwd" type="password" placeholder="请输入原密码"></el-input>
				</el-form-item>
                <el-form-item label="新密码" prop="newPwd">
					<el-input v-model="pwdform.newPwd" type="password" placeholder="请输入新密码"></el-input>
				</el-form-item>
                <el-form-item label="确认密码" prop="truePwd">
					<el-input v-model="pwdform.truePwd" type="password" placeholder="请再次确认新密码"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="pwdChange('pwdform')">确 定</el-button>
			</div>
		</el-dialog>
        <!-- 修改手机 -->
        <el-dialog title="修改手机" :visible.sync="changePhone" :append-to-body="true" :close-on-click-modal="false" center custom-class="changePhone" top="13vh">
			<el-form :model="phoneform" label-width="80px" :rules="phonerules" ref="phoneform">
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="phoneform.phone" type="text" placeholder="请输入手机号"></el-input>
				</el-form-item>
                <el-form-item label="验证码" prop="regtxt">
					<el-input v-model="phoneform.regtxt" type="text" placeholder="请输入验证码"></el-input>
                    <p @click="getForgetReg">{{forgetStr}}</p>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="phoneChange('phoneform')">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import {logout,info,profile,password,user_mobile_code,mobileReg,oauth2unbind,quitGroup} from '../services/api/personal'
import {socials} from '../services/api/topnav'
import axios from 'axios'
export default {
    data(){
        // 验证手机号
		var checkPhone = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入有效的手机号'));
			} else {
				const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
				if (reg.test(value)) {
					callback();
				} else {
					return callback(new Error('请输入有效的手机号'));
				}
			}
		};
        // 确认密码
		var truePwd=(rule,value,callback)=>{
			if(!value){
				return callback(new Error('请确认密码'))
			}else{
				if(value!=this.pwdform.newPwd){
					return callback(new Error('两次密码不一致'));
				}else{
					callback();
				}
			}
		}
        return{
            imageUrl:'',
            bindArr:[
                {txt:'手机',isbind:1,bindtxt:'18790692643',btntxt:'修改手机',img1:require('../../static/image/personal/icon_phone@2x.png'),img2:require('../../static/image/personal/icon_phone2@2x.png')},
                {txt:'微信',isbind:1,bindtxt:'已绑定',btntxt:'解绑',img1:require('../../static/image/personal/icon_wechat@2x.png'),img2:require('../../static/image/personal/icon_wechat2@2x.png')},
                {txt:'QQ',isbind:1,bindtxt:'已绑定',btntxt:'解绑',img1:require('../../static/image/personal/icon_qq@2x.png'),img2:require('../../static/image/personal/icon_qq2@2x.png')}
            ],
            changeName:false,
            nameform:{
				name:''
			},
			namerules:{
				name:[
					{ required: true, message: '请输入新的昵称', trigger: 'blur' },
				],
			},
            changePwd:false,
            pwdform:{
				oldPwd:'',
                newPwd:'',
                truePwd:''
			},
			pwdrules:{
				oldPwd:[
					{ required: true, message: '请输入原密码', trigger: 'blur' },
                    {min:6,message: '密码不能小于6个字符', trigger: 'blur' }
				],
                newPwd:[
					{ required: true, message: '请输入新密码', trigger: 'blur' },
                    {min:6,message: '密码不能小于6个字符', trigger: 'blur' }
				],
                truePwd:[
                    { required: true, message: '请确认新密码', trigger: 'blur' },
                    {validator: truePwd, trigger: 'blur'}
                ]
			},
            changePhone:false,
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
            detailform:{
                organization:'',
                class:'',
                name:'',
                sno:'',
                code:''
            }
        }
    },
    store,
    created(){
        // 判断验证码倒计时
        if(localStorage.getItem('endTime')&&localStorage.getItem('endTime')>new Date().getTime()){
			this.forgetTime();
		}
        // 判断账号登录是否失效
        this.isLogin();
    },
    methods:{
        ...mapMutations(["forgetTime","alertTxt","changeUser"]),
        // 上传头像
        uploadFile(params){
            let file = params.file
            let data=new FormData();
            data.append('file',file);
            axios({
                url:'https://www.evdo.vip/api/v1/uploader/avatar',
                method:'post',
		        data:data,
                headers: {
                    'Content-Type':'multipart/form-data',
                    'token':localStorage.getItem('token')
                }
            }).then((res)=>{
                if(res.data.code==0){
                    this.alertTxt({msg:res.data.msg,type:'success'});
                    let arr=this.arrUser;
                    arr.avatar=res.data.data.avatar;
                    this.changeUser(JSON.stringify(arr));
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                     this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        beforeAvatarUpload(file) {
            // console.log(file)
            // this.imageUrl=file.name;
            // const isJPG = file.type === 'image/jpeg';
            // const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            // this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            // this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;
        },
        // 修改昵称
        showName(){
            this.changeName=true;
        },
        nameChange(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    profile({'nickname':this.nameform.name}).then((res)=>{
                        if(res.data.code==0){
                            this.alertTxt({msg:res.data.msg,type:'success'});
                            this.changeName=false;
                            this.changeUser(JSON.stringify(res.data.data));
                        }else if(res.data.code==-200){
                            this.alertTxt({msg:res.data.msg,type:'error'});
                            this.$router.push('/');
                        }else{
                            this.alertTxt({msg:res.data.msg,type:'error'});
                        }
                    })
                }
			})
        },
        // 修改密码
        showPwd(){
            this.changePwd=true;
        },
        pwdChange(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let data={};
                    data["old_password"]=this.pwdform.oldPwd;
                    data["password"]=this.pwdform.newPwd;
                    data["password_confirmation"]=this.pwdform.truePwd;
                    password(data).then((res)=>{
                        if(res.data.code==0){
                            this.alertTxt({msg:res.data.msg,type:'success'});
                            this.changePwd=false;
                        }else if(res.data.code==-200){
                            localStorage.removeItem('token');
                            this.changeUser('');
                            this.$router.push('/');
                        }else{
                            this.alertTxt({msg:res.data.msg,type:'error'});
                        }
                    })
                }
			})
        },
        // 修改手机号
        showPhone(){
            this.changePhone=true;
        },
        phoneChange(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    mobileReg({mobile:this.phoneform.phone,mobile_code:this.phoneform.regtxt}).then((res)=>{
                        if(res.data.code==0){
                            this.alertTxt({msg:res.data.msg,type:'success'});
                            this.changePhone=false;
                            let arr=this.arrUser;
                            arr.mobile=this.phoneform.phone;
                            this.changeUser(JSON.stringify(arr));
                        }else if(res.data.code==-200){
                            this.alertTxt({msg:res.data.msg,type:'error'});
                            this.$router.push('/');
                        }else{
                            this.alertTxt({msg:res.data.msg,type:'error'});
                        }
                    })
                }
			})
        },
        // 解绑/绑定微信
        showWeixin(isbind){
            if(isbind){
                this.$alert('确定解除绑定微信账号','解绑微信账号',{
                    confirmButtonText:'解 绑',
                    center:true,
                    customClass:'errorAlert',
                    callback:(action)=>{
                        if(action=='confirm'){
                            let data={};
                            data['type']='wechat';
                            oauth2unbind(data).then((res)=>{
                                if(res.data.code==0){
                                    this.alertTxt({msg:res.data.msg,type:'success'});
                                    this.isLogin();
                                }else{
                                    this.alertTxt({msg:res.data.msg,type:'error'});
                                }
                            })
                        }
                    }
                })
            }else{
                let data={};
                data['type']='wechat';
                data['path']='web/#'+this.$route.path;
                socials(data).then((res)=>{
                    if(res.data.code==0){
                        window.location.href=res.data.data;
                    }else{
                        this.alertTxt({'msg':res.data.msg,'type':'error'});
                    }
                })
            }
        },
        // 解绑/绑定QQ
        showQQ(isbind){
            if(isbind){
                this.$alert('确定解除绑定QQ账号','解绑QQ账号',{
                    confirmButtonText:'解 绑',
                    center:true,
                    customClass:'errorAlert',
                    callback:(action)=>{
                        if(action=='confirm'){
                            let data={};
                            data['type']='qq';
                            oauth2unbind(data).then((res)=>{
                                if(res.data.code==0){
                                    this.alertTxt({msg:res.data.msg,type:'success'});
                                    this.isLogin();
                                }else{
                                    this.alertTxt({msg:res.data.msg,type:'error'});
                                }
                            })
                        }
                    }
                })
            }else{
                let url=encodeURIComponent('https://www.evdo.vip/web/#/personal');
				window.location.href=`https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101952659&redirect_uri=${url}&scope=scope`;
            }
        },
        // 获取验证码
		getForgetReg(){
			const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			if(reg.test(this.phoneform.phone)){
				if(this.forgetStr=='获取验证码'){
                    user_mobile_code({mobile:this.phoneform.phone,type:'unique'}).then((res)=>{
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
        // 退出登陆
        logOut(){
            this.$alert('确认退出登陆','退出登陆',{
                confirmButtonText:'确 定',
                center:true,
                customClass:'errorAlert',
                callback:(action)=>{
                    if(action=='confirm'){
                        logout().then((res)=>{
                            if(res.data.code==0){
                                this.alertTxt({'msg':res.data.msg,'type':'success'});
                                localStorage.removeItem('user');
                                this.changeUser('')
                                this.$router.push('/')
                            }else{
                                this.alertTxt({'msg':res.data.msg,'type':'error'});
                            }
                        })
                    }
                }
            })
        },
        // 验证登录是否失效
        isLogin(){
            info().then((res)=>{
                if(res.data.code==-200){
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.changeUser(JSON.stringify(res.data.data));
                    let obj=res.data.data;
                    if(obj.is_enterprise&&obj.user_status==1){
                        let objs={};
                        objs['organization']=obj.organization;
                        objs['class']=obj.class;
                        objs['name']=obj.realname;
                        objs['sno']=obj.student_id;
                        objs['code']=obj.class_code;
                        this.detailform=objs;
                    }else if(!obj.is_enterprise&&obj.user_status==3){
                        let objs={};
                        objs['organization']=obj.organization;
                        objs['class']=obj.class;
                        objs['name']=obj.realname;
                        objs['sno']=obj.student_id;
                        objs['code']=obj.class_code;
                        this.detailform=objs;
                    }
                }
            })
        },
        // 退出组织
        quitGroup(){
            this.$alert('确定退出组织','退出组织',{
                confirmButtonText:'确定',
                center:true,
                customClass:'errorAlert',
                callback:(action)=>{
                    if(action=='confirm'){
                        quitGroup().then((res)=>{
                            if(res.data.code==0){
                                this.alertTxt({msg:res.data.msg,type:'success'});
                                // this.$emit('changeNav',2);
                                this.isLogin();
                            }else if(res.data.code==-200){
                                this.alertTxt({msg:res.data.msg,type:'error'});
                                this.$router.push('/');
                            }else{
                                this.alertTxt({msg:res.data.msg,type:'error'});
                            }
                        })
                    }
                }
            })
        },
        // 加入组织
        addJoin(){
            this.$parent.jumpJoin();
        }
    },
    computed:mapState(["opsx","forgetStr","forgetReg","arrUser","screenHeight"])
}
</script>
<style>
    .personalItem .el-form-item__label{
        font-size: 20px;
        color: #333;
        text-align: center;
    }
    .personalItem .el-form-item p{
        background-color: transparent;
    }
    .personalItem .el-input__inner{
        color: #333 !important;
        font-size: 20px;
    }
    .el-dialog.changeName{
       height: 250px;
    }
    .el-dialog.changePhone{
        height: 300px;
    }
    .el-dialog.changeName,.el-dialog.changePhone,.el-dialog.changePwd{
        width: 450px;
        border-radius: 10px;
    }
</style>
<style scoped>
    /* .personalItem .__view{
        display: flex !important;
        justify-content: center;
        align-items: center;
    } */
    .personalItem .rightBox,.personalItem .leftBox{
        width: 740px;
        height: 800px;  
        border: 1px solid #D1D1D1;
        margin-top: 20px;
    }
    .personalItem .rightBox{
        margin-right: 20px;
    }
    .personalItem .rightBox>p.title,.personalItem .leftBox>p.title{
        width: 100%;
        height: 50px;
        line-height: 60px;
        text-align: left;
        font-size: 18px;
        color: #333;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .personalItem .leftBox .addZz{
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .personalItem .leftBox .addZz p{
        font-size: 20px;
        color: #666;
    }
    .personalItem .leftBox .addZz .addBtn,.personalItem .leftBox .addBtn{
        width: 110px;
        height: 40px;
        border: 1px solid #6495ED;
        text-align: center;
        line-height: 40px;
        color: #6495ED;
        font-size: 18px;
        margin-top: 30px;
    }
    .personalItem .leftBox .addBtn{
        margin:30px auto 0 auto;
    }
    .personalItem .leftBox .addZz .addBtn:hover{
        cursor: pointer;
    }
    .personalItem .rightBox .upload{
        width: 120px;
        height: 100px;
        margin: 30px auto 50px auto;
        position: relative;
    }
    .personalItem .rightBox .upload .avatar-uploader{
        width: 34px;
        height: 33px;
        position: absolute;
        right: 5px;
        bottom: 0;
        z-index: 1;
    }
    .personalItem .rightBox .upload .avatar-uploader img{
        width: 100%;
        height: 100%;
    }
    .personalItem .rightBox .upload .avatar{
        width: 100px;
        height: 100px;
    }
    .personalItem .rightBox .formBox,.personalItem .leftBox .formBox{
        width: 620px;
        margin: 0 auto;
    }
    .personalItem .leftBox .formBox{
        margin-top: 180px;
    }
    .personalItem .rightBox .bindBox{
        width: 520px;
        box-sizing: border-box;
        text-align: left;
        margin-left:160px;
    }
    .personalItem .rightBox .bindBox .item{
        margin-bottom: 20px;
    }
    .personalItem .rightBox .bindBox .item,.personalItem .rightBox .bindBox .item .left{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .personalItem .rightBox .bindBox .item .left{
        width: 300px;
        color: #333;
        font-size: 20px;
    }
    .personalItem .rightBox .bindBox .item .left>p{
        width: 150px;
    }
    .personalItem .rightBox .bindBox .item .left>div{
        display: flex;
        align-items: center;
    }
    .personalItem .rightBox .bindBox .item .left img{
        width: 60px;
        height: 60px;
        margin-right: 15px;
    }
    .personalItem .rightBox .bindBox .item .btn{
        width: 110px;
        height: 40px;
        border-radius: 5px;
        background-color: #6495ED;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
    }
    .personalItem .rightBox .bindBox .item .btn:hover{
        cursor: pointer;
    }
    .personalItem .rightBox .bindBox .item .btn.isbind{
        background-color: transparent;
        border: 1px solid #6495ED;
        color: #6495ED;
    }
    .personalItem .loginOut,.personalItem .leftBox .btnBox{
        width: 110px;
        height: 40px;
        border: 1px solid #FF5555;
        text-align: center;
        line-height: 40px;
        color: #FF5555;
        margin-top: 20px;
    }
    .personalItem .leftBox .btnBox{
        font-size: 18px;
        margin:50px auto 0 auto;
    }
    .personalItem .loginOut:hover,.personalItem .leftBox .btnBox:hover{
        cursor: pointer;
    }
</style>