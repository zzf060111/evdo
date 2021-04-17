<template>
    <div class="fsitem" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
        </div>
        <div class="itemBox">
            <div class="title">
                <img src="../../static/image/fslist/back.png" class="back" @click="back">
                医维度虚拟仿真教学软件系统
            </div>
            <p class="time">时间：2021-01-26 15:42:00</p>
            <div class="content">
                
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
            activeIndex:'6',
        }
    },
    store,
    created(){
        console.log(this.$route.params.id);
    },
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange"]),
        // 返回上一页
        back(){
            this.$router.go(-1);
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style scoped>
    .fsitem{
        padding: 20px 0;
        box-sizing: border-box;
    }
    .itemBox{
        width: 1720px;
        margin: 0 auto;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
    .itemBox .title{
        width: 100%;
        height: 55px;
        box-shadow:0 0 5px rgba(0,0,0,0.2);
        font-size: 18px;
        font-weight: bold;
        line-height: 55px;
        position: relative;
    }
    .itemBox .title .back{
        width: 30px;
        height: 35px;
        position: absolute;
        top:10px;
        left: 30px;
        z-index: 1;
    }
    .itemBox .time{
        width: 1600px;
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        margin:10px auto 20px auto;
    }
    .itemBox .content{
        padding: 30px;
        box-sizing: border-box;
    }
</style>