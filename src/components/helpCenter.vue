<template>
    <div class="helpCenter" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="box">
            <div class="left">
                <p>我的提问</p>
                <textarea v-model="myquestionsVal" placeholder="请在此处输入您的问题详情"></textarea>
                <div class="questionsBtn">
                    提问
                </div>
                <div class="questionsBox">
                    <vue-scroll :ops="ops" style="width:100%;height:100%;">
                    <el-collapse accordion>
                        <el-collapse-item>
                            <template slot="title">
                             <el-button type="danger">待回复</el-button>  医维度主要有哪些内容？
                            </template>
                            <div>
                                暂未回复
                            </div>
                        </el-collapse-item>
                        <el-collapse-item>
                            <template slot="title">
                                <el-button type="danger">待回复</el-button>  如何操作使用医维度？
                            </template>
                            <div>暂未回复</div>
                        </el-collapse-item>
                        <el-collapse-item>
                            <template slot="title">
                                <el-button type="success">已回复</el-button>  企业用户该如何购买医维度？
                            </template>
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>简化流程：设计简洁直观的操作流程；</div>
                            <div class="time">
                                <span>2021-04-27 14:32</span>
                                <div>
                                    <!-- <span>追问</span>
                                    <span>已解决</span> -->
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item>
                            <template slot="title">
                                <el-button type="success">已回复</el-button>  个人用户该如何购买医维度里的标本？
                            </template>
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                            <div class="time">
                                <span>2021-04-27 14:32</span>
                                <div>
                                    <!-- <span>追问</span>
                                    <span>已解决</span> -->
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item>
                            <template slot="title">
                                <el-button type="success">已回复</el-button>  医维度主要有哪些内容？
                            </template>
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                            <div class="time">
                                <span>2021-04-27 14:32</span>
                                <div>
                                    <!-- <span>追问</span>
                                    <span>已解决</span> -->
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    </vue-scroll>
                </div>
            </div>
            <div class="right">
                <p>常见问题解答</p>
                <div class="questionsBox">
                    <vue-scroll :ops="ops" style="width:100%;height:100%;">
                    <el-collapse accordion>
                        <el-collapse-item title="医维度主要有哪些内容？">
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>
                                与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="如何操作使用医维度？">
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                        </el-collapse-item>
                        <el-collapse-item title="企业用户该如何购买医维度？">
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>简化流程：设计简洁直观的操作流程；</div>
                        </el-collapse-item>
                        <el-collapse-item title="个人用户该如何购买医维度里的标本？">
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                        </el-collapse-item>
                        <el-collapse-item title="医维度主要有哪些内容？">
                            <img src="../../static/image/personal/touxiang1@2x.png" alt="">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
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
import {mapState,mapMutations} from 'vuex';
export default {
    data(){
        return{
            myquestionsVal:''
        }
    },
    store,
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange"]),
    },
    computed:mapState(["ops","opsx","screenHeight"])
}
</script>
<style>
    .helpCenter .el-collapse-item__header{
        background-color: transparent;
        border:none;
        font-size: 16px;
        color: #666;
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
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
    .helpCenter .el-collapse-item__content img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .helpCenter .el-collapse-item__content>div{
        text-align: left;
        width: 90%;
        font-size: 16px;
        color: #666;
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
        padding-right: 100px;
    }
    .helpCenter .el-collapse-item__content div.time>div span{
        display: inline-block;
        color: #FFAA00;
    }
    .helpCenter .el-collapse-item__content div.time>div span:nth-child(1){
        margin-right: 30px;
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
    .helpCenter .box .right{
        width: 500px;
    }
    .helpCenter .box .left p,.helpCenter .box .right p{
        text-align: left;
        font-size: 18px;
        color: #333;
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
        height: 460px;
        background-color: #F1F4F5;
        clear: both;
    }
</style>