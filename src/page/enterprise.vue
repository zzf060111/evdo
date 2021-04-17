<template>
    <div class="enterprise" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex" @searchPage="searchPage"></topnav>
        </div>
        <div class="twoNav">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
                <el-menu-item index="1"> 
                    基础医学
                </el-menu-item>
                <el-menu-item index="2">
                    医学视频
                </el-menu-item>
                <el-menu-item index="3">
                    图谱
                </el-menu-item>
                <el-menu-item index="4">
                    课件
                </el-menu-item>
            </el-menu>
        </div>
        <div class="leftNav" :style="`height:${screenHeight-110}px`">
            <vue-scroll :ops="ops" style="width:100%;height:100%;">
            <el-menu class="left-menu" :default-active="leftNav[0].childrens[0].id" background-color="#F6F6F6" unique-opened @select="changLeftNav">
                <el-submenu :index="item.id" v-for="(item,index) of leftNav" :key="index">
                    <template slot="title">
                        <img :src="item.icon">
                        <span>{{item.title}} <b>|</b> {{item.num}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item2.id" v-for="(item2,index2) of item.childrens" :key="index2">{{item2.title}} <b>|</b> {{item2.num}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
            </vue-scroll>
        </div>
        <div class="pubBox">
            <div class="box boxJcyx" v-show="twoNavIndex==1">
                <div class="pubItem" v-for="(item,index) of 25" :key="index">
                    <img v-lazy="'../../static/image/professional/bg_changyong@2x.png'" class="bj">
                    <div class="imgTop" @click="lookItem">
                        <img v-lazy="'../../static/image/professional/pic_changyong@2x.png'">
                        <div class="iconTop">
                            <p>100</p>
                            <img src="../../static/image/professional/icon_members@2x.png">
                        </div>
                        <div class="iconDown">
                            <img src="../../static/image/professional/icon_view@2x.png">100
                        </div>
                    </div>
                    <div class="txtDown">
                        <h2>上纵隔</h2>
                        <p>系统解剖学标本  呼吸系统</p>
                    </div>
                </div>
            </div>
            <div class="box boxyxsp" v-show="twoNavIndex==2">
                <div class="pubItem" v-for="(item,index) of 25" :key="index">
                    <img v-lazy="'../../static/image/enterprise/bg_yxsp@2x.png'" class="bj">
                    <div class="imgTop" @click="lookItem">
                        <img v-lazy="'../../static/image/enterprise/pic_yxsp@2x.png'">
                        <div class="iconTop">
                            <p>100</p>
                            <img src="../../static/image/professional/icon_members@2x.png">
                        </div>
                        <div class="iconDown">
                            <img src="../../static/image/professional/icon_view@2x.png">100
                        </div>
                        <img src="../../static/image/enterprise/icon_bf@2x.png" class="module">
                    </div>
                    <div class="txtDown">
                        <h2>EVDO产品宣传片</h2>
                        <p>中博科技15周年宣传片</p>
                    </div>
                </div>
            </div>
            <div class="pageBox" v-show="twoNavIndex==1||twoNavIndex==2">
                <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="25"
                layout="total,prev, pager, next,jumper"
                :total="200"
                hide-on-single-page
                >
                </el-pagination>
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
                activeIndex:'3',
                twoNavIndex:'1',
                leftNav:[
                    {
                        id:'1',
                        icon:'../../static/image/enterprise/icon_szr@2x.png',
                        title:'医维度数字人',
                        num:418,
                        childrens:[
                            {
                                id:'1-1',
                                title:'新品推荐',
                                num:18
                            },
                            {
                                id:'1-2',
                                title:'系统解剖学',
                                num:216
                            }
                        ]
                    },
                    {
                        id:'2',
                        icon:'../../static/image/enterprise/icon_xj@2x.png',
                        title:'系解体验组',
                        num:108,
                        childrens:[
                            {
                                id:'2-1',
                                title:'新品推荐',
                                num:18
                            },
                            {
                                id:'2-2',
                                title:'系统解剖学',
                                num:216
                            }
                        ]
                    },
                    {
                        id:'3',
                        icon:'../../static/image/enterprise/icon_xtjp@2x.png',
                        title:'系统解剖学标本',
                        num:1085,
                        childrens:[
                            {
                                id:'3-1',
                                title:'新品推荐',
                                num:18
                            },
                            {
                                id:'3-2',
                                title:'系统解剖学',
                                num:216
                            }
                        ]
                    },
                    {
                        id:'4',
                        icon:'../../static/image/enterprise/icon_jbjp@2x.png',
                        title:'局部解剖学标本',
                        num:281,
                        childrens:[
                            {
                                id:'4-1',
                                title:'新品推荐',
                                num:18
                            },
                            {
                                id:'4-2',
                                title:'系统解剖学',
                                num:216
                            }
                        ]
                    }
                ],
                currentPage:1
            }
        },
        store,
        methods:{
            ...mapMutations(["windowChange"]),
            // 本页搜索
            searchPage(str){
                console.log(str);
            },
            // 导航
            changeNav(key){
                this.twoNavIndex=key;
                this.toTop(50)
            },
            // 切换左侧导航
            changLeftNav(key,keyPath){
                console.log(key,keyPath)
            },
            // 查看详情
            lookItem(){
                this.$alert('此模型需开通会员','提示',{
                    confirmButtonText:'立即开通',
                    center:true,
                    callback:()=>{
                        console.log('确定')
                    }
                })
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
            // 分页
            handleCurrentChange(val){
                this.toTop(50);
            }
        },
        mounted(){
            this.windowChange()
        },
        components:{
            topnav
        },
        computed:mapState(["opsx","ops","screenHeight"])
    }
