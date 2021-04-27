<template>
    <div class="personal">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
        </div>
        <div class="leftNav" :style="`height:${screenHeight-60}px`">
            <vue-scroll :ops="ops" style="width:100%;height:100%;">
            <div class="user">
                <img src="../../static/image/personal/touxiang1@2x.png" class="headImg">
                <h3>用户名</h3>
                <div class="sign">
                    <img src="../../static/image/personal/signin@2x.png" class="bj">
                    签到
                </div>
            </div>
            <div class="cardBox card1">
                <img src="../../static/image/personal/bg_members@2x.png" class="bj">
                <p><img src="../../static/image/personal/icon_members3@2x.png"> 加入企业用户组，共享全站权限</p>
                <div class="btn">加入组织</div>
            </div>
            <div class="cardBox card2">
                <img src="../../static/image/personal/bg_members@2x.png" class="bj">
                <p>开通专业版VIP</p>
                <div class="btn">点击开通</div>
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
                <personalItem v-show="rightShow==3"></personalItem>
                <collection v-show="rightShow==1"></collection>
                <helpCenter v-show="rightShow==2"></helpCenter>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'8',
            rightShow:'',
            navArr:[
                {
                    id:'1',
                    img:'../../static/image/personal/icon_collection@2x.png',
                    str:'我的收藏',
                    isSel:false
                },
                {
                    id:'2',
                    img:'../../static/image/personal/icon_help@2x.png',
                    str:'帮助中心',
                    isSel:false
                },
                {
                    id:'3',
                    img:'../../static/image/personal/icon_information@2x.png',
                    str:'个人信息',
                    isSel:true
                },
                {
                    id:'4',
                    img:'../../static/image/personal/icon_function@2x.png',
                    str:'功能介绍',
                    isSel:false
                }
            ]
        }
    },
    store,
    created(){
        this.rightShow=localStorage.getItem('rightShow')?localStorage.getItem('rightShow'):'3';
        let arr=this.navArr;
        for(let i=0;i<arr.length;i++){
            if(arr[i].id==this.rightShow){
                arr[i].isSel=true;
            }else{
                arr[i].isSel=false;
            }
        }
    },
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange"]),
        // 切换左侧导航栏
        changeNav(index){
            if(index==3){
                this.$router.push('/fsList');
            }else{
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
        }
    },
    beforeRouteLeave(to, form, next) {
        next();
        localStorage.removeItem('rightShow');
    },
    components:{
        topnav,
        personalItem:resolve=>{require(['../components/personalItem'],resolve)},
        collection:resolve=>{require(['../components/collection'],resolve)},
        helpCenter:resolve=>{require(['../components/helpCenter'],resolve)}
    },
    computed:mapState(["ops","screenHeight","opsx"])
}
</script>
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
        align-items: center;
        flex-wrap: wrap;
    }
    .personal .leftNav .cardBox p img{
        width: 40px;
        height: 33.84px;
        margin-right: 10px;
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