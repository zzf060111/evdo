<template>
    <div class="collection">
        <div class="topNavBox">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal"  text-color="#333333"  @select="changeNav">
                <el-menu-item index="1"> 
                    模型
                </el-menu-item>
                <el-menu-item index="2">
                    切片
                </el-menu-item>
                <el-menu-item index="3">
                    断层
                </el-menu-item>
                <el-menu-item index="4">
                    课件
                </el-menu-item>
                 <el-menu-item index="5">
                    视频
                </el-menu-item>
            </el-menu>
            <div class="right">
                <p>0/25</p>
                <p>全选</p>
                <p>删除</p>
            </div>
        </div>
        <div class="pubBox"  :style="`height:${screenHeight-180}px`">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
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
                <div class="box boxyxsp" v-show="twoNavIndex==5">
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
            </vue-scroll>
        </div>
        <div class="pageBox" v-show="twoNavIndex==1||twoNavIndex==5">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
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
             </vue-scroll>
        </div>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
export default {
    data(){
        return{
            twoNavIndex:'1',
            currentPage:1,
        }
    },
    store,
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange"]),
        changeNav(key){
            this.twoNavIndex=key;
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
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style>
    .el-menu-demo1{
        font-size: 18px;
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border-bottom: 3px solid #FFD302 !important;
    }
</style>
<style scoped>
    .collection .topNavBox{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    .collection .topNavBox .right{
        display: flex;
        justify-content: space-around;
        color: #333;
        font-size: 16px;
        width: 200px;
    }
    .collection .pubBox{
        width: 100%;
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
    .pageBox{
        width: 100%;
        height: 50px;
        margin: 0px auto;
        padding-top:20px;
        box-sizing: border-box;
    }
</style>