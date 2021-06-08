<template>
    <div class="questions" :style="`height:${screenHeight-60}px`">
        <img :src="require('../../static/image/question/back.png')" alt="" class="jumpBack" @click="jumpBack">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <div class="topNav">
                <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                    <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
                </vue-scroll>
            </div>
            <div class="twoNav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="(item,index) of arrTxt" :key="index">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="questionsBox">
                <questionslx v-if="arrTxt[arrTxt.length-1]=='顺序练习'" :idObj="idObj"></questionslx>
                <questionsSjlx v-else-if="arrTxt[arrTxt.length-1]=='随机练习'" :idObj="idObj"></questionsSjlx>
                <questionsks v-else-if="arrTxt[arrTxt.length-1]=='模拟考试'||arrTxt[arrTxt.length-1]=='模拟考试(错题)'||arrTxt[arrTxt.length-1]=='提交考试'" :idObj="idObj" @changetimeKs="changetimeKs" @baocunId="baocunId" @changeArrTxt="changeArrTxt"></questionsks>
                <questionssc v-else-if="arrTxt[arrTxt.length-1]=='我的收藏'" :idObj="idObj"></questionssc>
                <questionsct v-else-if="arrTxt[arrTxt.length-1]=='我的错题'" :idObj="idObj"></questionsct>
            </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
