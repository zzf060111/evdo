<template>
    <div class="professional" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex" @searchPage="searchPage"></topnav>
        </div>
        <div class="twoNav" v-if="twoNavList.length>0">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
                <el-menu-item :index="item.num" v-for="(item,index) of twoNavList" :key="index"> 
                    {{item.name}}
                </el-menu-item>
            </el-menu>
        </div>
        <div class="publicBox" v-if="itemArr.length>0">
            <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                <img v-lazy="'../../static/image/professional/bg_changyong@2x.png'" class="bj">
                <div class="imgTop" @click="lookItem">
                    <img v-lazy="item.thumbnail">
                    <div class="iconTop">
                        <!-- <p></p> -->
                        <img v-if="item.need_vip" src="../../static/image/professional/icon_members@2x.png">
                    </div>
                    <div class="iconDown">
                        <img src="../../static/image/professional/icon_view@2x.png">{{item.view_count}}
                    </div>
                </div>
                <div class="txtDown">
                    <h2>{{item.title}}</h2>
                    <p>{{item.subtitle}}  {{item.sub_title2}}</p>
                </div>
            </div>
        </div>
        <div class="pageBox" v-if="itemArr.length>0">
            <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total,prev, pager, next,jumper"
            :total="total"
            hide-on-single-page
            >
            </el-pagination>
        </div>
        </vue-scroll>
    </div>    
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
import {professionalCategory,professionalModel} from '../services/api/modelVideo'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'2',
            twoNavIndex:'',
            twoNavList:[],
            currentPage:1,
            pageSize:0,
            total:0,
            itemArr:[]
        }
    },
    store,
    created(){
        // 获取列表
        this.getFenlei()
    },
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange","alertTxt"]),
        // 本页搜索
        searchPage(str){
            console.log(str);
        },
        // 导航
        changeNav(key){
            console.log(this.twoNavList[parseInt(key)-1].id)
        },
        // 分页
        handleCurrentChange(val){
           this.toTop(50)
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
        // 查看详情
        lookItem(){
            this.$alert('此模型需开通会员','提示',{
                confirmButtonText:'立即开通',
                center:true,
                callback:()=>{
                    console.log('确定')
                }
            })
        },
        // 获取分类
        getFenlei(){
            let data={};
            data['type']='M';
            professionalCategory(data).then((res)=>{
                if(res.data.code==0){
                    let arr=res.data.data;
                    let newArr=[];
                    for(let i=0;i<arr.length;i++){
                        let obj={};
                        obj['id']=arr[i].id;
                        obj['name']=arr[i].name;
                        newArr.push(obj);
                    }
                    newArr.unshift({id:0,name:'常用'});
                    newArr.push({id:-1,name:'视频'});
                    for(let i=0;i<newArr.length;i++){
                        newArr[i]['num']=(i+1).toString();
                    }
                    this.twoNavIndex=newArr[0].num;
                    this.twoNavList=newArr;
                    let data={};
                    data['type']='M';
                    data['page']=this.currentPage;
                    data['isRecommaned']=1;
                    this.getList(data);
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 获取列表
        getList(data){
            professionalModel(data).then((res)=>{
                if(res.data.code==0){
                    this.itemArr=res.data.data.data;
                    this.pageSize=res.data.data.per_page;
                    this.total=res.data.data.total;
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style>
    .professional .twoNav .el-menu-demo{
        height: 100%;
    }
    .professional .twoNav .el-menu-item{
        height: 50px !important;
    }
    .professional .el-pagination{
        margin: 20px 0;
    }
</style>
<style scoped>
    .professional{
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
    .publicBox{
        width: 1765px;
        min-height: 200px;
        margin:0 auto;
        padding:10px 0 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
    .publicBox .pubItem{
        width: 282px;
        height: 348px;
        margin:0 10px 10px 0;
        box-sizing: border-box;
        position: relative;
        padding: 21px;
    }
    .publicBox .pubItem .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .publicBox .pubItem .imgTop{
        width: 240px;
        height: 240px;
        position: relative;
    }
    .publicBox .pubItem .imgTop>img{
        width: 100%;
        height: 100%;
    }
    .publicBox .pubItem .imgTop .iconTop,.publicBox .pubItem .imgTop .iconDown{
        width: 200px;
        display: flex;
        align-items: center;
        position: absolute;
        left: 20px;
        z-index: 1;
        color: #fff;
    }
    .publicBox .pubItem .imgTop .iconTop{
        justify-content: space-between;
        top:20px;
    }
    .publicBox .pubItem .imgTop .iconDown{
        bottom: 20px;
    }
    .publicBox .pubItem .imgTop .iconTop p{
        width: 32px;
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        line-height: 20px;
    }
    .publicBox .pubItem .imgTop .iconTop img{
        width: 20px;
        height: 16.27px;
    }
    .publicBox .pubItem .imgTop .iconDown img{
        width: 13.81px;
        height: 9.98px;
        margin-right: 5px;
    }
    .publicBox .pubItem .txtDown{
        width: 100%;
        line-height: 25px;
        color: #333;
        text-align: left;
        margin-top: 10px;
        padding-left: 20px;
        box-sizing: border-box;
    }
    .publicBox .pubItem .txtDown h2{
        font-size: 16px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .publicBox .pubItem .txtDown p{
        font-size: 12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .pageBox{
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>