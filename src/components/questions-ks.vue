<template>
    <div class="questions-lx questionsItem" v-if="queArr.length>0">
        <div class="topBox">
            <div class="quTitle">
                <div class="left">
                    <p>{{queArr[indexd].question.type==1?'判断':'单选'}}</p>
                    <span>{{`${(indexd+1)}. ${queArr[indexd].question.title}`}}</span>
                </div>
            </div>
            <div class="quSelBox" v-if="selArr.length>0">
                <div class="quSelItem" v-for="(item,index) of selArr" :key="index">
                    <div class="icon" v-show="item.isSel==0&&item.txt" @click="selAnswer(index,item.id)"></div>
                    <img :src="require('../../static/image/question/icon_xz.png')" alt=""  v-show="item.isSel==1&&item.txt" @click="clearAnswer(index)">
                    <p v-show="item.txt">{{zmArr[index]}}.{{item.txt}}</p>
                </div>
            </div>
            <!-- <div class="quImg">
                <img src="../../static/image/question/0b9d68bbb683fa45920f795485e4524a.png" alt="">
            </div> -->
            <div class="quBottom">
                <div class="left" v-show="questionType==0">
                    <img :src="stopVisible?require('../../static/image/question/icon_djs2.png'):require('../../static/image/question/icon_djs.png')" alt="" @click="pauseTime">
                    <p>倒计时：{{ksTime}}</p>
                    <p>提示：{{queArr[indexd].question.type==1?'提示：判断题，请判断对错':'单选题，请选择你认为正确的答案'}}</p>
                </div>
                <div class="right">
                    <p @click="upQuestion">上一题</p>
                    <p @click="downQuestion">下一题</p>
                    <p @click="handedIn" v-show="questionType==0">交卷</p>
                </div>
            </div>
        </div>
        <div class="bottomBox">
            <div class="title">
                <!-- <div class="left">
                    <div>
                        <img src="../../static/image/question/icon_xz.png" alt="">当前选择
                    </div>
                    <div>
                        <img src="../../static/image/question/icon_yes.png" alt="">正确：3题
                    </div>
                    <div>
                        <img src="../../static/image/question/icon_error.png" alt="">错误：1题
                    </div>
                </div> -->
                <div class="left" v-show="questionType==0">
                    <div>
                        <img :src="require('../../static/image/question/icon_xz.png')" alt="">已答：{{yesAnswer}}题
                    </div>
                    <div>
                        <img :src="require('../../static/image/question/round.png')" alt="">未答：{{noAnswer}}题
                    </div>
                </div>
                <div class="left" v-show="questionType==1">
                    <div>
                        <img :src="require('../../static/image/question/icon_yes.png')" alt="">正确：{{yesCount}}题
                    </div>
                    <div>
                        <img :src="require('../../static/image/question/icon_error.png')" alt="">错误：{{errorCount+noAnswer}}题
                    </div>
                </div>
                <!-- <div class="right">
                    清除当前做题记录
                </div> -->
            </div>
            <div class="quSolt" v-show="questionType==0">
                <div :class="indexd==index?'itemQu ishere':item.is_answer==0?'itemQu':'itemQu isAnswer'" v-for="(item,index) of queArr" :key="index" @click="jumpQuestion(index)">{{index+1}}</div>
            </div>
            <div class="quSolt" v-show="questionType==1">
                <div :class="item.answer_status==0?indexd==index?'itemQu isNo ishere':'itemQu isNo':indexd==index?'itemQu isYes ishere':'itemQu isYes'" v-for="(item,index) of queArr" :key="index" @click="jumpQuestion(index)">{{index+1}}</div>
            </div>
            <!-- <div class="pageBox">
                <p>上一页</p>
                <p>下一页</p>
            </div> -->
        </div>
        <!-- 题目讲解 -->
        <div class="quAnalysis" v-show="questionType==1">
            <div class="answer">
                <p>答案 <span>{{zmArr[parseInt(queArr[indexd].question.true_option)-1]}}</span></p>
                <p>您选择 <span>{{queArr[indexd].answer?zmArr[parseInt(queArr[indexd].answer-1)]:'未答'}}</span></p>
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
        <!-- 打卡 -->
        <img :src="require('../../static/image/question/icon_dk.png')" alt="" class="dkShow" @click="trueDk">
        <transition name="slideRight">
        <div class="dkBox" v-show="isDk">
            <div class="title">
                <img :src="require('../../static/image/question/icon_back.png')" alt="" @click="isDk=false">
                自测日历
            </div>
            <div class="centerBox">
                <img :src="require('../../static/image/question/pic_zcrl.png')" alt="" class="bj">
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
                <img :src="require('../../static/image/question/pic_zcrl2.png')" alt="">
                <div class="left">
                    <p>1. 每日坚持自测可获得医维度VIP限时体验福利</p>
                    <p>2. 连续自测打卡天数越多，获得的福利越大</p>
                    <p>3. 活动最终解释权归医维度所有</p>
                </div>
            </div>
        </div>
        </transition>
        <!-- 暂停、提醒框 -->
        <el-dialog title="" :visible.sync="stopVisible" :append-to-body="true" :close-on-click-modal="false" :show-close="false" center custom-class="stop" top="30vh">
			<div class="textCount">
                <p>当前做题进度{{yesAnswer}}/{{yesAnswer+noAnswer}}题</p>
                <div>
                    <img :src="require('../../static/image/question/icon_djstime.png')" alt="">倒计时{{ksTime}}
                </div>
            </div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="abandonks">放弃本次考试</el-button>
                <el-button type="primary" @click="continueks">继续答题</el-button>
			</div>
		</el-dialog>
        <!-- 提示交卷 -->
        <el-dialog title="" :visible.sync="ishandeVisible" :append-to-body="true" :close-on-click-modal="false" :show-close="false" center custom-class="stop" top="30vh">
			<div class="textCount">
                <div>
                    <img :src="require('../../static/image/question/icon_djstime.png')" alt="">剩余时间{{ksTime}}
                </div>
                <p> 已答题数：{{yesAnswer}} | 未答题数{{noAnswer}}</p>
            </div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="noHande">暂不交卷</el-button>
                <el-button type="primary" @click="yesHande">现在交卷</el-button>
			</div>
		</el-dialog>
        <!-- 交卷完成提示 -->
        <el-dialog title="" :visible.sync="handedVisible" :append-to-body="true" :close-on-click-modal="false" :show-close="false" center custom-class="stop handed" top="30vh">
			<div class="textCount">
                <h4 v-show="score>=80">成绩优秀</h4>
                <h4 v-show="score>=60&&score<=70">成绩合格</h4>
                <h4 v-show="score<60">成绩不合格</h4>
                <h2>{{score}}分</h2>
                <p> 错题：{{errorCount}} | 答题数：{{yesAnswer}} | 未答题数：{{noAnswer}}</p>
            </div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="jumpGetout">离开</el-button>
                <el-button type="primary" @click="seeErrorque">查看错题</el-button>
			</div>
		</el-dialog>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapMutations} from 'vuex'