import {paperLeave} from '../services/api/exercise'
export default {
    data(){
        return{
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'4',
            arrTxt:[],
            idObj:{},
            timeKs:'',
            paperId:0
        }
    },
    store,
    created(){
        if(this.$route.params.arrTxt){
            this.arrTxt=this.$route.params.arrTxt;
            this.idObj=this.$route.params.idObj;
            localStorage.setItem('arrTxt',JSON.stringify(this.$route.params.arrTxt))
            localStorage.setItem('idObj',JSON.stringify(this.$route.params.idObj))
        }else{
            this.arrTxt=JSON.parse(localStorage.getItem('arrTxt'));
            this.idObj=JSON.parse(localStorage.getItem('idObj'));
        }
    },
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange"]),
        // 返回上一页
        jumpBack(){
            this.$router.push({path:'/exercise'});
        },
        // 改变
        changetimeKs(str){
            this.timeKs=str;
        },
        // 保存考试卷id
        baocunId(id){
            this.paperId=id;
        },
        // 改变标题
        changeArrTxt(arr){
            this.arrTxt=arr;
        }
    },
    components:{
        topnav,
        questionslx:resolve=>{require(['../components/questions-lx'],resolve)},
        questionsSjlx:resolve=>{require(['../components/questions-sjlx'],resolve)},
        questionsks:resolve=>{require(['../components/questions-ks'],resolve)},
        questionssc:resolve=>{require(['../components/questions-sc'],resolve)},
        questionsct:resolve=>{require(['../components/questions-ct'],resolve)}
    },
    computed:mapState(["opsx","ops","screenHeight"]),
    beforeRouteLeave(to, form, next) {
        let arrTxt=JSON.parse(localStorage.getItem('arrTxt'));
        if(arrTxt[this.arrTxt.length-1]=='模拟考试'){
            this.$alert('确定离开？','提示',{
                confirmButtonText:'确 定',
                center:true,
                customClass:'errorAlert',
                callback:(action)=>{
                    if(action=='confirm'){
                        clearInterval(this.timeKs);
                        let data={};
                        data['paper_id']=this.paperId;
                        data['simulate_time']=localStorage.getItem('queKstime');
                        paperLeave(data).then((res)=>{
                            if(res.data.code==0){
                                next();
                                localStorage.removeItem('arrTxt');
                                localStorage.removeItem('idObj');
                                localStorage.removeItem('queKstime');
                                localStorage.removeItem('stopVisible');
                                localStorage.removeItem('questionType');
                                if(to.name!="Exercise"){
                                    localStorage.removeItem('exetwoIndex');
                                    localStorage.removeItem('exeleftIndex');
                                }
                            }else if(res.data.code==-200){
                                this.alertTxt({msg:res.data.msg,type:'error'});
                                this.$router.push('/');
                            }else{
                                this.alertTxt({msg:res.data.msg,type:'error'});
                            }
                        })
                    }else{
                        this.$router.go(1);
                    }
                }
            })
        }else{
            next();
            localStorage.removeItem('arrTxt');
            localStorage.removeItem('idObj');
            localStorage.removeItem('queKstime');
            localStorage.removeItem('stopVisible');
            localStorage.removeItem('questionType');
            localStorage.removeItem('errorPaperId');
            if(to.name!="Exercise"){
                localStorage.removeItem('exetwoIndex');
                localStorage.removeItem('exeleftIndex');
            }
        }
        
    },
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
<style lang="css" scoped>
    .questions{
        padding-top: 50px;
        box-sizing: border-box;
        position: relative;
    }
    .questions .jumpBack{
        width: 40px;
        height: 40px;
        position: absolute;
        top: 70px;
        left: 30px;
        z-index: 1;
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
    /* 子页面样式 */
    .questionsItem{
        padding-top: 50px;
        box-sizing: border-box;
        position: relative;
    }
    .questionsItem >>> .topBox{
        width: 85%;
        background-color: #f5f5f5;
        margin: 0 auto;
        padding: 20px 50px;
        box-sizing: border-box;
    }
    .questionsItem >>> .topBox .quTitle{
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .questionsItem >>> .topBox .quTitle>div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .questionsItem >>> .topBox .quTitle>div.left p{
        width: 58px;
        height: 30px;
        background-color: #6495ED;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        color: #fff;
        border-radius: 5px;
        margin-right: 10px;
    }
    .questionsItem >>> .topBox .quTitle>div.left span{
        text-align: left;
        font-size: 18px;
        color: #333;
        display: block;
        padding-right: 10px;
        box-sizing: border-box;
    }
    .questionsItem >>> .topBox .quTitle>div.right{
        width: 120px;
        height: 44px;
        color: #666;
        font-size: 16px;
        border: 1px solid #999999;
    }
    .questionsItem >>> .topBox .quTitle>div.right:hover{
        cursor: pointer;
    }
    .questionsItem >>> .topBox .quTitle>div.right img{
        width: 22px;
        height: 22px;
        margin-right: 5px;
    }
    .questionsItem >>> .topBox .quSelBox{
        padding-left: 68px;
        box-sizing: border-box;
    }
    .questionsItem >>> .topBox .quSelBox .quSelItem{
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333;
    }
     .questionsItem >>> .topBox .quSelBox .quSelItem .icon{
         width:24px;
         height: 24px;   
         border: 1px solid #999999;
         border-radius: 12px;
         box-sizing: border-box;
         margin-right: 10px;
     }
     .questionsItem >>> .topBox .quSelBox .quSelItem>img{
         width: 24px;
         height: 24px;
         margin-right: 10px;
     }
     .questionsItem >>> .topBox .quSelBox .quSelItem .icon:hover,.questionsItem >>> .topBox .quSelBox .quSelItem>img:hover{
         cursor: pointer;
     }
     .questionsItem >>> .topBox .quImg{
         padding-left: 68px;
         box-sizing: border-box;
         text-align: left;
     }
     .questionsItem >>> .topBox .quImg img{
         width: 256px;
         height: 144px;
     }
     .questionsItem >>> .topBox .quBottom{
         height: 100px;
         display: flex;
         justify-content: space-between;
         align-items: center;
         font-size: 16px;
     }
     .questionsItem >>> .topBox .quBottom>div{
         display: flex;
         align-items: center;
     }
     .questionsItem >>> .topBox .quBottom>div.left p{
         color: #666;
         margin-left: 10px;
         height: 100%;
         line-height: 100px;
     }
     .questionsItem >>> .topBox .quBottom>div.right p{
         width: 120px;
         height: 44px;
         line-height: 44px;
         text-align: center;
         color: #fff;
         background-color: #6495ED;
     }
     .questionsItem >>> .topBox .quBottom>div.right p:hover{
         cursor: pointer;
     }
     .questionsItem >>> .topBox .quBottom>div.right p:first-child{
         margin-right: 50px;
     }
    .questionsItem >>> .bottomBox{
        width: 85%;
        margin: 0 auto;
    }
    .questionsItem >>> .bottomBox .title{
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .questionsItem >>> .bottomBox .title .left{
        display: flex;
        font-size: 16px;
        color: #666;
    }
    .questionsItem >>> .bottomBox .title .left>div{
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    .questionsItem >>> .bottomBox .title .left>div img{
        width: 24px;
        height: 24px;
        margin-right: 5px;
    }
    .questionsItem >>> .bottomBox .title .right{
        width: 200px;
        height: 40px;
        border: 1px solid #6495ED;
        color: #6495ED;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
    }
    .questionsItem >>> .bottomBox .title .right:hover{
        cursor: pointer;
    }
    .questionsItem >>> .bottomBox .quSolt{
        display: flex;
        flex-wrap: wrap;
    }
    .questionsItem >>> .bottomBox .quSolt .itemQu{
        width: 54px;
        height: 54px;
        text-align: center;
        line-height: 54px;
        color: #333;
        font-size: 16px;
        border: 1px solid #DEDEDE;
        box-sizing: border-box;
        margin-right: 3.2px;
        margin-bottom: 4px;
    }
    .questionsItem >>> .bottomBox .quSolt .itemQu:hover{
        cursor: pointer;
    }
    .questionsItem >>> .bottomBox .pageBox{
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
     .questionsItem >>> .bottomBox .pageBox p{
         width: 90px;
         height: 40px;
         border: 1px solid #C4CACE;
         font-size: 12px;
         color: #666;
         text-align: center;
         line-height: 40px;
     }
     .questionsItem >>> .bottomBox .pageBox p:hover{
         cursor: pointer;
     }
     .questionsItem >>> .bottomBox .pageBox p:first-child{
         margin-right: 20px;
     }
     /* 题目解析 */
     .questionsItem >>> .quAnalysis{
         width: 85%;
         margin:0 auto;
     }
     .questionsItem >>> .quAnalysis .answer{
         width: 100%;
         height: 50px;
         display: flex;
         align-items: center;
         background-color: #E0EAFB;
         font-size: 18px;
         color: #333;
     }
     .questionsItem >>> .quAnalysis .answer p{
         margin-left: 30px;
     }
     .questionsItem >>> .quAnalysis .answer p span{
         color: #6495ED;
     }
     .questionsItem >>> .quAnalysis .analysisBox .title{
         height: 50px;
         line-height: 50px;
         text-align: left;
         font-size: 20px;
         font-weight: bold;
         color: #333;
         border-bottom: 1px solid #C4CACE;
         margin-bottom: 20px;
     }
     .questionsItem >>> .quAnalysis .videoBox .video{
         width: 672px;
         height: 378px;
         margin: 0px auto;
     }
     .questionsItem >>> .quAnalysis .txtBox .text{
         font-size: 16px;
         color: #333;
         text-align: justify;
         margin-bottom: 50px;
     }
     /* 打卡 */
     .questionsItem >>> .dkShow{
         width: 83px;
         height: 65px;
         position: fixed;
         top:160px;
         right:0;
         z-index: 9;
     }
     .questionsItem >>> .dkBox{
        width: 536px;
        height:860px;
        box-shadow: 0px 0px 10px rgba(174, 186, 255, 0.5);
        background-color: #fff;
        position: absolute;
        top:50px;
        right:0;
        z-index: 9;
        padding: 10px;
        box-sizing: border-box;
     }
     .questionsItem >>> .dkBox .title{
         width: 100%;
         height: 40px;
         text-align: center;
         line-height: 40px;
         color: #333;
         font-size: 20px;
         border-bottom: 1px solid #809494;
         position: relative;
     }
     .questionsItem >>> .dkBox .title img{
        width: 22.76px;
        height: 16.54px;
        position: absolute;
        left:20px;
        top:12px;
        z-index: 1;
     }
    .questionsItem >>> .dkBox .centerBox{
        width: 454px;
        height: 582px;
        margin: 20px auto 20px auto;
        position: relative;
    }
    .questionsItem >>> .dkBox .centerBox .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        z-index: -1;
    }
    .questionsItem >>> .dkBox .centerBox .txtBox{
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;
        position: absolute;
        bottom: 30px;
        left: 0;
        z-index: 1;
        color: #333;
        font-size: 16px;
    }
    .questionsItem >>> .dkBox .centerBox .txtBox div{
        display: flex;
        align-items: baseline;
    }
    .questionsItem >>> .dkBox .centerBox .txtBox>div:first-child{
         margin-bottom: 20px;
     }
     .questionsItem >>> .dkBox .centerBox .txtBox>div:last-child{
         justify-content: space-between;
     }
     .questionsItem >>> .dkBox .centerBox .txtBox div h2{
         font-size: 30px;
         font-weight: 400;
     }
    .questionsItem >>> .dkBox .dkreward{
        width: 100%;
        display: flex;
        align-items: center;
        height: 50px;
    }
    .questionsItem >>> .dkBox .dkreward p{
        width: 30%;
        height: 1px;
        background-color: #809494;
    }
    .questionsItem >>> .dkBox .dkreward div{
        font-size: 14px;
        color: #333;
        width: 40%;
        text-align: center;
    }
    .questionsItem >>> .dkBox .rewardTxt{
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .questionsItem >>> .dkBox .rewardTxt>img{
        width: 77px;
        height: 77px;
        margin-right: 30px;
    }
    .questionsItem >>> .dkBox .rewardTxt .left p{
        text-align: left;
        font-size: 12px;
        color: #333;
        margin-bottom: 5px;
    }
</style>