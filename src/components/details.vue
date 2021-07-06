<template>
    <div class="details" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <p class="title">企业组信息</p>
            <div class="formBox">
                <el-form :model="detailform" label-width="100px"  ref="detailform">
                    <el-form-item label="院校" prop="organization">
                        <el-input v-model="detailform.organization" type="text" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="班级" prop="class">
                        <el-input v-model="detailform.class" type="text" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="detailform.name" type="text" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="学号" prop="sno">
                        <el-input v-model="detailform.sno" type="text" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="邀请码" prop="code">
                        <el-input v-model="detailform.code" type="text" readonly></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btnBox" @click="quitGroup">
                退出组织
            </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import {info,quitGroup} from '../services/api/personal'
export default {
    data(){
        return{
            detailform:{
                organization:'',
                class:'',
                name:'',
                sno:'',
                code:''
            }
        }
    },
    store,
    created(){
        // 验证登录是否失效
        this.isLogin()
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
                    let obj=this.detailform;
                    obj['organization']=res.data.data.organization;
                    obj['class']=res.data.data.class;
                    obj['name']=res.data.data.realname;
                    obj['sno']=res.data.data.student_id;
                    obj['code']=res.data.data.class_code;
                    this.detailform=obj;
                }
            })
        },
        // 退出组织
        quitGroup(){
            this.$alert('确定退出组织','退出组织',{
                confirmButtonText:'确定',
                center:true,
                customClass:'errorAlert',
                callback:(action)=>{
                    if(action=='confirm'){
                        quitGroup().then((res)=>{
                            if(res.data.code==0){
                                this.alertTxt({msg:res.data.msg,type:'success'});
                                this.$emit('changeNav',2);
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
        }
    },
    computed:mapState(["ops","opsx","screenHeight"])
}
</script>
<style>
    .details .el-input__inner,.details .el-form-item__label{
        height: 60px;
        font-size: 20px;
        color: #333;
    }
    .details .el-input__inner{
        background-color: #F8F9F9;
    }
    .details .el-form-item__label{
        line-height: 60px;
        text-align: left;
    }
    .details .el-form-item{
        margin-bottom: 30px;
    }
</style>
<style scoped>
    .details p.title{
        width: 100%;
        height: 50px;
        line-height: 60px;
        text-align: left;
        font-size: 18px;
        color: #333;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .details .formBox{
        width: 680px;
        margin: 150px auto 40px auto;
    }
    .details .btnBox{
        width: 110px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #FF5555;
        border: 1px solid #FF5555;
        margin: 0 auto;
    }
</style>