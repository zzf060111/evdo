<template>
    <div class="message" ref="message" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="ops" :style="`width:100%;height:${screenHeight-110}px;`">
            <div style="width:100%;height:780px;" v-show="msgArr.length>0&&isValue">
                <vue-scroll :ops="ops" :style="`width:100%;height:100%;`" @handle-scroll="handleScroll">
                    <div class="Messitem"  v-for="(item,index) of msgArr" :key="index">
                        <div class="top" @click="showMess(index)">
                            <div>
                                <!-- <p v-show="item.status==0">未读</p> -->
                                <img style="width:32px;height:32px;margin:-5px 10px 0 0;" :src="item.status==0?require('../../static/image/personal/icon_weidu@2x.png'):require('../../static/image/personal/icon_yidu@2x.png')" alt="">
                                <span>{{item.notice.title}}</span>
                            </div>
                            <div>
                                {{getDate(item.create_time)}}
                            </div>
                        </div>
                        <div class="down down1" v-show="item.isShow==0" @click="showMess(index)">
                            <div :style="`width:${widthVal}px`">{{item.notice.content}}</div>
                            <img :src="require('../../static/image/personal/down@2x.png')" alt="">
                        </div>
                        <div class="down down2" v-show="item.isShow==1">
                            <div :style="`width:${widthVal}px`" @click="showMess(index)">{{item.notice.content}}</div>
                            <img :src="require('../../static/image/personal/up@2x.png')" alt="" @click="showMess(index)">
                            <div>
                                <p @click="delMessage(index)">删除</p>
                            </div>
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
import {info,notice,noticeRead,systemNoticeDel} from '../services/api/personal'
export default {
    data(){
        return{
            page:1,
            msgArr:[],
            isValue:false,
            widthVal:0
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
        this.$nextTick(()=>{
            // 获取父元素
            let message=this.$refs.message;
            // 获取宽度
            let wmessage = message.getBoundingClientRect().width;
            // 添加左内边距
            this.widthVal=(wmessage-100)*0.88;
        });
        window.onresize=()=>{
            this.windowChange(document.documentElement.clientHeight);
            return(()=>{
                this.$nextTick(()=>{
                    // 获取父元素
                    let message=this.$refs.message;
                    // 获取宽度
                    let wmessage = message.getBoundingClientRect().width;
                    // 添加左内边距
                    this.widthVal=(wmessage-100)*0.88;
                });
            })()
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
                        this.$emit('getNoread');
                    }
                })
            }
        },
        // 删除消息
        delMessage(index){
            let arr=this.msgArr;
            this.$alert('确认删除系统消息？','提示',{
                confirmButtonText:'删 除',
                center:true,
                customClass:'errorAlert',
                callback:(action)=>{
                    if(action=='confirm'){
                        let data={};
                        data['id']=arr[index].id
                        systemNoticeDel(data).then((res)=>{
                            if(res.data.code==0){
                                this.alertTxt({'msg':'删除成功','type':'success'});
                                arr.splice(index,1);
                            }
                        })
                    }
                }
            })
        },
        // 滚动条事件
        handleScroll(vertical, horizontal, nativeEvent){
            // console.log(nativeEvent.target.scrollTop,nativeEvent.target.clientHeight,nativeEvent.target.scrollHeight)
            if(nativeEvent.target.scrollTop+nativeEvent.target.clientHeight==nativeEvent.target.scrollHeight){
                this.page++;
                this.getNotice(this.page)
            }
        },
        // 整理日期
        getDate(time){
            var date=new Date(time*1000);
            var year=date.getFullYear();
            var month=date.getMonth()+1>=10?date.getMonth()+1:`0${date.getMonth()+1}`;
            var day=date.getDate()>=10?date.getDate():`0${date.getDate()}`;
            var hours=date.getHours()>=10?date.getHours():`0${date.getHours()}`;
            var minutes=date.getMinutes()>=10?date.getMinutes():`0${date.getMinutes()}`;
            var seconds=date.getSeconds()>=10?date.getSeconds():`0${date.getSeconds()}`;
            return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds
        }
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
    .message .Messitem:hover{
        cursor: pointer;
    }
    .message .Messitem .top{
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding:20px 20px 0 20px;
        box-sizing: border-box;
        font-size: 16px;
        color: #333;
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
    .message .Messitem .top>div span{
        font-size: 18px;
    }
    .message .Messitem .top>div:nth-child(2){
        font-size: 16px;
        color: #C4CACE;
    }
    .message .Messitem .down{
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: left;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 16px;
        color: #333;
    }
    .message .Messitem .down1 div{
        height: 35px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .message .Messitem .down img{
        width: 24px;
        height: 24px;
    }
    .message .Messitem .down2{
        min-height: 40px;
        padding-bottom: 20px;
        box-sizing: border-box;
    }
    .message .Messitem .down2 div:last-child{
        width: 100%;
        margin-top: 10px;
    }
    .message .Messitem .down2 div:last-child p{
        width: 70px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        background-color: #FF5555;
    }
</style>