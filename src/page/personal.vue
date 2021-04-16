<template>
    <div class="personal">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
        </div>
        <div class="leftNav">
            <div class="user">
                <img src="../../static/image/personal/touxiang1@2x.png" class="headImg">
                <h3>用户名</h3>
                <div class="sign">
                    <img src="../../static/image/personal/signin@2x.png">
                    签到
                </div>
            </div>
        </div>
        <div class="rightBox">
            <div class="box">

            </div>
        </div>
    </div>
</template>
<script>
import topnav from '../components/topnav'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'8',
        }
    },
    components:{
        topnav
    }
}
</script>
<style scoped>
    .personal .leftNav{
        width: 330px;
        height: 900px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        position: fixed;
        top:60px;
        left: 0;
        z-index: 9;
    }
    .personal .leftNav .user{
        width: 100%;
        height: 330px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .personal .leftNav .user .headImg{
        width: 120px;
        height: 120px;
        margin-bottom: 30px;
    }
    .personal .leftNav .user h3{
        font-size: 30px;
        color: #333;
    }
    .personal .leftNav .user .sign{
        width: 98px;
        height: 58px;
        position: absolute;
        top:25px;
        right: -10px;
        z-index: 1;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 58px;
    }
    .personal .leftNav .user .sign img{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        z-index: -1;
    }
    .personal .rightBox{
        width: 100%;
        height: 50px;
        padding-left:330px;
        box-sizing: border-box;
    }
    .personal .rightBox .box{
        width: 100%;
    }
</style>