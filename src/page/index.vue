<template>
    <div class="index" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
        </div>
        <div class="carouse">
            <el-carousel>
                <el-carousel-item>
                    <img v-lazy="'../../static/image/index/banner@2x.png'">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="tab">
            医维度系列产品与功能介绍
            <p></p>
        </div>
        <div class="productBox">
            <div class="boxleft" @mouseenter="mEnter($event,'left1')" @mouseleave="mLeave($event,'left1')" @click="jumpfslist()">
                <img v-lazy="'../../static/image/index/pic1@2x.png'" class="bj">
                <h2>医维度在线版</h2>
                <p>
                    医维度虚拟仿真教学软件系统是一款在线多终端数字化虚拟仿真医学平台，包含Web端、PC客户端、手机APP，所有终端数据同步，系统内容实时更新。卓越的跨平台3D渲染引擎可以在任意终端流畅运行，准确还原组织、器官的材质纹理与形态。
                </p>
                <img src="../../static/image/index/right.png" class="rd left1">
            </div>
            <div class="boxright">
                <div class="top">
                    <div @mouseenter="mEnter($event,'right1')" @mouseleave="mLeave($event,'right1')" @click="jumpfslist()">
                        <img v-lazy="'../../static/image/index/pic2@2x.png'" class="bj">
                        <h2>医维度在线版</h2>
                        <h2>企业定制独立部署版</h2>
                        <p>重建人体精细模型达一万多件，结构位置准确，形态纹理逼真</p>
                        <img src="../../static/image/index/right.png" class="rd right1">
                    </div>
                    <div @mouseenter="mEnter($event,'right2')" @mouseleave="mLeave($event,'right2')" @click="jumpfslist()">
                        <img v-lazy="'../../static/image/index/pic4@2x.png'" class="bj">
                        <h2>医维度单机版系列软件</h2>
                        <p>一点触控旋转，两点触控缩放与平移，鼠标左键旋转，滚轮</p>
                        <p>缩放，右键平移</p>
                        <img src="../../static/image/index/right.png" class="rd right2">
                    </div>
                </div>
                <div class="down">
                    <div @mouseenter="mEnter($event,'right3')" @mouseleave="mLeave($event,'right3')" @click="jumpfslist()">
                        <img v-lazy="'../../static/image/index/pic3@2x.png'" class="bj">
                        <h2>医维度XR系列</h2>
                        <p>配合VR眼镜在VR模式下浏览标本，可对标本进行贴图切换</p>
                        <img src="../../static/image/index/right.png" class="rd right3">
                    </div>
                    <div @mouseenter="mEnter($event,'right4')" @mouseleave="mLeave($event,'right4')" @click="jumpfslist()">
                        <img v-lazy="'../../static/image/index/pic5@2x.png'" class="bj">
                        <h2>九大系统</h2>
                        <h2>三维科普动画</h2>
                        <p>反色显示切片用以观察</p>
                        <img src="../../static/image/index/right.png" class="rd right4">
                    </div>
                    <div @mouseenter="mEnter($event,'right5')" @mouseleave="mLeave($event,'right5')" @click="jumpfslist()">
                        <img v-lazy="'../../static/image/index/pic6@2x.png'" class="bj">
                        <h2>在线三维</h2>
                        <h2>全景展馆</h2>
                        <p>全屏观看、收藏、分享</p>
                        <img src="../../static/image/index/right.png" class="rd right5">
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomNav">
            <div class="text">
                <h2>医维度</h2>
                <p>方便快捷的在线3D人体解剖平台</p>
            </div>
            <div class="btn">
                <p :class="arrUser&&!arrUser.is_enterprise?'isSel':''" @click="changeUser(0)">专业版</p>
                <p :class="arrUser&&arrUser.is_enterprise?'isSel':''" @click="changeUser(1)">企业版</p>
            </div>
        </div>
        <div class="bottomTitle">
            <div class="aBox">
                <a href="#">关于医维度</a>
                <a href="#">联系与合作</a>
                <a href="#">用户协议</a>
                <a href="#">在线客服</a>
                <a href="#">公众号</a>
            </div>
            <p>河南中博健康科技有限公司|豫ICP备18001437号</p>
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
                topIcon:'../../static/image/top/logo@2x.png',
                activeIndex:'1'
            }
        },
        store,
        mounted(){
            this.windowChange()
        },
        methods:{
            ...mapMutations(["windowChange"]),
            // 导航箭头显示隐藏
           mEnter(event,num){
               event.target.parentElement.querySelector(`.${num}`).style.cssText += "opacity:1;";
           },
           mLeave(event,num){
               event.target.parentElement.querySelector(`.${num}`).style.cssText += "opacity:0";
           },
            //切换用户版本
            changeUser(num){
               if(num==0){
                   this.$router.push('/professional')
               }else if(num==1){
                   if(!this.arrUser){
                       this.$alert('请登录后访问此页面','提示',{
                            confirmButtonText:'确 定',
                            center:true,
                        })
                   }else if(this.arrUser&&!this.arrUser.is_enterprise){
                        this.$alert('此页面需企业级账号权限，请加入组织后访问','提示',{
                            confirmButtonText:'确 定',
                            center:true,
                        })
                   }else if(this.arrUser&&this.arrUser.is_enterprise){
                        this.$router.push('/enterprise')
                   }
               }
            },
             // 跳转功能列表
            jumpfslist(){
                this.$router.push('/fsList');
            },   
        },
        components:{
            topnav
        },
        computed:mapState(["opsx","screenHeight","arrUser"])
    }
