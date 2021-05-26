<template>
    <div class="helpCenter" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="box">
            <div class="left">
                <p>我的提问</p>
                <textarea v-model="myquestionsVal" placeholder="请在此处输入您的问题详情"></textarea>
                <div class="questionsBtn" @click="playAsk">
                    提问
                </div>
                <div class="questionsBox">
                    <vue-scroll :ops="ops" style="width:100%;height:100%;">
                        <el-collapse accordion v-if="showValue&&myList.length>0">
                            <el-collapse-item v-for="(item,index) of myList" :key="index">
                                <template slot="title">
                                    <el-button :type="item.is_ask?'danger':'success'">{{item.is_ask?'已回复':'待回复'}}</el-button>  {{item.title}}
                                </template>
                                <div v-show="item.is_ask">
                                    <div v-for="(item1,index1) of item.reply" :key="index1">
                                        <div class="topImg">
                                            <img :src="item1.ask?arrUser.avatar:'../../static/image/personal/touxiang1@2x.png'" alt="">
                                            <div><span :style="item1.ask?'color:#EB4847':'color:#34C758'">{{item1.ask?'追问：':'回答：'}}</span>{{item1.content}}</div>
                                        </div>
                                        <div class="time">
                                            <span>{{item1.created_at}}</span>
                                            <div v-if="index1==0&&item.status!=3">
                                                <span @click="isShowAsk">追问</span>
                                                <span @click="askendQue(item.id)">结单</span>
                                            </div>
                                            <div v-else-if="index1==0&&item.status==3">
                                                <span style="color:#EB4847;text-align:right">已解决</span>
                                            </div>
                                        </div>
                                        <transition name="zoom">
                                            <div class="askBox" v-show="isAginAsk&&index1==0">
                                                <textarea cols="30" rows="10" v-model="aginAskVal" placeholder="请输入追问内容"></textarea>
                                                <p @click="playAskreply(item.id,item.reply[0].user_id)">确定</p>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                                <div v-show="!item.is_ask">
                                    暂未回复
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                        <div v-else class="noList">暂无问题</div>
                    </vue-scroll>
                </div>
            </div>
            <div class="right" v-if="gfList.length>0">
                <p>常见问题解答</p>
                <div class="questionsBox">
                    <vue-scroll :ops="ops" style="width:100%;height:100%;">
                    <el-collapse accordion>
                        <el-collapse-item :title="item.title" v-for="(item,index) of gfList" :key="index">
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>
                                {{item.reply[0].content}}
                                <p style="text-align:right">{{item.reply[0].created_at}}</p>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
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
import {askList,playAsk,Askreply,Askend} from '../services/api/personal'
export default {
    data(){
        return{
            myquestionsVal:'',
            aginAskVal:'',
            isAginAsk:false,
            // page:1,
            gfList:[],
            myList:[],
            showValue:false
        }
    },
    store,
    created(){
        this.getList();
    },
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange","alertTxt"]),
        // 显示或隐藏追问
        isShowAsk(){
            this.isAginAsk=!this.isAginAsk;
        },
        // 获取问答列表
        getList(){
            askList().then((res)=>{
                if(res.data.code==0){
                    this.gfList=res.data.data.official;
                    this.myList=res.data.data.ask;
                    this.showValue=true;
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 提问
        playAsk(){
            if(!this.myquestionsVal){
                this.alertTxt({msg:'请输入您的问题',type:'warning'});
            }else{
                let data={};
                data['title']=this.myquestionsVal;
                playAsk(data).then((res)=>{
                    if(res.data.code==0){
                        this.alertTxt({msg:res.data.msg,type:'success'});
                        this.myquestionsVal="";
                        this.getList();
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                        localStorage.removeItem('token');
                        this.changeUser('');
                        this.$router.push('/');
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }
                })
            }
        },
        //追问
        playAskreply(oid,uid){
            if(!this.aginAskVal){
                this.alertTxt({msg:'请输入您追问的内容',type:'warning'});
            }else{
                let data={};
                data['object_id']=oid;
                data['to_user_id']=uid;
                data['content']=this.aginAskVal;
                Askreply(data).then((res)=>{
                    if(res.data.code==0){
                        this.alertTxt({msg:res.data.msg,type:'success'});
                        this.aginAskVal="";
                        this.getList();
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                        localStorage.removeItem('token');
                        this.changeUser('');
                        this.$router.push('/');
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }
                })
            }
        },
        // 结单
        askendQue(oid){
            this.$alert('确定问题已解决？','提示',{
                    confirmButtonText:'确 定',
                    center:true,
                    callback:(action)=>{
                        if(action=='confirm'){
                            let data={};
                            data['object_id']=oid;
                            Askend(data).then((res)=>{
                                if(res.data.code==0){
                                    this.alertTxt({msg:res.data.msg,type:'success'});
                                    this.getList();
                                }else if(res.data.code==-200){
                                    this.alertTxt({msg:res.data.msg,type:'error'});
                                    localStorage.removeItem('token');
                                    this.changeUser('');
                                    this.$router.push('/');
                                }else{
                                    this.alertTxt({msg:res.data.msg,type:'error'});
                                }
                            })
                        }
                    }
            })
        }
    },
    computed:mapState(["ops","opsx","screenHeight","arrUser"])
}
</script>
<style>
    .helpCenter .el-collapse-item__header{
        background-color: transparent;
        border:none;
        font-size: 16px;
        color: #666;
        line-height: normal;
        text-align: left;
    }
    .helpCenter .el-collapse-item__header .el-button{
        width: 50px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        padding: 0;
        margin-right: 10px;
    }
    .helpCenter .el-collapse{
        border: none;
        padding: 30px;
        box-sizing: border-box;
        font-size: 16px !important;
        color: #666 !important;
    }
    .helpCenter .el-icon-arrow-right:before{
        display: none;
    }
    .helpCenter .el-collapse-item__content{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
    .helpCenter .box .right .questionsBox .el-collapse-item__content{
        display: flex;
    }
    .helpCenter .el-collapse-item__content>div{
        text-align: left;
    }
    .helpCenter .el-collapse-item__content>div>p{
        font-size: 12px !important;
        color: #666;
    }
    .helpCenter .el-collapse-item__content img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .helpCenter .el-collapse-item__content div.topImg{
        display: flex;
        font-size: 16px;
    }
    .helpCenter .el-collapse-item__content div.time{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-left:40px;
        box-sizing: border-box;
    }
    .helpCenter .el-collapse-item__content div.time span{
        font-size: 16px;
        color: #666;
    }
    .helpCenter .el-collapse-item__content div.time>div{
        display: flex;
        padding-right: 50px;
        box-sizing: border-box;
    }
    .helpCenter .el-collapse-item__content div.time>div span{
        display: inline-block;
        color: #FFAA00;
    }
    .helpCenter .el-collapse-item__content div.time>div span:hover{
        cursor: pointer;
    }
    .helpCenter .el-collapse-item__content div.time>div span:nth-child(1){
        margin-right: 30px;
    }
    .helpCenter .el-collapse-item__content div.askBox{
        margin:10px 0 0 40px;
        display: flex;
        align-items: center;
    }
    .helpCenter .el-collapse-item__content div.askBox p{
        width: 15%;
        height: 50px;
        background-color: #5CD7AD;
        color: #fff !important;
        text-align: center !important;
        line-height: 50px;
        border-radius: 5px;
        margin-left: 10px;
    }
    .helpCenter .el-collapse-item__content div.askBox textarea{
        width: 70% !important;
        height: 100px !important;
        padding: 10px !important;
    }
    .helpCenter .el-collapse-item__content div.aginAskBox{
        margin:10px 0 0 40px;
        line-height: 20px;
        height: 45px;
    }
    .helpCenter .el-collapse-item__content div.aginAskBox p{
        font-size: 16px !important;
        color: #666 !important;
        margin-top:5px;
    }
</style>
<style scoped>
    .helpCenter .box{
        width: 100%;
        height: 100%;
        padding: 30px 50px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
    }
    .helpCenter .box .left{
        width: 800px;
        margin-right: 80px;
    }
    .helpCenter .box .left .noList{
        padding-top: 20px;
        box-sizing: border-box;
        font-size: 18px;
    }
    .helpCenter .box .right{
        width: 500px;
    }
    .helpCenter .box .left p,.helpCenter .box .right p{
        text-align: left;
        font-size: 18px;
        color: #666;
        margin-bottom: 20px;
    }
    .helpCenter .box .left textarea{
        width: 100%;
        height: 240px;
        padding: 30px;
        box-sizing: border-box;
        box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.16);
        border: none;
        outline: none;
        font-size: 18px;
        color: #333;
    }
    .helpCenter .box .left textarea::-webkit-input-placeholder{
        font-size: 16px;
        color: #C4CACE;
    }    /* 使用webkit内核的浏览器 */
    .helpCenter .box .left textarea:-moz-placeholder{
        font-size: 16px;
        color: #C4CACE;
    }    /* Firefox版本4-18 */
    .helpCenter .box .left textarea::-moz-placeholder{
        font-size: 16px;
        color: #C4CACE;
    }    /* Firefox版本19+ */
    .helpCenter .box .left textarea:-ms-input-placeholder{
        font-size: 16px;
        color: #C4CACE;
    }
    .helpCenter .box .left .questionsBtn{
        width: 110px;
        height: 40px;
        background-color: #5CD7AD;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
        float: right;
        margin: 30px 0;
    } 
    .helpCenter .box .right .questionsBox{
        width: 100%;
        height: 520px;
        background-color: #F1F4F5;
    }
    .helpCenter .box .left .questionsBox{
        width: 100%;
        height: 420px;
        background-color: #F1F4F5;
        clear: both;
    }
</style>