<template>
    <div class="professional" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex" @searchPage="searchPage"></topnav>
        </div>
        <div class="twoNav">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
                <el-menu-item index="1"> 
                    常用
                </el-menu-item>
                <el-menu-item index="2">
                    系统解剖学
                </el-menu-item>
                <el-menu-item index="3">
                    局部解剖学
                </el-menu-item>
                <el-menu-item index="4">
                    断层解剖学
                </el-menu-item>
            </el-menu>
        </div>
        <div class="publicBox">
            <div class="pubItem" v-for="(item,index) of 36" :key="index">
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
        <div class="pageBox">
            <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="24"
            layout="total,prev, pager, next,jumper"
            :total="200"
            hide-on-single-page
            >
            </el-pagination>
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
            activeIndex:'2',
            twoNavIndex:'1',
            currentPage:1
        }
    },
    store,
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange"]),
        // 本页搜索
        searchPage(str){
            console.log(str);
        },
        // 导航
        changeNav(key){
            // console.log(key)
        },
        // 分页
        handleCurrentChange(val){
           this.toTop(50)
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
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style>
    .professional .twoNav .el-menu-demo{
        height: 100%;
    }
    .professional .twoNav .el-menu-item{
        height: 50px !important;
    }
    .professional .el-pagination{
        margin: 20px 0;
    }
</style>
<style scoped>
    .professional{
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
    .publicBox{
        width: 1765px;
        min-height: 200px;
        margin:0 auto;
        padding:10px 0 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
    .publicBox .pubItem{
        width: 282px;
        height: 348px;
        margin:0 10px 10px 0;
        box-sizing: border-box;
        position: relative;
        padding: 21px;
    }
    .publicBox .pubItem .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .publicBox .pubItem .imgTop{
        width: 240px;
        height: 240px;
        position: relative;
    }
    .publicBox .pubItem .imgTop>img{
        width: 100%;
        height: 100%;
    }
    .publicBox .pubItem .imgTop .iconTop,.publicBox .pubItem .imgTop .iconDown{
        width: 200px;
        display: flex;
        align-items: center;
        position: absolute;
        left: 20px;
        z-index: 1;
        color: #fff;
    }
    .publicBox .pubItem .imgTop .iconTop{
        justify-content: space-between;
        top:20px;
    }
    .publicBox .pubItem .imgTop .iconDown{
        bottom: 20px;
    }
    .publicBox .pubItem .imgTop .iconTop p{
        width: 32px;
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        line-height: 20px;
    }
    .publicBox .pubItem .imgTop .iconTop img{
        width: 20px;
        height: 16.27px;
    }
    .publicBox .pubItem .imgTop .iconDown img{
        width: 13.81px;
        height: 9.98px;
        margin-right: 5px;
    }
    .publicBox .pubItem .txtDown{
        width: 100%;
        line-height: 25px;
        color: #333;
        text-align: left;
        margin-top: 10px;
        padding-left: 20px;
        box-sizing: border-box;
    }
    .publicBox .pubItem .txtDown h2{
        font-size: 16px;
    }
    .publicBox .pubItem .txtDown p{
        font-size: 12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .pageBox{
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>