<template>
    <div class="videoItem" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <div class="topNav">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
            </div>
            <img src="../../static/image/fslist/backr.png" alt="" class="back" @click="backJump">
            <div class="videoBox" :style="`height:${screenHeight-160}px`">
                <div class="video" :style="`height:${screenHeight-210}px`">
                    <img src="../../static/image/fslist/stop.png" alt="" class="stopIcon" v-if="isStop" @click="playVideoi">
                    <video ref="myVideo" src="https://www.evdo.vip/upload/admin/20210227/fd85ddf6f3d4734bc3285a026919e1f1.mp4" controls poster="https://www.evdo.vip/upload/admin/20210227/51096e87e3c044ebe17cde991b758130.png"></video>
                    <div>
                        <p>
                            <vshare :vshareConfig="vshareConfig"></vshare>
                            <img src="../../static/image/fslist/fenxiang.png" alt="" @click="fenxiang">分享
                        </p>
                        <p>
                            <img src="../../static/image/fslist/star.png" alt="">收藏
                        </p>
                    </div>
                </div>
                <div class="text">
                    <h2>医维度宣传片</h2>
                    <h3>简介：</h3>
                    <p>欢迎使用医维度平台欢迎使用医维度平台欢迎使用医维度平台欢迎使用医维度平台欢迎使用医维度平台欢迎使用医维度平台欢迎使用医维度平台欢迎使用医维度平台欢迎使用医维度平台</p>
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
            activeIndex:'9',
            isStop:true,
            isfenx:false,
            vshareConfig:{
                shareList: ['weixin','sqq','qzone'],
            }
        }
    },
    store,
    created(){
        console.log(this.$route.query.id)
    },
    mounted(){
        this.windowChange();
         // 监听视频播放
        this.$refs.myVideo.addEventListener("play", () => {
            this.isStop=false
        });
        // 监听视频暂停
        this.$refs.myVideo.addEventListener("pause", () => {
            this.isStop=true
        });
    },
    methods:{
        ...mapMutations(["windowChange"]),
        // 返回上一页
        backJump(){
            this.$router.go(-1);
        },
        // 控制视频播放
        playVideoi(){
            this.$refs.myVideo.play();
            this.isStop=false;
        },
        // 分享
        fenxiang(){
            this.isfenx=true;
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style scoped>
    .videoItem{
        background-color: #000;
        padding-top:50px;
        position: relative;
        box-sizing: border-box;
    }
    .videoItem .back{
        width: 60px;
        height: 55px;
        position: absolute;
        top:0px;
        left:5%;
        z-index: 1;
    }
    .videoBox{
        width: 90%;
        background-color: rgba(17,17,18,0.8);
        margin: auto;
        box-shadow: 0 0 5px rgb(255 255 255 / 60%);
        border-radius: 10px;
        display: flex;
    }
    .videoBox .video{
        width: 75%;
        border-radius: 10px 0 0 0;
        position: relative;
    }
    .videoBox .video .stopIcon{
        width: 60px;
        height: 60px;
        position: absolute;
        top:40%;
        left: 48%;
        z-index: 1;
    }
    .videoBox .video video{
        width: 100%;
        height: 100%;
        object-fit: fill;
        border-radius: 10px 0 0 0;
    }
    .videoBox .video div{
        height: 50px;
        display: flex;
        align-items: center;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .videoBox .video div p{
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #fff;
        margin-right: 30px;
    }
    .videoBox .video div p:hover{
        cursor: pointer;
    }
    .videoBox .video div p img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .videoBox .text{
        width: 25%;
        height: 100%;
        color: #697d8a;
    }
    .videoBox .text h2{
        height: 80px;
        line-height: 80px;
        font-size: 26px;
    }
    .videoBox .text h3{
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-size: 20px;
        padding-left: 40px;
        box-sizing: border-box;
    }
    .videoBox .text p{
        text-align: left;
        font-size: 16px;
        padding:0 40px;
        text-indent: 44px;
        box-sizing: border-box;
        line-height: 25px;
    }
</style>