</script>
<style>
    .index .el-carousel{
        width: 1690px;
        height: 774px;
    }
    .index .el-carousel__item{
        width: 1690px;
        height: 774px;
    }
    .index .el-carousel__item img{
        width: 100%;
        height: 100%;
    }
    .index .el-carousel__arrow{
        top:120% !important;
    }
    .index .el-carousel__button{
        width: 40px;
        height: 5px;
        background-color: #ccc;
    }
    .index .el-carousel__indicator.is-active .el-carousel__button{
        background-color:#999;
    }
</style>
<style scoped>
    .carouse{
        width: 100%;
        height: 774px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tab{
        width: 100%;
        height: 100px;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .tab p{
        width: 50px;
        height: 6px;
        background-color: #FFD302;
        margin-top: 10px;
    }
    .productBox{
        width: 100%;
        height: 700px;
        display: flex;
        justify-content: center;
        align-content: center;
    }
    .productBox div{
        position: relative;
    }
    .productBox div h2{
        font-size: 26px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 20px;
    }
    .productBox div p{
        font-size: 18px;
        color: #fff;
        line-height: 42px;
        opacity: 0.8;
    }
    .productBox .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        z-index: -1;
    }
    .productBox .rd{
        width: 44px;
        height: 44px;
        position: absolute;
        right: 20px;
        bottom: 20px;
        z-index: 1;
        opacity: 0;
        transition: opacity 1s;
    }
    .productBox .boxleft{
        width: 422px;
        height: 672px;
        padding: 50px 20px 0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .productBox .boxleft:hover{
        cursor: pointer;
    }
    .productBox .boxright{
        margin-left:16px;
    }
    .productBox .boxright>div{
        display: flex;
    }
    .productBox .boxright>div div{
        padding: 50px 20px 0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .productBox .boxright>div div:hover{
        cursor: pointer;
    }
    .productBox .boxright .top{
        margin-bottom: 16px;
    }
    .productBox .boxright .top div:nth-child(1){
        width: 430px;
        height: 328px;
    }
    .productBox .boxright .top div:nth-child(2){
        width: 746px;
        height: 328px;
        margin-left:16px;
    }
    .productBox .boxright .down div:nth-child(1){
        width: 430px;
        height: 328px;
    }
    .productBox .boxright .down div:nth-child(2){
        width: 365px;
        height: 328px;
        margin-left:16px;
    }
    .productBox .boxright .down div:nth-child(3){
        width: 365px;
        height: 328px;
        margin-left:16px;
    }
    .bottomNav{
        width: 100%;
        height: 282px;
        background-color: #252B43;
    }
    .bottomNav .text{
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .bottomNav .text h2{
        font-size: 30px;
        color: #fff;
        margin-bottom: 20px;
    }
    .bottomNav .text p{
        font-size: 18px;
        color: #fff;
    }
    .bottomNav .btn{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .bottomNav .btn p{
        width: 180px;
        height: 46px;
        border: 1px solid #FFFFFF;
        border-radius: 3px;
        line-height: 46px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin:0 20px;
        box-sizing: border-box;
    }
    .bottomNav .btn p:hover{
        cursor: pointer;
    }
    .bottomNav .btn p.isSel{      
        background: #6495ED;
        border: none;
    }
    .bottomTitle{
        width: 100%;
        height: 180px;
    }
    .bottomTitle .aBox{
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .bottomTitle .aBox a{
        font-size: 16px;
        color: #666;
        text-decoration: none;
        display: inline-block;
        margin: 0 30px;
        font-weight: 400;
    }
    .bottomTitle p{
        font-size: 14px;
        color: #C4CACE;
        text-align: center;
        margin-top: 30px;
    }
</style>