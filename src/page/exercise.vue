<template>
    <div class="exercise" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <div class="topNav">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
            </div>
            <div class="twoNav" v-if="twoNav.length>0">
                <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
                    <el-menu-item :index="item.num" v-for="(item,index) of twoNav" :key="index"> 
                        {{item.name}}
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="leftNav" :style="`height:${screenHeight-110}px`" v-if="leftNav.length>0">
                <vue-scroll :ops="ops" style="width:100%;height:100%;">
                    <el-menu class="left-menu" :default-active="leftNavIndex" background-color="#F6F6F6" unique-opened @select="changLeftNav">
                        <div v-for="(item,index) of leftNav" :key="index">
                            <el-submenu :index="item.num" v-if="item.childrens&&item.childrens.length>0">
                                <template slot="title">
                                    <span>{{item.name}} <b>|</b> 共{{item.nums}}题</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item :index="item2.num" v-for="(item2,index2) of item.childrens" :key="index2">{{item2.name}} <b>|</b> 共{{item2.nums}}题</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item :index="item.num" v-else>
                                <span slot="title">{{item.name}} <b>|</b> 共{{item.nums}}题</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                </vue-scroll>
            </div>
            <div class="centerBox">
                <div class="box">
                    <div class="item" v-for="(item,index) of itemArr" :key="index" @click="jumpItem(item.id,item.txt)">
                        <img :src="item.icon" alt="">
                        <h3>{{item.txt}}</h3>
                    </div>
                </div>
            </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
