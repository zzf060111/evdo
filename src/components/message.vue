<template>
    <div class="message" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="ops" :style="`width:100%;height:${screenHeight-110}px;`">
            <div style="width:100%;height:780px;" v-show="msgArr.length>0&&isValue">
                <vue-scroll :ops="opsx" :style="`width:100%;height:100%;`" @handle-scroll="handleScroll">
                    <div class="Messitem" v-for="(item,index) of msgArr" :key="index">
                        <div class="top">
                            <p>{{item.isShow==0?item.notice.title:''}}</p>
                            <div>
                                <p v-show="item.status==0">未读</p>
                                <img :src="item.isShow==0?require('../../static/image/personal/down@2x.png'):require('../../static/image/personal/up@2x.png')" alt="" @click="showMess(index)">
                            </div>
                        </div>
                        <div class="down" v-show="item.isShow==1">
                            {{item.notice.content}}
                        </div>
                    </div>
                </vue-scroll>
            </div>
            <div v-show="isValue&&msgArr.length==0" style="font-size:18px;font-weight:bold">
                暂时没有消息
            </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import {info,notice,noticeRead} from '../services/api/personal'
export default {
    data(){
        return{
            page:1,
            msgArr:[],
            isValue:false
        }
    },
    store,
    created(){
        // 验证登录是否失效
        this.isLogin();
        this.msgArr=[];
        localStorage.removeItem('isloaded');
        this.getNotice(this.page);
    },
    mounted(){
        this.windowChange(document.documentElement.clientHeight);
        window.onresize=()=>{
            this.windowChange(document.documentElement.clientHeight);
        }
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
        // 获取消息列表
        getNotice(page){
            let data={};
            data['page']=page;
            data['limit']=10;
            notice(data).then((res)=>{
                if(res.data.code==0){
                    this.isValue=true;
                    if(res.data.data.data.length>0){
                        let arr=this.msgArr.concat(res.data.data.data);
                        // arr.concat(res.data.data.data);
                        for(let i=0;i<arr.length;i++){
                            arr[i]['isShow']=0;
                        }
                        this.msgArr=arr;
                    }else{
                        if(!localStorage.getItem('isloaded')&&this.msgArr.length>0){
                            this.alertTxt({'msg':'系统信息已经加载完','type':'error'});
                            localStorage.setItem('isloaded','yes');
                        }
                    }
                }
            })
        },
        // 读取消息
        showMess(index){
            this.msgArr[index].isShow=this.msgArr[index].isShow==0?1:0;
            if(this.msgArr[index].status==0){
                let data={};
                data['id']=this.msgArr[index].id;
                noticeRead(data).then((res)=>{
                    if(res.data.code==0){
                        this.msgArr[index].status=1;
                    }
                })
            }
        },
        // 滚动条事件
        handleScroll(vertical, horizontal, nativeEvent){
            // console.log(nativeEvent.target.scrollTop,nativeEvent.target.clientHeight,nativeEvent.target.scrollHeight)
            if(nativeEvent.target.scrollTop+nativeEvent.target.clientHeight==nativeEvent.target.scrollHeight){
                this.page++;
                this.getNotice(this.page)
            }
        },
    },
    destroyed(){
        localStorage.removeItem('isloaded');
    },
    computed:mapState(["ops","opsx","screenHeight"])
}
</script>
<style scoped>
    .message{
        width: 100%;
        max-width: 1400px;
        min-width: 600px;
        margin: 0 auto;
        padding: 30px 50px;
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
        text-align: left;
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