<template>
    <div class="personalItem">
        <p class="title">账户信息</p>
        <div class="upload">
            <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img src="../../static/image/personal/icon_xiangji@2x.png">
            </el-upload>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <img v-else src="../../static/image/personal/touxiang1@2x.png" class="avatar">
        </div>
        <div class="formBox">
            <el-form  label-width="100px" >
				<el-form-item label="昵称" prop="phone">
					<el-input type="text" value="昵称" disabled></el-input>
                    <p @click="showName">修改</p>
				</el-form-item>
				<el-form-item label="账号" prop="pwd">
					<el-input  type="text" value="18790692643" disabled></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="truePwd">
					<el-input type="password" value="123456" disabled></el-input>
                    <p @click="showPwd">修改</p>
				</el-form-item>
			</el-form>
        </div>
        <div class="bindBox">
            <div class="item" v-for="(item,index) of bindArr" :key="index">
                <div class="left">
                    <div>
                        <img :src="item.isbind==0?item.img1:item.img2">
                        {{item.txt}}
                    </div>
                    <p>{{item.bindtxt}}</p>
                </div>
                <div :class="item.isbind==0?`btn`:`btn isbind`" @click="showAlert(item.txt,item.isbind)">{{item.btntxt}}</div>
            </div>
        </div>
        <div class="loginOut" @click="logOut">退出登陆</div>
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
			</el-form>
            <el-form :model="pwdform" label-width="80px" :rules="pwdrules" ref="pwdform">
				<el-form-item label="新密码" prop="newPwd">
					<el-input v-model="pwdform.newPwd" type="password" placeholder="请输入新密码"></el-input>
				</el-form-item>
			</el-form>
            <el-form :model="pwdform" label-width="80px" :rules="pwdrules" ref="pwdform">
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
                {txt:'手机',isbind:1,bindtxt:'18790692643',btntxt:'修改手机',img1:'../../static/image/personal/icon_phone@2x.png',img2:'../../static/image/personal/icon_phone2@2x.png'},
                {txt:'微信',isbind:1,bindtxt:'已绑定',btntxt:'解绑',img1:'../../static/image/personal/icon_wechat@2x.png',img2:'../../static/image/personal/icon_wechat2@2x.png'},
                {txt:'QQ',isbind:1,bindtxt:'已绑定',btntxt:'解绑',img1:'../../static/image/personal/icon_qq@2x.png',img2:'../../static/image/personal/icon_qq2@2x.png'}
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
				],
                newPwd:[
					{ required: true, message: '请输入新密码', trigger: 'blur' },
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
            }
        }
    },
    store,
    created(){
        if(localStorage.getItem('endTime')&&localStorage.getItem('endTime')>new Date().getTime()){
			this.forgetTime();
		}
    },
    methods:{
        ...mapMutations(["forgetTime"]),
        // 上传头像
        handleAvatarSuccess(res,file){
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
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
				console.log(valid);
			})
        },
        // 修改密码
        showPwd(){
            this.changePwd=true;
        },
        pwdChange(formName){
            this.$refs[formName].validate((valid)=>{
				console.log(valid);
			})
        },
        // 修改手机号
        showAlert(str,isbind){
            console.log(str,isbind)
            if(str=='手机'){
                this.changePhone=true;
            }else if(str=="微信"){
                if(isbind==1){
                     this.$alert('确定解除绑定微信账号','解绑微信账号',{
                        confirmButtonText:'解 绑',
                        center:true,
                        customClass:'errorAlert',
                        callback:()=>{
                            console.log('确定')
                        }
                    })
                }
            }else if(str=="QQ"){
                if(isbind==1){
                     this.$alert('确定解除绑定QQ账号','解绑QQ账号',{
                        confirmButtonText:'解 绑',
                        center:true,
                        customClass:'errorAlert',
                        callback:()=>{
                            console.log('确定')
                        }
                    })
                }
            }
        },
        phoneChange(formName){
            this.$refs[formName].validate((valid)=>{
				console.log(valid);
			})
        },
        // 获取验证码
		getForgetReg(){
			const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			if(reg.test(this.phoneform.phone)){
				if(this.forgetStr=='获取验证码'){
                    localStorage.setItem('endTime',new Date().getTime()+60000);
					this.forgetTime();
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
                callback:()=>{
                    localStorage.removeItem('user');
                    this.$router.push('/')
                }
            })
        }
    },
    computed:mapState(["forgetStr","forgetReg"])
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
</style>
<style scoped>
    .personalItem{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .personalItem>p.title{
        width: 100%;
        height: 50px;
        line-height: 60px;
        text-align: left;
        font-size: 18px;
        color: #333;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .personalItem .upload{
        width: 120px;
        height: 100px;
        margin: 30px 0 50px 0;
        position: relative;
    }
    .personalItem .upload .avatar-uploader{
        width: 34px;
        height: 33px;
        position: absolute;
        right: 5px;
        bottom: 0;
        z-index: 1;
    }
    .personalItem .upload .avatar-uploader img{
        width: 100%;
        height: 100%;
    }
    .personalItem .upload .avatar{
        width: 100px;
        height: 100px;
    }
    .personalItem .formBox{
        width: 620px;
    }
    .personalItem .bindBox{
        width: 620px;
        padding-left: 110px;
        box-sizing: border-box;
        text-align: left;
    }
    .personalItem .bindBox .item{
        margin-bottom: 20px;
    }
    .personalItem .bindBox .item,.personalItem .bindBox .item .left{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .personalItem .bindBox .item .left{
        width: 300px;
        color: #333;
        font-size: 20px;
    }
    .personalItem .bindBox .item .left>p{
        width: 150px;
    }
    .personalItem .bindBox .item .left>div{
        display: flex;
        align-items: center;
    }
    .personalItem .bindBox .item .left img{
        width: 60px;
        height: 60px;
        margin-right: 15px;
    }
    .personalItem .bindBox .item .btn{
        width: 110px;
        height: 40px;
        border-radius: 5px;
        background-color: #6495ED;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
    }
    .personalItem .bindBox .item .btn.isbind{
        background-color: transparent;
        border: 1px solid #6495ED;
        color: #6495ED;
    }
    .personalItem .loginOut{
        width: 110px;
        height: 40px;
        border: 1px solid #FF5555;
        text-align: center;
        line-height: 40px;
        color: #FF5555;
        margin-top: 20px;
    }
</style>