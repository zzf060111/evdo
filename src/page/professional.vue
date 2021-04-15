<template>
    <div class="professional">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
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
    </div>    
</template>
<script>
import topnav from '../components/topnav'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'2',
            twoNavIndex:'1'
        }
    },
    methods:{
        changeNav(key){
            console.log(key)
        }
    },
    components:{
        topnav
    }
}
</script>
<style>
    .twoNav .el-menu-demo{
        height: 100%;
    }
    .twoNav .el-menu-item{
        height: 50px !important;
    }
</style>
<style scoped>
    .twoNav{
        width: 100%;
        height: 50px;
        background-color: #616576;
        font-size: 16px;
        padding-left: 50px;
        box-sizing: border-box;
    }
</style>