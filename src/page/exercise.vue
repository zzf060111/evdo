<template>
    <div class="exercise" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <div class="topNav">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
            </div>
            <div class="twoNav">
                <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
                    <el-menu-item index="1"> 
                        系统解剖学
                    </el-menu-item>
                    <el-menu-item index="2">
                        局部解剖学
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="leftNav" :style="`height:${screenHeight-110}px`">
                <vue-scroll :ops="ops" style="width:100%;height:100%;">
                    <el-menu class="left-menu" :default-active="leftNavIndex" background-color="#F6F6F6" unique-opened @select="changLeftNav">
                        <div v-for="(item,index) of leftNav" :key="index">
                            <el-submenu :index="item.id" v-if="item.childrens">
                                <template slot="title">
                                    <span>{{item.title}} <b>|</b> 共{{item.num}}题</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item :index="item2.id" v-for="(item2,index2) of item.childrens" :key="index2">{{item2.title}} <b>|</b> 共{{item2.num}}题</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item :index="item.id" v-else>
                                <span slot="title">{{item.title}} <b>|</b> 共{{item.num}}题</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                </vue-scroll>
            </div>
            <div class="centerBox">
                <div class="box">
                    <div class="item" v-for="(item,index) of itemArr" :key="index" @click="jumpItem(item.id,item.txt)">
                        <img :src="item.icon" alt="">
                        <h3>{{item.txt}}</h3>
                    </div>
                </div>
            </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import topnav from '../components/topnav'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'4',
            twoNavIndex:'1',
            leftNavIndex:'',
            twoNavTxt:'',
            leftNavTxt1:'',
            leftNavTxt2:'',
            itemTxt:'',
            leftNav:[
                {
                    id:'1',
                    title:'专项自测',
                    num:418,
                    childrens:[
                        {
                            id:'1-1',
                            title:'运动系统',
                            num:18
                        },
                        {
                            id:'1-2',
                            title:'消化系统',
                            num:216
                        }
                    ]
                },
                {
                    id:'2',
                    title:'综合自测',
                    num:108,
                }
            ],
            itemArr:[
                {
                    id:1,
                    txt:'顺序练习',
                    icon:'../../static/image/exercise/icon_sxlx.png'
                },
                {
                    id:2,
                    txt:'随机练习',
                    icon:'../../static/image/exercise/icon_sjlx.png'
                },
                {
                    id:3,
                    txt:'模拟考试',
                    icon:'../../static/image/exercise/icon_mnks.png'
                },
                {
                    id:4,
                    txt:'我的错题',
                    icon:'../../static/image/exercise/icon_wdct.png'
                },
                {
                    id:5,
                    txt:'我的收藏',
                    icon:'../../static/image/exercise/icon_wdsc.png'
                }
            ]
        }
    },
    store,
    created(){
        this.leftNavIndex=this.leftNav[0].childrens[0].id;
        this.twoNavTxt="系统解剖学";
        this.leftNavTxt1=this.leftNav[0].title;
        this.leftNavTxt2=this.leftNav[0].childrens?this.leftNav[0].childrens[0].title:'';
    },
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange"]),
        changeNav(key){
            this.twoNavIndex=key;
            if(key==1){
                this.twoNavTxt="系统解剖学"
            }else if(key==2){
                this.twoNavTxt="局部解剖学"
            }
            this.toTop(50)
        },
        // 切换左侧导航
        changLeftNav(key,keyPath){
            this.leftNavIndex=key;
            let arr=this.leftNav;
            for(let i=0;i<arr.length;i++){
                if(arr[i].id==keyPath[0]){
                    this.leftNavTxt1=arr[i].title;
                    if(arr[i].childrens){
                        for(let j=0;j<arr[i].childrens.length;j++){
                            if(arr[i].childrens[j].id==keyPath[1]){
                                this.leftNavTxt2=arr[i].childrens[j].title;
                            }
                        }
                    }else{
                        this.leftNavTxt2='';
                    }
                }
            }
        },
        // 返回顶部
        toTop(i){
            //参数i表示间隔的幅度大小，以此来控制速度，例如50
            document.documentElement.scrollTop-=i;
            if (document.documentElement.scrollTop>0) {
                var c=setTimeout(()=>this.toTop(i),16);
            }else {
                clearTimeout(c);
            }
        },
        // 跳转题详情
        jumpItem(id,txt){
            let arrTxt=[];
            arrTxt.push(this.twoNavTxt);
            arrTxt.push(this.leftNavTxt1);
            if(this.leftNavTxt2){
                arrTxt.push(this.leftNavTxt2);
            }
            arrTxt.push(txt);
            this.$router.push({
                name:'Questions',
                params:{
                    arrTxt
                }
            })
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","ops","screenHeight"])
}
</script>
<style>
    .exercise .twoNav .el-menu-demo{
        height: 100%;
    }
    .exercise .twoNav .el-menu-item{
        height: 50px !important;
    }
    .left-menu .el-submenu__title{
        display: flex;
        align-items: center;
    }
    .left-menu .el-submenu__title img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .left-menu .el-submenu__title span{
        width:180px;    
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
        text-align: left;
    }
    .left-menu .el-menu-item-group__title{
        padding: 0 !important;
    }
    .left-menu .el-submenu.is-active .el-submenu__title{
        font-weight: bold;
    }
    .exercise .left-menu .el-menu-item{
        width: 100%;
        height: 40px;
        margin:0 auto;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
        text-align: left;
        line-height: 40px;
    }
    .left-menu  .el-menu-item.is-active{
        background-color: #FFD302 !important;
        border-radius: 10px;
        color: #333 !important;
        font-weight: bold;
    }
</style>
<style scoped>
    .exercise{
        padding-top: 50px;
        box-sizing: border-box;
    }
    .twoNav{
        width: 100%;
        height: 50px;
        background-color: #616576;
        font-size: 16px;
        padding-left: 50px;
        box-sizing: border-box;
        position: fixed;
        top:60px;
        left:0;
        z-index: 9;
    }
    .leftNav{
        width: 300px;
        background-color: #F6F6F6;
        overflow-y: auto;
        position: fixed;
        top:110px;
        left: 0;
        z-index: 9;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .centerBox{
        width: 100%;
        padding: 0 50px 0 350px;
        box-sizing: border-box;
    }
    .centerBox .box{
        width: 1450px;
        padding:50px 0 0 50px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }
    .centerBox .box .item{
        width: 300px;
        height: 306px;
        background-color: #F8F9F9;
        margin:0 40px 40px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .centerBox .box .item img{
        margin-top: -50px;
    }
    .centerBox .box .item h3{
        font-size: 30px;
        color: #333;
        font-weight: 400;
        width: 300px;
        text-align: center;
        position: absolute;
        bottom: 50px;
        z-index: 1;
    }
</style>