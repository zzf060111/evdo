<template>
    <div class="enterprise">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
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
        <div class="leftNav">
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
        </div>
        <div class="pubBox">
          
        </div>
    </div>
</template>
<script>
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
                ]
            }
        },
        methods:{
            // 导航
            changeNav(key){

            },
            // 切换左侧导航
            changLeftNav(key,keyPath){
                console.log(key,keyPath)
            }
        },
        components:{
            topnav
        }
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
    .pubBox{
        width: 100%;
    }
    .leftNav{
        width: 300px;
        height: 900px;
        background-color: #F6F6F6;
        overflow-y: auto;
        position: fixed;
        top:110px;
        left: 0;
        z-index: 9;
    }
</style>