import {category} from '../services/api/exercise'
export default {
    data(){
        return{
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'4',
            twoNavIndex:'1',
            twoNav:[],
            leftNavIndex:'',
            twoNavTxt:'',
            leftNavTxt1:'',
            leftNavTxt2:'',
            itemTxt:'',
            leftNav:[],
            itemArr:[
                {
                    id:1,
                    txt:'顺序练习',
                    icon:require('../../static/image/exercise/icon_sxlx.png')
                },
                {
                    id:2,
                    txt:'随机练习',
                    icon:require('../../static/image/exercise/icon_sjlx.png')
                },
                {
                    id:3,
                    txt:'模拟考试',
                    icon:require('../../static/image/exercise/icon_mnks.png')
                },
                {
                    id:4,
                    txt:'我的错题',
                    icon:require('../../static/image/exercise/icon_wdct.png')
                },
                {
                    id:5,
                    txt:'我的收藏',
                    icon:require('../../static/image/exercise/icon_wdsc.png')
                }
            ],
            questionArr:[]
        }
    },
    store,
    created(){
        this.getFenlei();
    },
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange","alertTxt"]),
        changeNav(key){
            this.twoNavIndex=key;
            localStorage.setItem('exetwoIndex',key);
            localStorage.removeItem('exeleftIndex');
            this.twoNavTxt=this.twoNav[parseInt(key)-1].name;
            this.getFenlei();            
        },
        // 切换左侧导航
        changLeftNav(key,keyPath){
            this.leftNavIndex=key;
            localStorage.setItem('exeleftIndex',key);
            let arr=key.split('-');
            let leftArr=this.leftNav;
            if(arr.length==1){
                this.leftNavTxt1=leftArr[parseInt(arr[0]-1)].name;
                this.leftNavTxt2='';
            }else if(arr.length==2){
                this.leftNavTxt1=leftArr[parseInt(arr[0]-1)].name;
                this.leftNavTxt2=leftArr[parseInt(arr[0]-1)].childrens[parseInt(arr[1])-1].name;
            }
        },
        // 返回顶部
        toTop(i){
            //参数i表示间隔的幅度大小，以此来控制速度，例如50
            document.documentElement.scrollTop-=i;
            if (document.documentElement.scrollTop>0) {
                var c=setTimeout(()=>this.toTop(i),16);
            }else {
                clearTimeout(c);
            }
        },
        // 跳转题详情
        jumpItem(id,txt){
            let arrTxt=[];
            let idObj={};
            arrTxt.push(this.twoNavTxt);
            arrTxt.push(this.leftNavTxt1);
            if(this.leftNavTxt2){
                arrTxt.push(this.leftNavTxt2);
            }
            arrTxt.push(txt);
            let arr=this.leftNavIndex.split('-');
            let qunum;
            if(arr.length==1){
                idObj['type']=id;
                idObj['lev']=1;
                idObj['id']=this.leftNav[parseInt(arr[0]-1)].id;
                idObj['pid']=this.leftNav[parseInt(arr[0]-1)].id;
                qunum=this.leftNav[parseInt(arr[0]-1)].nums;
            }else if(arr.length==2){
                idObj['type']=id;
                idObj['lev']=2;
                idObj['id']=this.leftNav[parseInt(arr[0]-1)].childrens[parseInt(arr[1]-1)].id;
                idObj['pid']=this.leftNav[parseInt(arr[0]-1)].id;
                qunum=this.leftNav[parseInt(arr[0]-1)].childrens[parseInt(arr[1]-1)].nums;
            }
            if(qunum==0){
                this.$alert('此类题型暂无题','提示',{
                    confirmButtonText:'确定',
                    center:true,
                    showClose:false
                })
            }else{
                this.$router.push({
                    name:'Questions',
                    params:{
                        arrTxt,
                        idObj
                    }
                })
            }
        },
        // 获取答题分类
        getFenlei(){
            category().then((res)=>{
                if(res.data.code==0){
                    let leftArr=[];
                    let arr=res.data.data.reverse();
                    let twoArr=[];
                    for(let i=0;i<arr.length;i++){
                        let obj={};
                        obj['id']=arr[i].id;
                        obj['name']=arr[i].name;
                        obj['num']=(i+1).toString();
                        twoArr.push(obj);
                    }
                    this.questionArr=arr;
                    this.twoNav=twoArr;
                    this.twoNavIndex=localStorage.getItem('exetwoIndex')?localStorage.getItem('exetwoIndex'):twoArr[0].num;
                    this.twoNavTxt=localStorage.getItem('exetwoIndex')?twoArr[parseInt(localStorage.getItem('exetwoIndex'))-1].name:twoArr[0].name;
                    if(this.twoNavIndex=='1'){
                        let obj1={};
                        obj1['id']=arr[0].id;
                        obj1['name']='专项自测';
                        obj1['nums']=arr[0].parent_questions_count;
                        obj1['num']='1';
                        obj1.childrens=[];
                        for(let i=0;i<arr[0].child.length;i++){
                            let objItem={};
                            objItem['id']=arr[0].child[i].id;
                            objItem['name']=arr[0].child[i].name;
                            objItem['nums']=arr[0].child[i].questions_count;
                            objItem['num']=`1-${i+1}`;
                            obj1.childrens.push(objItem);
                        }
                        let obj2={};
                        obj2['id']=arr[0].id;
                        obj2['name']='综合自测';
                        obj2['nums']=arr[0].parent_questions_count;
                        obj2['num']='2';
                        leftArr.push(obj1);
                        leftArr.push(obj2);
                    }else if(this.twoNavIndex=='2'){
                        let obj1={};
                        obj1['id']=arr[1].id;
                        obj1['name']='专项自测';
                        obj1['nums']=arr[1].parent_questions_count;
                        obj1['num']='1';
                        obj1.childrens=[];
                        for(let i=0;i<arr[1].child.length;i++){
                            let objItem={};
                            objItem['id']=arr[1].child[i].id;
                            objItem['name']=arr[1].child[i].name;
                            objItem['nums']=arr[1].child[i].questions_count;
                            objItem['num']=`1-${i+1}`;
                            obj1.childrens.push(objItem);
                        }
                        let obj2={};
                        obj2['id']=arr[1].id;
                        obj2['name']='综合自测';
                        obj2['nums']=arr[1].parent_questions_count;
                        obj2['num']='2';
                        leftArr.push(obj1);
                        leftArr.push(obj2);
                    }
                    this.leftNav=leftArr;
                    this.leftNavIndex=localStorage.getItem('exeleftIndex')?localStorage.getItem('exeleftIndex'):leftArr[0].childrens[0].num;
                    if(localStorage.getItem('exeleftIndex')){
                        let arr=localStorage.getItem('exeleftIndex').split('-');
                        if(arr.length==1){
                            this.leftNavTxt1=leftArr[parseInt(arr[0]-1)].name;
                            this.leftNavTxt2='';
                        }else if(arr.length==2){
                            this.leftNavTxt1=leftArr[parseInt(arr[0]-1)].name;
                            this.leftNavTxt2=leftArr[parseInt(arr[0]-1)].childrens[parseInt(arr[1])-1].name;
                        }
                    }else{
                        this.leftNavTxt1=leftArr[0].name;
                        this.leftNavTxt2=leftArr[0].childrens?leftArr[0].childrens[0].name:'';
                    }
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        }
    },
    beforeRouteLeave(to, form, next) {
        next();
        if(to.name!="Questions"){
            localStorage.removeItem('exetwoIndex');
            localStorage.removeItem('exeleftIndex');
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","ops","screenHeight"])
}
</script>
<style>
    .exercise .twoNav .el-menu-demo{
        height: 100%;
    }
    .exercise .twoNav .el-menu-item{
        height: 50px !important;
    }
    .left-menu .el-submenu__title{
        display: flex;
        align-items: center;
    }
    .left-menu .el-submenu__title img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .left-menu .el-submenu__title span{
        width:180px;    
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
        text-align: left;
    }
    .left-menu .el-menu-item-group__title{
        padding: 0 !important;
    }
    .left-menu .el-submenu.is-active .el-submenu__title{
        font-weight: bold;
    }
    .exercise .left-menu .el-menu-item{
        width: 100%;
        height: 40px;
        margin:0 auto;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
        text-align: left;
        line-height: 40px;
    }
    .left-menu  .el-menu-item.is-active{
        background-color: #FFD302 !important;
        border-radius: 10px;
        color: #333 !important;
        font-weight: bold;
    }
</style>
<style scoped>
    .exercise{
        padding-top: 50px;
        box-sizing: border-box;
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
    .leftNav{
        width: 300px;
        background-color: #F6F6F6;
        overflow-y: auto;
        position: fixed;
        top:110px;
        left: 0;
        z-index: 9;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .centerBox{
        width: 100%;
        padding: 0 50px 0 350px;
        box-sizing: border-box;
    }
    .centerBox .box{
        width: 1450px;
        padding:50px 0 0 50px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }
    .centerBox .box .item{
        width: 300px;
        height: 306px;
        background-color: #F8F9F9;
        margin:0 40px 40px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .centerBox .box .item img{
        margin-top: -50px;
    }
    .centerBox .box .item h3{
        font-size: 30px;
        color: #333;
        font-weight: 400;
        width: 300px;
        text-align: center;
        position: absolute;
        bottom: 50px;
        z-index: 1;
    }
</style>