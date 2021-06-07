<template>
    <div class="personal">
        <div class="topNav">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
            </vue-scroll>
        </div>
        <div class="leftNav" :style="`height:${screenHeight-60}px`">
            <vue-scroll :ops="ops" style="width:100%;height:100%;">
            <div class="user">
                <img :src="arrUser.avatar" class="headImg" v-if="arrUser.avatar">
                <h3 v-if="arrUser.nickname">{{arrUser.nickname}}</h3>
                <div class="sign" v-if="!arrUser.is_enterprise" :style="arrUser.clock_in?'color:#ff5555':''" @click="setClockIn">
                    <img :src="arrUser.clock_in?require('../../static/image/personal/signin2.png'):require('../../static/image/personal/signin@2x.png')" class="bj">
                    {{arrUser.clock_in?'已签到':'签到'}}
                </div>
            </div>
            <div class="cardBox card1">
                <img :src="require('../../static/image/personal/bg_members@2x.png')" class="bj">
                <p><img :src="require('../../static/image/personal/icon_members3@2x.png')" v-if="arrUser.is_enterprise"> <span :class="arrUser.is_enterprise?'':'changWidth'">{{arrUser.is_enterprise?arrUser.organization+'-'+arrUser.class:'加入企业用户组，共享全站权限'}}</span></p>
                <div class="btn" @click="jumpJoin">{{btnTxt1}}</div>
            </div>
            <div class="cardBox card2">
                <img :src="require('../../static/image/personal/bg_members@2x.png')" class="bj">
                <p>{{arrUser.member_in?'专业版会员期限至'+`${new Date(arrUser.member_at*1000).getFullYear()}年${new Date(arrUser.member_at*1000).getMonth()+1}月${new Date(arrUser.member_at*1000).getDate()}日`:'开通专业版VIP'}}</p>
                <div class="btn" @click="jumpMember">{{arrUser.member_in?'点击续费':'点击开通'}}</div>
            </div>
            <div class="navBox">
                <div class="navItem" v-for="(item,index) of navArr" :key="index" @click="changeNav(index)">
                    <div class="bj" v-show="item.isSel"><p></p></div>
                    <img :src="item.img">
                    <p>{{item.str}}</p>
                </div>
            </div>
            </vue-scroll>
        </div>
        <div class="rightBox">
            <div class="box">
                <personalItem v-if="rightShow==3"></personalItem>
                <collection v-else-if="rightShow==1"></collection>
                <helpCenter v-else-if="rightShow==2"></helpCenter>
                <member  v-else-if="rightShow==5"></member>
                <detailsItem v-else-if="rightShow==6" @changeNav="changeNav"></detailsItem>
            </div>
        </div>
        <!-- 加入组织 -->
        <el-dialog title="加入组织" :visible.sync="joinIn" :append-to-body="true" :close-on-click-modal="false" center custom-class="joinIn" top="13vh">
			<el-form :model="joinform" label-width="80px" :rules="joinrules" ref="joinform">
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
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="joinInclick('joinform')">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
import {info,setClockIn,joinReq} from '../services/api/personal'
export default {
    data(){
        return{
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'8',
            rightShow:'',
            navArr:[
                {
                    id:'1',
                    img:require('../../static/image/personal/icon_collection@2x.png'),
                    str:'我的收藏',
                    isSel:false
                },
                {
                    id:'2',
                    img:require('../../static/image/personal/icon_help@2x.png'),
                    str:'帮助中心',
                    isSel:false
                },
                {
                    id:'3',
                    img:require('../../static/image/personal/icon_information@2x.png'),
                    str:'个人信息',
                    isSel:true
                },
                {
                    id:'4',
                    img:require('../../static/image/personal/icon_function@2x.png'),
                    str:'功能介绍',
                    isSel:false
                }
            ],
            btnTxt1:'',
            joinIn:false,
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
        // 判断侧边栏
        this.rightShow=localStorage.getItem('rightShow')?localStorage.getItem('rightShow'):'3';
        let arr=this.navArr;
        for(let i=0;i<arr.length;i++){
            if(arr[i].id==this.rightShow){
                arr[i].isSel=true;
            }else{
                arr[i].isSel=false;
            }
        }
        // 获取用户信息判断用户是否登录
        this.isLogin();
    },
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange","changeUser","alertTxt"]),
        // 切换左侧导航栏
        changeNav(index){
            if(index==3){
                this.$router.push('/fsList');
            }else{
                info().then((res)=>{
                    if(res.data.code==-200){
                        localStorage.removeItem('token');
                        this.changeUser('');
                        this.$router.push('/');
                    }else{
                        this.changeUser(JSON.stringify(res.data.data));
                        let arr=this.navArr;
                        for(let i=0;i<arr.length;i++){
                            if(index==i){
                                arr[i].isSel=true;
                                this.rightShow=arr[i].id;
                                localStorage.setItem('rightShow',arr[i].id);
                            }else{
                                arr[i].isSel=false;
                            }
                        }
                        this.navArr=arr;
                    }
                })
            }
        },
        // 跳转会员套餐
        jumpMember(){
            this.rightShow='5';
            localStorage.setItem('rightShow','5');
            let arr=this.navArr;
            for(let i=0;i<arr.length;i++){
                arr[i].isSel=false;
            }
            this.navArr=arr;
        },
        // 签到
        setClockIn(){
            setClockIn().then((res)=>{
                if(res.data.code==0){
                    this.$alert('今日签到成功！赠送您1小时会员时长，限当日内使用。','提示',{
                        confirmButtonText:'去使用',
                        customClass:'leftCount',
                        center:true
                    })
                    let arr=this.arrUser;
                    arr.clock_in=true;
                    this.changeUser(JSON.stringify(arr));
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 加入组织
        jumpJoin(){
            if(this.btnTxt1=='加入组织'){
                this.joinIn=true;
            }else if(this.btnTxt1=='审核中'){
                this.isLogin();
            }else if(this.btnTxt1=="查看详情"){
                this.rightShow='6';
                localStorage.setItem('rightShow','6');
                let arr=this.navArr;
                for(let i=0;i<arr.length;i++){
                    arr[i].isSel=false;
                }
                this.navArr=arr;
            }
        },
        joinInclick(formName){
             this.$refs[formName].validate((valid)=>{
                if(valid){
                    let data={};
                    data["code"]=this.joinform.code;
                    data["name"]=this.joinform.name;
                    data["student_id"]=this.joinform.job;
                    joinReq(data).then((res)=>{
                        if(res.data.code==0){
                            this.alertTxt({msg:res.data.msg,type:'success'});
                            this.joinIn=false;
                            let arr=this.arrUser;
                            arr.user_status=3;
                            this.isLogin();
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
        // 判断用户登录是否失效
        isLogin(){
            info().then((res)=>{
                if(res.data.code==-200){
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.changeUser(JSON.stringify(res.data.data));
                    let obj=res.data.data;
                    if(!obj.is_enterprise&&obj.user_status==2){
                        this.btnTxt1='加入组织'
                    }else if(!obj.is_enterprise&&obj.user_status==3){
                        this.btnTxt1='审核中'
                    }else if(obj.is_enterprise&&obj.user_status==1){
                        this.btnTxt1='查看详情'
                    }
                }
            })
        }
    },
    beforeRouteLeave(to, form, next) {
        next();
        if(to.name!="VideoItem"){
            localStorage.removeItem('rightShow');
            localStorage.removeItem('collection-nav');
        }
    },
    components:{
        topnav,
        personalItem:resolve=>{require(['../components/personalItem'],resolve)},
        collection:resolve=>{require(['../components/collection'],resolve)},
        helpCenter:resolve=>{require(['../components/helpCenter'],resolve)},
        member:resolve=>{require(['../components/member'],resolve)},
        detailsItem:resolve=>{require(['../components/details'],resolve)}
    },
    computed:mapState(["ops","screenHeight","opsx","arrUser"]),
    watch:{
        rightShow:(newVal,oldVal)=>{
            if(newVal!=1){
                localStorage.removeItem('collection-nav');
            }
        }
    }
}
</script>
<style>
    .joinIn.el-dialog{
		width: 450px;
		height: 420px;
		border-radius: 10px;
	}
</style>
<style scoped>
    .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        z-index: -1;
    }
    .personal .leftNav{
        width: 330px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        position: fixed;
        top:60px;
        left: 0;
        z-index: 9;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .personal .leftNav .user{
        width: 100%;
        height: 300px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top:20px;
        box-sizing: border-box;
    }
    .personal .leftNav .user .headImg{
        width: 120px;
        height: 120px;
        margin-bottom: 30px;
    }
    .personal .leftNav .user h3{
        font-size: 30px;
        color: #333;
    }
    .personal .leftNav .user .sign{
        width: 98px;
        height: 58px;
        position: absolute;
        top:25px;
        right: -10px;
        z-index: 1;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 58px;
    }
    .personal .leftNav .user .sign:hover{
        cursor: pointer;
    }
    .personal .leftNav .cardBox{
        width: 100%;
        height: 140px;
        position: relative;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .personal .leftNav .cardBox p{
        font-size: 18px;
        color: #333;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .personal .leftNav .cardBox p img{
        width: 40px;
        height: 33.84px;
        margin-right: 10px;
    }
    .personal .leftNav .cardBox p span{
        display: block;
        width: 240px;
        text-align: left;
    }
    .personal .leftNav .cardBox p span.changWidth{
        width: 300px;
        text-align: center;
    }
    .personal .leftNav .cardBox.card2 p{
        width: 300px;
    }
    .personal .leftNav .cardBox.card2 p,.personal .leftNav .cardBox p span{
        display: -webkit-box;
        -webkit-line-clamp:2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        word-wrap:break-word
    }
    .personal .leftNav .cardBox .btn{
        width: 110px;
        height: 40px;
        background: linear-gradient(90deg, #CC9D62 0%, #BA8F4E 100%);
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        margin-top: 30px;
    }
    .personal .leftNav .cardBox .btn:hover{
        cursor: pointer;
    }
    .personal .leftNav .navBox .navItem{
        width: 100%;
        height: 68px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 20px;
        color: #333;
    }
    .personal .leftNav .navBox .navItem:hover{
        cursor: pointer;
    }
    .personal .leftNav .navBox .navItem .bj{
        background-color: rgba(128, 148, 148, 0.1);
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    }
    .personal .leftNav .navBox .navItem .bj p{
        width: 8px;
        height: 68px;
        background-color: rgba(255, 211, 2, 1);
    }
    .personal .leftNav .navBox .navItem>img{
        width: 30px;
        height: 30px;
        margin-right: 20px;
    }
    .personal .rightBox{
        width: 100%;
        padding-left:330px;
        box-sizing: border-box;
    }
    .personal .rightBox .box{
        width: 100%;
    }
</style>