import {question,answer,signIn,paperReset,paperSubmit,getPaperQuestion} from '../services/api/exercise'
export default {
    data(){
        return{
            selArr:[],
            zmArr:['A','B','C','D','E','F','G','H','I','J','K'],
            isDown:false,
            isDk:false,
            data:{},
            queArr:[],
            indexd:0,
            page:1,
            ksTime:'',
            yesAnswer:0,
            noAnswer:0,
            stopVisible:false,
            ishandeVisible:false,
            handedVisible:false,
            timeInterval:'',
            paperId:0,
            score:0,
            errorCount:0,
            yesCount:0,
            questionType:0,
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
        let arrTxt=JSON.parse(localStorage.getItem('arrTxt'));
        if(arrTxt[arrTxt.length-1]=='提交考试'){
            this.$router.go(-1);
        }else{
            if(!localStorage.getItem('questionType') || localStorage.getItem('questionType')==0){
                let data={};
                data['category_id']=this.idObj.id;
                data['level']=this.idObj.lev;
                data['type']=this.idObj.type;
                data['page']=this.page;
                data['limit']=100;
                this.getQuestions(data);
            }else if(localStorage.getItem('questionType')==1){
                let data={};
                data['paper_id']=localStorage.getItem('errorPaperId');
                data['page']=this.page;
                data['limit']=100;
                this.getPaperQuestion(data);
            }
        }
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
                this.clickDt(data);
            }else if(str=="多选"){
               for(let i=0;i<arr.length;i++){
                    if(index==i){
                        arr[i].isSel=1
                    }
                }
            }
            this.selArr=arr;
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
                localStorage.setItem(`queindexks${this.idObj.id}`,this.indexd);
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
                localStorage.setItem(`queindexks${this.idObj.id}`,this.indexd);
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
            localStorage.setItem(`queindexks${this.idObj.id}`,this.indexd);
        },
        // 暂停考试
        pauseTime(){
            if(this.stopVisible){
                this.stopVisible=false;
            }else{
                this.stopVisible=true;
                localStorage.setItem('stopVisible',1);
                clearInterval(this.timeInterval);
            }
        },
        // 放弃考试
        abandonks(){
            let data={};
            data['paper_id']=this.paperId;
            data['page']=this.page;
            data['limit']=100
            paperReset(data).then((res)=>{
                if(res.data.code==0){
                    this.stopVisible=false;
                    localStorage.removeItem('queKstime');
                    localStorage.removeItem(`queindexks${this.idObj.id}`);
                    this.getQuestions(this.data); 
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 继续考试
        continueks(){
            localStorage.setItem('stopVisible',0);
            this.stopVisible=false;
            this.changeTime(parseInt(localStorage.getItem('queKstime')));
        },
        // 提交试卷
        handedIn(){
            this.ishandeVisible=true;
        },
        // 暂不交卷
        noHande(){
            this.ishandeVisible=false;
        },
        // 交卷
        yesHande(){
            let data={};
            this.ishandeVisible=false;
            data['paper_id']=this.paperId;
            paperSubmit(data).then((res)=>{
                if(res.data.code==0){
                    this.handedVisible=true;
                    clearInterval(this.timeInterval);
                    this.noAnswer=res.data.data.paper_unanswered_count;
                    this.yesAnswer=res.data.data.paper_answered_count;
                    this.score=res.data.data.score;
                    this.errorCount=res.data.data.paper_error_count;
                    let arrTxt=JSON.parse(localStorage.getItem('arrTxt'));
                    arrTxt[arrTxt.length-1]='提交考试';
                    localStorage.setItem('arrTxt',JSON.stringify(arrTxt));
                    localStorage.removeItem('queKstime');
                    localStorage.removeItem('stopVisible');
                    localStorage.removeItem(`queindexks${this.idObj.id}`);
                    localStorage.removeItem('questionType');
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 离开考试
        jumpGetout(){
            this.$router.go(-1);
        },
        // 查看错题
        seeErrorque(){
            let data={};
            data['paper_id']=this.paperId;
            data['page']=this.page;
            data['limit']=100;
            this.getPaperQuestion(data);
        },
        // 获取考试题库
        getQuestions(data){
            this.data=data;
            this.questionType=0;
            localStorage.setItem('questionType',0);
            question(data).then((res)=>{
                if(res.data.code==0){
                    this.queArr=res.data.data.questions.data;
                    this.yesAnswer=res.data.data.paper.paper_answered_count;
                    this.noAnswer=parseInt(res.data.data.paper.paper_answer_count)-parseInt(res.data.data.paper.paper_answered_count);
                    this.paperId=res.data.data.questions.data[0].paper_id;
                    this.errorCount=res.data.data.paper.paper_error_count+this.noAnswer;
                    this.$emit('baocunId',this.paperId);
                    if(localStorage.getItem(`queindexks${this.idObj.id}`)){
                        this.indexd=parseInt(localStorage.getItem(`queindexks${this.idObj.id}`));
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
                    if(localStorage.getItem('queKstime')){
                        if(!localStorage.getItem('stopVisible')||localStorage.getItem('stopVisible')==0){
                            this.changeTime(parseInt(localStorage.getItem('queKstime')));
                        }else if(localStorage.getItem('stopVisible')==1){
                            this.stopVisible=true;
                            let time=parseInt(localStorage.getItem('queKstime'));
                            let min,sec;
                            min=Math.floor(time/60);
                            sec=time%60>=10?time%60:`0${time%60}`;
                            this.ksTime=`${min}:${sec}`;
                        }
                    }else{
                        let time=res.data.data.paper.simulate_time;
                        localStorage.setItem('queKstime',time);
                        let min,sec;
                        min=Math.floor(time/60);
                        sec=time%60>=10?time%60:`0${time%60}`;
                        this.ksTime=`${min}:${sec}`;
                        if(time<3600){
                            this.stopVisible=true;
                            localStorage.setItem('stopVisible',1);
                        }else{
                            this.changeTime(time);
                            localStorage.setItem('stopVisible',0);
                        }
                    }
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 获取错题详情
        getPaperQuestion(data){
            this.data=data;
            this.questionType=1;
            this.handedVisible=false;
            localStorage.setItem('questionType',1);
            getPaperQuestion(data).then((res)=>{
                if(res.data.code==0){
                    this.queArr=res.data.data.questions.data;
                    this.indexd=0;
                    this.paperId=res.data.data.questions.data[0].paper_id;
                    localStorage.setItem('errorPaperId',res.data.data.questions.data[0].paper_id);
                    localStorage.setItem(`queindexks${this.idObj.id}`,0);
                    this.yesCount=res.data.data.paper.paper_right_count;
                    this.errorCount=res.data.data.paper.paper_error_count;
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
                    let arrTxt=JSON.parse(localStorage.getItem('arrTxt'));
                    arrTxt[arrTxt.length-1]='模拟考试(错题)';
                    this.$emit('changeArrTxt',arrTxt);
                    localStorage.setItem('arrTxt',JSON.stringify(arrTxt));
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 答题
        clickDt(data){
            answer(data).then((res)=>{
                if(res.data.code==0){
                    this.getQuestions(this.data);
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 计算倒计时
        changeTime(num){
            localStorage.removeItem('queKstime');
            clearInterval(this.timeInterval);
           let min,sec;
           let timeKs=setInterval(()=>{
               if(num>0){
                   num--
                   localStorage.setItem('queKstime',num);
                   min=Math.floor(num/60);
                   sec=num%60>=10?num%60:`0${num%60}`;
                   this.ksTime=`${min}:${sec}`;
               }else{
                   this.yesHande();
               }
           },1000)
           this.$emit('changetimeKs',timeKs);
           this.timeInterval=timeKs;
        }
    }
}
</script>
<style>
    .stop .el-dialog__header{
        border-bottom: none;
    }
    .stop.el-dialog{
        width: 360px;
        height: 206px;
    }
    .handed.stop.el-dialog{
        width: 400px !important;
        height: 256px !important;
    }
    .handed.stop.el-dialog h4{
        color: #6495ED;
    }
    .handed.stop.el-dialog h2{
        font-size: 36px;
        color: #6495ED;
    }
    .stop.el-dialog button{
        width: 140px;
        height: 44px;
    }
    .stop.el-dialog .textCount{
        text-align: center;
    }
    .stop.el-dialog .textCount div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .stop.el-dialog .textCount div img{
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }
</style>
<style scoped>
    .quBottom .left{
        flex-wrap: nowrap;
    }
    .quBottom .left img{
        width: 30px;
        height: 30px;
    }
    .quBottom .left p:last-child{
        margin-left: 30px  !important;
    }
    .quBottom .left p{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .quBottom .right p:last-child{
        margin-left: 50px;
        background-color: #EB4847  !important;
    }
    .quSolt .itemQu.ishere{
        box-shadow: 0 0 0 1px rgba(0,0,0,0.5);
    }
    .quSolt .itemQu.isAnswer{
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
</style>