<template>
    <div class="questions-lx questionsItem" v-if="queArr.length>0">
        <div class="topBox">
            <div class="quTitle">
                <div class="left">
                    <p>{{queArr[indexd].question.type==1?'判断':'单选'}}</p>
                    <span>{{`${(page-1)*100+(indexd+1)}. ${queArr[indexd].question.title}`}}</span>
                </div>
                <div :class="queArr[indexd].question.favorite_count==0?'right':'right isSc'" @click="clickSc">
                    <img :src="queArr[indexd].question.favorite_count==0?'../../static/image/question/icon_collection2.png':'../../static/image/question/icon_collection3.png'" alt="">
                    <span>{{queArr[indexd].question.favorite_count==0?'收藏':'已收藏'}}</span>
                </div>
            </div>
            <div class="quSelBox" v-if="selArr.length>0">
                <div class="quSelItem" v-for="(item,index) of selArr" :key="index">
                    <div class="icon" v-show="item.isSel==0&&item.txt" @click="selAnswer(index,item.id)"></div>
                    <img src="../../static/image/question/icon_xz.png" alt=""  v-show="item.isSel==1&&item.txt" @click="clearAnswer(index)">
                    <p v-show="item.txt">{{zmArr[index]}}.{{item.txt}}</p>
                </div>
            </div>
            <!-- <div class="quImg">
                <img src="../../static/image/question/0b9d68bbb683fa45920f795485e4524a.png" alt="">
            </div> -->
            <div class="quBottom">
                <div class="left">
                    <el-switch v-model="isDown" @change="changeIsdowm"></el-switch>
                    <p>答对自动下一题</p>
                </div>
                <div class="right">
                    <p @click="upQuestion">上一题</p>
                    <p @click="downQuestion">下一题</p>
                </div>
            </div>
        </div>
        <div class="bottomBox">
            <div class="title">
                <div class="left">
                    <div>
                        <img src="../../static/image/question/icon_xz.png" alt="">当前选择
                    </div>
                    <div>
                        <img src="../../static/image/question/icon_yes.png" alt="">正确：{{yesCount}}题
                    </div>
                    <div>
                        <img src="../../static/image/question/icon_error.png" alt="">错误：{{errorCount}}题
                    </div>
                </div>
                <div class="right" @click="clearTjl">
                    清除当前做题记录
                </div>
            </div>
            <div class="quSolt">
                <div :class="indexd==index?`itemQu ishere`:item.is_answer==0?'itemQu':item.answer_status==0?'itemQu isNo':'itemQu isYes'" v-for="(item,index) of queArr" :key="index" @click="jumpQuestion(index)">{{(page-1)*100+(index+1)}}</div>
            </div>
            <div class="pageBox" v-if="queArr.length>0">
                <p @click="upPage">上一页</p>
                <p @click="downPage">下一页</p>
            </div>
        </div>
        <!-- 题目讲解 -->
        <div class="quAnalysis" v-show="isAnalysis">
            <div class="answer">
                <p>答案 <span>{{zmArr[parseInt(queArr[indexd].question.true_option)-1]}}</span></p>
                <p>您选择 <span>{{zmArr[parseInt(queArr[indexd].answer-1)]}}</span></p>
            </div>
            <!-- <div class="videoBox analysisBox">
                <div class="title">视频讲解</div>
                <video src="" controls poster="../../static/image/question/13b6efacd7ad6b0760a172cb77ba927e.png"></video>
            </div> -->
            <div class="txtBox analysisBox">
                <div class="title">题目讲解</div>
                <div class="text">
                    {{queArr[indexd].question.analysis}}
                </div>
            </div>
        </div>
        <img src="../../static/image/question/icon_dk.png" alt="" class="dkShow" @click="trueDk">
        <transition name="slideRight">
        <div class="dkBox" v-show="isDk">
            <div class="title">
                <img src="../../static/image/question/icon_back.png" alt="" @click="isDk=false">
                自测日历
            </div>
            <div class="centerBox">
                <img src="../../static/image/question/pic_zcrl.png" alt="" class="bj">
                <div class="txtBox">
                    <div>
                        <h2>我</h2>
                        <p>已经坚持自测</p>
                    </div>
                    <div>
                        <div><h2>{{signCount}}</h2>天</div>
                        <p>{{signDate}}</p>
                    </div>
                </div>
            </div>
            <div class="dkreward">
                <p></p>
                <div>连续自测打卡获特别奖励</div>
                <p></p>
            </div>
            <div class="rewardTxt">
                <img src="../../static/image/question/pic_zcrl2.png" alt="">
                <div class="left">
                    <p>1. 每日坚持自测可获得医维度VIP限时体验福利</p>
                    <p>2. 连续自测打卡天数越多，获得的福利越大</p>
                    <p>3. 活动最终解释权归医维度所有</p>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapMutations} from 'vuex'
