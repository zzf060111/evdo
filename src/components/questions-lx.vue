<template>
    <div class="questions-lx questionsItem">
        <div class="topBox">
            <div class="quTitle">
                <div class="left">
                    <p>单选</p>
                    <span>1. 可屈髋关节和膝关节的肌是？</span>
                </div>
                <div class="right">
                    <img src="../../static/image/question/icon_collection2.png" alt="">
                    <span>收藏</span>
                </div>
            </div>
            <div class="quSelBox">
                <div class="quSelItem" v-for="(item,index) of selArr" :key="index">
                    <div class="icon" v-show="item.isSel==0" @click="selAnswer(index)"></div>
                    <img src="../../static/image/question/icon_xz.png" alt=""  v-show="item.isSel==1" @click="clearAnswer(index)">
                    <p>{{zmArr[index]+'.'+item.txt}}</p>
                </div>
            </div>
            <div class="quImg">
                <img src="../../static/image/question/0b9d68bbb683fa45920f795485e4524a.png" alt="">
            </div>
            <div class="quBottom">
                <div class="left">
                    <el-switch v-model="isDown"></el-switch>
                    <p>答对自动下一题</p>
                </div>
                <div class="right">
                    <p>上一题</p>
                    <p>下一题</p>
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
                        <img src="../../static/image/question/icon_yes.png" alt="">正确：3题
                    </div>
                    <div>
                        <img src="../../static/image/question/icon_error.png" alt="">错误：1题
                    </div>
                </div>
                <div class="right">
                    清除当前做题记录
                </div>
            </div>
            <div class="quSolt">
                <div class="itemQu" v-for="(item,index) of 100" :key="index">{{index+1}}</div>
            </div>
            <div class="pageBox">
                <p>上一页</p>
                <p>下一页</p>
            </div>
        </div>
        <!-- 题目讲解 -->
        <div class="quAnalysis" v-show="isAnalysis">
            <div class="answer">
                <p>答案 <span>A</span></p>
                <p>您选择 <span>A</span></p>
            </div>
            <div class="videoBox analysisBox">
                <div class="title">视频讲解</div>
                <video src="" controls poster="../../static/image/question/13b6efacd7ad6b0760a172cb77ba927e.png"></video>
            </div>
            <div class="txtBox analysisBox">
                <div class="title">题目讲解</div>
                <div class="text">
                    题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解题目讲解
                </div>
            </div>
        </div>
        <img src="../../static/image/question/icon_dk.png" alt="" class="dkShow" @click="trueDk">
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
                        <div><h2>100</h2>天</div>
                        <p>2021年5月7日</p>
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
    </div>
</template>
<script>
export default {
    data(){
        return{
            selArr:[
                {id:"1",txt:'髂腰肌',isSel:0},
                {id:"2",txt:'髂腰肌',isSel:0},
                {id:"3",txt:'髂腰肌',isSel:0},
                {id:"4",txt:'髂腰肌',isSel:0}
            ],
            zmArr:['A','B','C','D','E','F','G','H','I','J','K'],
            isDown:false,
            isDk:false,
            isAnalysis:false
        }
    },
    methods:{
        // 选择答案
        selAnswer(index){
            let str="判断";
            let arr=this.selArr;
            if(str=="单选"||str=="判断"){
                for(let i=0;i<arr.length;i++){
                    if(index==i){
                        arr[i].isSel=1
                    }else{
                        arr[i].isSel=0
                    }
                }
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
            let arr=this.selArr;
            for(let i=0;i<arr.length;i++){
                if(index==i){
                    arr[i].isSel=0
                }
            }
            this.selArr=arr;
        },
        // 确定打卡
        trueDk(){
            this.isDk=true;
        }
    }
}
</script>
<style scoped>
    
</style>