<template>
    <div class="search" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex" @searchFu="searchFu" @searchPage="searchPage"></topnav>
        </div>
        <div class="twoNav">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#fff" active-text-color="#FFD302" @select="changeNav">
                <el-menu-item index="1"> 
                    模型
                </el-menu-item>
                <el-menu-item index="2">
                    视频
                </el-menu-item>
            </el-menu>
        </div>
        <div class="publicBox" v-if="twoNavIndex==1&&itemArr.length>0">
            <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                <img v-lazy="'../../static/image/professional/bg_changyong@2x.png'" class="bj">
                <div class="imgTop" @click="lookItem(item.id,item.need_vip)">
                    <img v-lazy="item.thumbnail">
                    <div class="iconTop">
                        <!-- <p>100</p> -->
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
        <div v-else-if="twoNavIndex==1&&itemArr.length==0&&showVal" style="padding-top:20px;font-size:20px;font-weight:bold">
            暂无数据
        </div>
        <div class="publicBox boxyxsp" v-if="twoNavIndex==2&&itemArr.length>0">
            <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                <img v-lazy="'../../static/image/enterprise/bg_yxsp@2x.png'" class="bj">
                <div class="imgTop" @click="lookItem(item.id,item.need_vip)">
                    <img v-lazy="item.thumbnail">
                    <div class="iconTop">
                        <!-- <p>100</p> -->
                        <img v-if="item.need_vip" src="../../static/image/professional/icon_members@2x.png">
                    </div>
                    <div class="iconDown">
                        <img src="../../static/image/professional/icon_view@2x.png">{{item.hits}}
                    </div>
                    <img src="../../static/image/enterprise/icon_bf@2x.png" class="module">
                </div>
                <div class="txtDown">
                    <h2>{{item.title}}</h2>
                    <p>{{item.sub_title}} {{item.sub_title2}}</p>
                </div>
            </div>
        </div>
        <div v-else-if="twoNavIndex==2&&itemArr.length==0&&showVal" style="padding-top:20px;font-size:20px;font-weight:bold">
            暂无数据
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
import {professionalModel,enterpriseModel} from '../services/api/modelVideo'
import {info} from '../services/api/personal'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'0',
            twoNavIndex:'1',
            currentPage:1,
            data:{},
            itemArr:[],
            pageSize:0,
            total:0,
            showVal:false
        }
    },
    store,
    created(){
        let data1={};
        if(localStorage.getItem('searchData')){
            data1=JSON.parse(localStorage.getItem('searchData'));
            this.currentPage=JSON.parse(localStorage.getItem('searchData')).page;
            this.twoNavIndex=localStorage.getItem('searchIndex')?localStorage.getItem('searchIndex'):'1';
        }else{
            data1['type']='M';
            data1['page']=1,
            data1['keywords']=this.$route.query.val?this.$route.query.val:'';
        }
        this.islogin(data1);
    },
    mounted(){
        this.windowChange()
    },
    methods:{
         ...mapMutations(["windowChange","changeUser","changeSearch"]),
        // 本页全站搜索
        searchFu(str){
            this.itemArr=[];
            this.showVal=false;
            this.currentPage=1;
            this.twoNavIndex='1';
            let obj=this.data;
            obj.page=1;
            obj.keywords=str;
            obj.type='M';
            this.islogin(obj);
        },
        // 搜索本页
        searchPage(str){
            this.itemArr=[];
            this.showVal=false;
            this.currentPage=1;
            let obj=this.data;
            obj.page=1;
            obj.keywords=str;
            this.islogin(obj);
        },
        // 导航
        changeNav(key){
            this.itemArr=[];
            this.showVal=false;
            this.twoNavIndex=key;
            localStorage.setItem('searchIndex',key);
            this.currentPage=1;
            let obj=this.data;
            obj.page=1;
            if(key=='1'){
                obj.type='M';
            }else if(key=='2'){
                obj.type='V';
            }
            this.islogin(obj);
            this.toTop(50);
        },
        // 查看详情
        lookItem(id,isVip){
            if(isVip){
                this.$alert('此模型需开通会员','提示',{
                    confirmButtonText:'立即开通',
                    center:true
                })
            }else{
                if(this.twoNavIndex=='1'){
                    window.location.href='https://www.evdo.vip/portal/model/view/id/'+id+'/token/'+localStorage.getItem('token')+'/version/2.0';
                }else if(this.twoNavIndex=='2'){
                    this.$router.push({
                        path:'/videoItem',
                        query:{
                            id:id
                        }
                    })
                }
            }
        },
        // 分页
        handleCurrentChange(val){
            this.itemArr=[];
            this.showVal=false;
            let obj=this.data;
            obj.page=val;
            this.islogin(obj);
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
        // 判断是否登录以及登录类型
        islogin(data){
            info().then((res)=>{
                if(res.data.code==-200){
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.getProList(data);
                }else{
                    if(res.data.data.is_enterprise){
                        this.getEntList(data)
                    }else{
                        this.getProList(data);
                    }
                }
            })
        },
        // 获取专业版模型、视频列表
        getProList(data){
            this.data=data;
            localStorage.setItem('searchData',JSON.stringify(data));
            professionalModel(data).then((res)=>{
                if(res.data.code==0){
                    this.itemArr=res.data.data.data;
                    this.pageSize=res.data.data.per_page;
                    this.total=res.data.data.total;
                    this.showVal=true;
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 获取专业版模型、视频列表
        getEntList(data){
            this.data=data;
            localStorage.setItem('searchData',JSON.stringify(data));
            enterpriseModel(data).then((res)=>{
                if(res.data.code==0){
                    this.itemArr=res.data.data.data;
                    this.pageSize=res.data.data.per_page;
                    this.total=res.data.data.total;
                    this.showVal=true;
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        }
    },
    beforeRouteLeave(to, form, next) {
        next();
        if(to.name!="VideoItem"){
            localStorage.removeItem('searchData');
            localStorage.removeItem('searchIndex');
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight","searchval"])
}
</script>
<style>
    .search .twoNav .el-menu-demo{
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .search .twoNav .el-menu-item{
        height: 60px !important;
        font-size: 18px !important;
        margin: 0 20px;
    }
</style>
<style scoped>
    .search{
        padding-top: 60px;
        box-sizing: border-box;
    }
    .twoNav{
        width: 100%;
        height: 60px;
        position: fixed;
        top:60px;
        left: 0;
        z-index: 9;
        background-color:#616576;
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
        height: 50px;
        display: flex;
        justify-content: center;
    }
    /* 医学视频 */
    .boxyxsp .pubItem{
        height: 265px;
    }
    .boxyxsp .pubItem .imgTop{
        height: 160px;
    }
    .boxyxsp .pubItem .imgTop .module{
        width: 36px;
        height: 36px;
        position: absolute;
        top: 62px;
        left: 102px;
        z-index: 1;
    }
</style>