import {question,answer,favorite,paperReset,signIn} from '../services/api/exercise'
export default {
    data(){
        return{
            selArr:[],
            zmArr:['A','B','C','D','E','F','G','H','I','J','K'],
            isDown:false,
            isDk:false,
            isAnalysis:false,
            data:{},
            page:1,
            indexd:0,
            queArr:[],
            lastPage:0,
            errorCount:0,
            yesCount:0,
            signDate:'',
            signCount:''
        }
    },
    store,
    props: {
		idObj:{
            type:Object
        }
	},
    created(){
        // 判断是否选中答对自动下一题
        if(localStorage.getItem(`queIsdownLx${this.idObj.id}`)=='1'){
            this.isDown=true;
        }else{
            this.isDown=false;
        }
        // 判断题题库初始加载
        let data={};
        if(localStorage.getItem(`quesDataLx${this.idObj.id}`)){
            data=JSON.parse(localStorage.getItem(`quesDataLx${this.idObj.id}`));
            this.page=data.page;
        }else{
            data['category_id']=this.idObj.id;
            data['level']=this.idObj.lev;
            data['type']=this.idObj.type;
            data['page']=this.page;
            data['limit']=100;
        }
        this.getQuestions(data);
    },
    methods:{
        ...mapMutations(["alertTxt"]),
        // 选择答案
        selAnswer(index,id){
            let str=this.queArr[this.indexd].question.type==1?"判断":'单选';
            let arr=this.selArr;
            if(str=="单选"||str=="判断"){
                for(let i=0;i<arr.length;i++){
                    if(index==i){
                        arr[i].isSel=1
                    }else{
                        arr[i].isSel=0
                    }
                }
                let data={};
                data['question_id']=this.queArr[this.indexd].question_id;
                data['answer']=id;
                data['paper_id']=this.queArr[this.indexd].paper_id;
                this.clickDt(data,id);
            }else if(str=="多选"){
               for(let i=0;i<arr.length;i++){
                    if(index==i){
                        arr[i].isSel=1
                    }
                }
            }
            this.selArr=arr;
        },
        // 是否答对自动下一题
        changeIsdowm(){
            if(this.isDown){
                localStorage.setItem(`queIsdownLx${this.idObj.id}`,'1')
            }else{
                localStorage.setItem(`queIsdownLx${this.idObj.id}`,'0')
            }
        },
        // 取消答案
        clearAnswer(index){
            // let arr=this.selArr;
            // for(let i=0;i<arr.length;i++){
            //     if(index==i){
            //         arr[i].isSel=0
            //     }
            // }
            // this.selArr=arr;
        },
        // 收藏取消收藏题目
        clickSc(){
            let data={};
            data['question_id']=this.queArr[this.indexd].question_id;
            favorite(data).then((res)=>{
                if(res.data.code==0){
                    this.alertTxt({msg:res.data.msg,type:'success'});
                    this.getQuestions(this.data);
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 重新生成试卷
        clearTjl(){
            this.$alert('清除记录，重新开始练习！','提示',{
                confirmButtonText:'清除记录',
                center:true,
                customClass:'errorAlert',
                callback:(action)=>{
                    if(action=='confirm'){
                        let data={};
                        data['paper_id']=this.queArr[this.indexd].paper_id;
                        paperReset(data).then((res)=>{
                            if(res.data.code==0){
                                this.alertTxt({msg:res.data.msg,type:'success'});
                                let obj=this.data;
                                obj.page=1;
                                this.page=1;
                                this.getQuestions(obj);
                                localStorage.removeItem(`queindexLx${this.idObj.id}`);
                                this.indexd=0;
                            }else if(res.data.code==-200){
                                this.alertTxt({msg:res.data.msg,type:'error'});
                                this.$router.push('/');
                            }else{
                                this.alertTxt({msg:res.data.msg,type:'error'});
                            }
                        })
                    }
                }
            })
        },
        // 确定打卡
        trueDk(){
            signIn().then((res)=>{
                if(res.data.code==0){
                    this.alertTxt({msg:res.data.msg,type:'success'});
                    this.isDk=true;
                    let obj=res.data.data;
                    this.signCount=obj.signCount;
                    this.signDate=obj.signDay.split('-')[0]+'年'+obj.signDay.split('-')[1]+'月'+obj.signDay.split('-')[2]+'日';
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 上一题
        upQuestion(){
            if(this.indexd==0){
                this.alertTxt({msg:'已到第一题',type:'warning'});
            }else{
                this.indexd--;
                let obj=this.queArr[this.indexd].question.option;
                let arr=[];
                for(let i in obj){
                    let newObj={};
                    newObj['id']=i;
                    newObj['txt']=obj[i];
                    if(this.queArr[this.indexd].answer==i){
                        newObj['isSel']=1;
                    }else{
                        newObj['isSel']=0;
                    }
                    arr.push(newObj);
                }
                this.selArr=arr;
                this.isAnalysis=this.queArr[this.indexd].is_answer==1?true:false;
                localStorage.setItem(`queindexLx${this.idObj.id}`,this.indexd);
            }
        },
        // 下一题
        downQuestion(){
            if(this.indexd==(this.queArr.length-1)){
                this.alertTxt({msg:'已到当前页最后一题',type:'warning'});
            }else{
                this.indexd++;
                let obj=this.queArr[this.indexd].question.option;
                let arr=[];
                for(let i in obj){
                    let newObj={};
                    newObj['id']=i;
                    newObj['txt']=obj[i];
                    if(this.queArr[this.indexd].answer==i){
                        newObj['isSel']=1;
                    }else{
                        newObj['isSel']=0;
                    }
                    arr.push(newObj);
                }
                this.selArr=arr;
                this.isAnalysis=this.queArr[this.indexd].is_answer==1?true:false;
                localStorage.setItem(`queindexLx${this.idObj.id}`,this.indexd);
            }
        },
        // 跳转题目
        jumpQuestion(num){
            this.indexd=num;
            let obj=this.queArr[this.indexd].question.option;
            let arr=[];
            for(let i in obj){
                let newObj={};
                newObj['id']=i;
                newObj['txt']=obj[i];
                if(this.queArr[this.indexd].answer==i){
                    newObj['isSel']=1;
                }else{
                    newObj['isSel']=0;
                }
                arr.push(newObj);
            }
            this.selArr=arr;
            this.isAnalysis=this.queArr[this.indexd].is_answer==1?true:false;
            localStorage.setItem(`queindexLx${this.idObj.id}`,this.indexd);
        },
        // 上一页
        upPage(){
            if(this.page==1){
                this.alertTxt({msg:'已到第一页',type:'warning'});
            }else{
                this.queArr=[];
                localStorage.removeItem(`queindexLx${this.idObj.id}`);
                this.page--;
                let obj=this.data;
                obj.page=this.page;
                this.getQuestions(obj);
            }
        },
        // 下一页
        downPage(){
            if(this.page==this.lastPage){
                this.alertTxt({msg:'已到最后页',type:'warning'});
            }else{
                this.queArr=[];
                localStorage.removeItem(`queindexLx${this.idObj.id}`);
                this.page++;
                let obj=this.data;
                obj.page=this.page;
                this.getQuestions(obj);
            }
        },
        // 获取题库
        getQuestions(data){
            this.data=data;
            localStorage.setItem(`quesDataLx${this.idObj.id}`,JSON.stringify(data));
            question(data).then((res)=>{
                if(res.data.code==0){
                    this.queArr=res.data.data.questions.data;
                    if(localStorage.getItem(`queindexLx${this.idObj.id}`)){
                        this.indexd=parseInt(localStorage.getItem(`queindexLx${this.idObj.id}`));
                    }else{
                        this.indexd=0;
                    }
                    let obj=this.queArr[this.indexd].question.option;
                    let arr=[];
                    for(let i in obj){
                        let newObj={};
                        newObj['id']=i;
                        newObj['txt']=obj[i];
                        if(this.queArr[this.indexd].answer==i){
                            newObj['isSel']=1;
                        }else{
                            newObj['isSel']=0;
                        }
                        arr.push(newObj);
                    }
                    this.selArr=arr;
                    this.lastPage=res.data.data.questions.last_page;
                    this.yesCount=res.data.data.paper.paper_right_count;
                    this.errorCount=res.data.data.paper.paper_error_count;
                    this.isAnalysis=this.queArr[this.indexd].is_answer==1?true:false;
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 答题
        clickDt(data,id){
            answer(data).then((res)=>{
                if(res.data.code==0){
                    this.getQuestions(this.data);
                    if(this.isDown){
                        if(id==this.queArr[this.indexd].question.true_option){
                            this.indexd++;
                            let obj=this.queArr[this.indexd].question.option;
                            let arr=[];
                            for(let i in obj){
                                let newObj={};
                                newObj['id']=i;
                                newObj['txt']=obj[i];
                                if(this.queArr[this.indexd].answer==i){
                                    newObj['isSel']=1;
                                }else{
                                    newObj['isSel']=0;
                                }
                                arr.push(newObj);
                            }
                            this.selArr=arr;
                            this.isAnalysis=this.queArr[this.indexd].is_answer==1?true:false;
                            localStorage.setItem(`queindexLx${this.idObj.id}`,this.indexd);
                        }
                    }
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        }
    }
}
</script>
<style scoped>
    .quSolt .itemQu.ishere{
        background-color: #6495ED;
        border: 1px solid #6495ED;
        color: #fff !important;
    }
    .quSolt .itemQu.isYes{
        background-color: #34C758;
        border: 1px solid #34C758;
        color: #fff !important;
    }
    .quSolt .itemQu.isNo{
        background-color: #EB4847;
        border: 1px solid #EB4847;
        color: #fff !important;
    }
    .questionsItem .topBox .quTitle .right.isSc{
        border: 1px solid #FFD302 !important;
        color: #FFD302 !important;
    }
</style>