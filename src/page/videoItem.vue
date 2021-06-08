<template>
    <div class="videoItem" :style="`height:${screenHeight-60}px`" v-show="valueShow">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <div class="topNav">
                <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
                </vue-scroll>
            </div>
            <img :src="require('../../static/image/fslist/backr.png')" alt="" class="back" @click="backJump">
            <div class="videoBox" :style="`height:${screenHeight-160}px`">
                <div class="video" :style="`height:${screenHeight-210}px`">
                    <img :src="require('../../static/image/fslist/stop.png')" alt="" class="stopIcon" v-if="isStop" @click="playVideoi">
                    <video ref="myVideo" :src="videoObj.video_url" controls :poster="videoObj.thumbnail"></video>
                    <div>
                        <transition name="fade">
                            <div v-if="isfenx">
                                <vshare :vshareConfig="vshareConfig"></vshare>
                            </div>
                        </transition>
                        <p @click="fenxiang">
                            <img :src="require('../../static/image/fslist/fenxiang.png')" alt="">分享
                        </p>
                        <p @click="addSc" :class="videoObj.is_favorite?'isSc':''">
                            <img :src="videoObj.is_favorite?require('../../static/image/fslist/star1.png'):require('../../static/image/fslist/star.png')" alt="">收藏
                        </p>
                    </div>
                </div>
                <div class="text">
                    <h2>{{videoObj.title}}</h2>
                    <h3>简介：</h3>
                    <div :style="`height:${screenHeight-335}px`">
                        <vue-scroll :ops="ops" style="width:100%;height:100%;">
                            <div v-html="videoObj.content">

                            </div>
                        </vue-scroll>
                    </div>
                </div>
            </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
import {videoDetail,addfavorites,delfavorites} from '../services/api/modelVideo'
export default {
    data(){
        return{
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'9',
            isStop:true,
            isfenx:false,
            vshareConfig:{
                shareList: ['more','weixin','sqq'],
            },
            videoObj:"",
            valueShow:false
        }
    },
    store,
    beforeCreate(){
        window._bd_share_main = "";
    },
    created(){
        let data={};
        data['id']=this.$route.query.id;
        videoDetail(data).then((res)=>{
            if(res.data.code==0){
                this.videoObj=res.data.data;
                this.valueShow=true;
            }else{
                this.alertTxt({msg:res.data.msg,type:'error'});
            }
        })
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
        ...mapMutations(["windowChange","alertTxt"]),
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
            if(this.isfenx){
                this.isfenx=false;
                window._bd_share_main = "";
            }else{
                this.isfenx=true;
            }
        },
        // 收藏
        addSc(){
            if(this.videoObj.is_favorite){
                let data={};
                data['ids']=this.videoObj.id;
                data['type']='video';
                delfavorites(data).then((res)=>{
                    if(res.data.code==0){
                        this.alertTxt({msg:res.data.msg,type:'success'});
                        this.videoObj.is_favorite=false;
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'warning'});
                    }
                })
            }else{
                let data={};
                data['id']=this.videoObj.id;
                data['table']='video';
                addfavorites(data).then((res)=>{
                    if(res.data.code==0){
                        this.alertTxt({msg:res.data.msg,type:'success'});
                        this.videoObj.is_favorite=true;
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'warning'});
                    }
                })
            }
        }
    },
    components:{
        topnav
    },
    computed:mapState(["ops","opsx","screenHeight"])
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
    .videoBox .video>div{
        height: 50px;
        display: flex;
        align-items: center;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .videoBox .video>div .isSc{
        color: #6495ed;
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
    .videoBox .text>div{
        text-align: left;
        font-size: 16px;
        padding:0 20px;
        text-indent: 44px;
        box-sizing: border-box;
        line-height: 25px;
    }
</style>