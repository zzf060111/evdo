<template>
    <div class="downLoad" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
            </vue-scroll>
        </div>
        <div class="imgbox">
            <img :src="require('../../static/image/downLoad/pic_down_01@2x.png')" alt="">
            <div class="positionBox">
                <a href="https://www.evdo.vip/upload/default/20200716/c523e6575acde1b5e60d0e1421844973.zip" download="">
                    <img :src="require('../../static/image/downLoad/pic_web@2x.png')" alt="">
                </a>
                <a href="https://www.evdo.vip/upload/default/20201104/dce4163af3d07a4d6e79f79ce0c12af0.zip" download="">
                    <img :src="require('../../static/image/downLoad/pic_app@2x.png')" alt="">
                </a>
                <a href="https://www.evdo.vip/upload/default/20201104/dce4163af3d07a4d6e79f79ce0c12af0.zip" download="">
                    <img :src="require('../../static/image/downLoad/pic_google@2x.png')" alt="">
                </a>
                <a href="https://www.evdo.vip/upload/default/20200716/c523e6575acde1b5e60d0e1421844973.zip" download="">
                    <img :src="require('../../static/image/downLoad/pic_gzh@2x.png')" alt="">
                </a>
            </div>
        </div>
        <div class="imgbox">
            <img :src="require('../../static/image/downLoad/pic_down_02@2x.png')" alt="">
        </div>
        <div class="imgbox">
            <img :src="require('../../static/image/downLoad/pic_down_03@2x.png')" alt="">
        </div>
        <div class="imgbox">
            <img :src="require('../../static/image/downLoad/pic_down_04@2x.png')" alt="">
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
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'5'
        }
    },
    store,
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange"]),
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style scoped>
    .downLoad .imgbox{
        width: 1690px;
        margin: 0 auto;
        position: relative;
    }
    .downLoad .imgbox img{
        width: 100%;
    }
    .downLoad .imgbox .positionBox{
        width: 39%;
        position: absolute;
        top: 21%;
        right:9%;
        z-index: 1;
    }
    .downLoad .imgbox .positionBox img{
        width: 100%;
        display: block;
    }
</style>