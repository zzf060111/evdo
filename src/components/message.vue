<template>
    <div class="message" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="ops" style="width:100%;height:100%;">
            <div class="Messitem">
                <div class="top">
                    <p>{{isShow==0?'这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知…':''}}</p>
                    <div>
                        <p v-show="isShow==0">未读</p>
                        <img :src="isShow==0?require('../../static/image/personal/down@2x.png'):require('../../static/image/personal/up@2x.png')" alt="" @click="showMess">
                    </div>
                </div>
                <div class="down" v-show="isShow==1">
                    这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知这里是系统消息通知
                </div>
            </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import {info} from '../services/api/personal'
export default {
    data(){
        return{
            isShow:0
        }
    },
    store,
    created(){
        // 验证登录是否失效
        this.isLogin();
    },
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange","changeUser","alertTxt"]),
        // 验证登录是否失效
        isLogin(){
            info().then((res)=>{
                if(res.data.code==-200){
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.changeUser(JSON.stringify(res.data.data));
                }
            })
        },
        // 读取消息
        showMess(){
            this.isShow=this.isShow==0?1:0;
        }
    },
    computed:mapState(["ops","opsx","screenHeight"])
}
</script>
<style scoped>
    .message{
        width: 90%;
        max-width: 1400px;
        min-width: 600px;
        margin: 0 auto;
        padding: 30px 0;
        box-sizing: border-box;
    }
    .message .Messitem{
        width: 100%;
        background-color: #F1F4F5;
        margin-bottom: 20px;
    }
    .message .Messitem .top{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        box-sizing: border-box;
        font-size: 16px;
        color: #333;
    }
    .message .Messitem .top>p{
        width: 64%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .message .Messitem .top>div{
        display: flex;
        align-items: center;
    }
    .message .Messitem .top>div p{
        width: 40px;
        height: 20px;
        background-color: #FF5555;
        font-size:12px;
        color: #fff;
        text-align: center;
        line-height: 20px;
        margin-right: 20px;
    }
    .message .Messitem .top>div img{
        width: 24px;
        height: 24px;
    }
    .message .Messitem .top>div img:hover{
        cursor: pointer;
    }
    .message .Messitem .down{
        width: 100%;
        padding: 0 20px 40px 20px;
        box-sizing: border-box;
        font-size: 16px;
        color: #333;
        text-align: left;
    }
</style>