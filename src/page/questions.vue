<template>
    <div class="questions" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <div class="topNav">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
            </div>
            <div class="twoNav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="(item,index) of arrTxt" :key="index">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
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
            arrTxt:[]
        }
    },
    store,
    created(){
        this.arrTxt=this.$route.params.arrTxt;
    },
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange"]),
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","ops","screenHeight"])
}
</script>
<style>
    .questions .el-breadcrumb{
        height: 100%;
        line-height: 50px;
        font-size: 14px;
    }
    .questions .el-breadcrumb .el-breadcrumb__inner{
        color: #fff;
    }
</style>
<style scoped>
    .questions{
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
</style>