</script>
<style>
    .enterprise .twoNav .el-menu-demo{
        height: 100%;
    }
    .enterprise .twoNav .el-menu-item{
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
        width:200px;    
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
    .left-menu .el-menu-item{
        width: 90%;
        height: 40px;
        margin:0 auto;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
        text-align: left;
        line-height: 40px;
    }
    .left-menu .el-submenu.is-active .el-menu-item.is-active{
        background-color: #FFD302 !important;
        border-radius: 10px;
        color: #333 !important;
        font-weight: bold;
    }
</style>
<style scoped>
    .enterprise{
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
    .pubBox{
        width: 100%;
        padding: 0 50px 0 350px;
        box-sizing: border-box;
    }
    .pubBox .box{
        width: 1473px;
        min-height: 200px;
        margin:0 auto;
        padding:10px 0 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
    .pubBox .box .pubItem{
        width: 282px;
        height: 348px;
        margin:0 10px 10px 0;
        box-sizing: border-box;
        position: relative;
        padding: 21px;
    }
    .pubBox .box .pubItem .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .pubBox .box .pubItem .imgTop{
        width: 240px;
        height: 240px;
        position: relative;
    }
    .pubBox .box .pubItem .imgTop>img{
        width: 100%;
        height: 100%;
    }
   .pubBox .box .pubItem .imgTop .iconTop,.pubBox .box .pubItem .imgTop .iconDown{
        width: 200px;
        display: flex;
        align-items: center;
        position: absolute;
        left: 20px;
        z-index: 1;
        color: #fff;
    }
    .pubBox .box .pubItem .imgTop .iconTop{
        justify-content: space-between;
        top:20px;
    }
    .pubBox .box .pubItem .imgTop .iconDown{
        bottom: 20px;
    }
    .pubBox .box .pubItem .imgTop .iconTop p{
        width: 32px;
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        line-height: 20px;
    }
    .pubBox .box .pubItem .imgTop .iconTop img{
        width: 20px;
        height: 16.27px;
    }
    .pubBox .box .pubItem .imgTop .iconDown img{
        width: 13.81px;
        height: 9.98px;
        margin-right: 5px;
    }
    .pubBox .box .pubItem .txtDown{
        width: 100%;
        line-height: 25px;
        color: #333;
        text-align: left;
        margin-top: 10px;
        padding-left: 20px;
        box-sizing: border-box;
    }
    .pubBox .box .pubItem .txtDown h2{
        font-size: 16px;
    }
    .pubBox .box .pubItem .txtDown p{
        font-size: 12px;
    }
    /* 医学视频 */
    .pubBox .boxyxsp .pubItem{
        height: 265px;
    }
    .pubBox .boxyxsp .pubItem .imgTop{
        height: 160px;
    }
    .pubBox .boxyxsp .pubItem .imgTop .module{
        width: 36px;
        height: 36px;
        position: absolute;
        top: 62px;
        left: 102px;
        z-index: 1;
    }
    /* 分页 */
    .pubBox .pageBox{
        width: 1473px;
        margin: 20px auto;
    }
</style>