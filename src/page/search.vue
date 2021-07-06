<template>
    <div class="search" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="ops" style="width:100%;height:100%;">
        <div class="topNav">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex" @searchFu="searchFu" @searchPage="searchPage" ref="child"></topnav>
            </vue-scroll>
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
        <div ref="publicBox" :style="`padding-left:${publicBoxPl}px`">
            <div class="publicBox" v-if="twoNavIndex==1&&itemArr.length>0">
                <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                    <img v-lazy="require('../../static/image/professional/bg_changyong@2x.png')" class="bj">
                    <div class="imgTop">
                        <img :src="item.thumbnail" @click="lookItem(item.id,item.need_vip)">
                        <div class="iconTop">
                            <p>{{(currentPage-1)*15+(index+1)}}</p>
                            <img v-if="item.is_auth==1" :src="require('../../static/image/professional/icon_members@2x.png')">
                            <p v-else-if="item.is_auth==0">免费</p>
                        </div>
                        <div class="iconDown">
                            <p><img :src="require('../../static/image/professional/icon_view@2x.png')">{{item.view_count}}</p>
                            <div @click="addSc(item.id,item.is_favorite,index)">
                                <img :src="item.is_favorite?require('../../static/image/index/icon_ysc.png'):require('../../static/image/index/icon_sc.png')" alt="">
                            </div>
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
                    <img v-lazy="require('../../static/image/enterprise/bg_yxsp@2x.png')" class="bj">
                    <div class="imgTop">
                        <img v-lazy="item.thumbnail" @click="lookItem(item.id,item.need_vip)">
                        <div class="iconTop">
                            <p>{{(currentPage-1)*15+(index+1)}}</p>
                            <img v-if="item.is_auth==1" :src="require('../../static/image/professional/icon_members@2x.png')">
                            <p v-else-if="item.is_auth==0">免费</p>
                        </div>
                        <div class="iconDown">
                            <p><img :src="require('../../static/image/professional/icon_view@2x.png')">{{item.hits}}</p>
                            <div @click="addSc(item.id,item.is_favorite,index)">
                                <img :src="item.is_favorite?require('../../static/image/index/icon_ysc.png'):require('../../static/image/index/icon_sc.png')" alt="">
                            </div>
                        </div>
                        <img :src="require('../../static/image/enterprise/icon_bf@2x.png')" class="module" @click="lookItem(item.id,item.need_vip)">
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
import {professionalModel,enterpriseModel,addfavorites,delfavorites} from '../services/api/modelVideo'
import {info} from '../services/api/personal'
export default {
    data(){
        return{
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'0',
            twoNavIndex:'1',
            currentPage:1,
            data:{},
            itemArr:[],
            pageSize:0,
            total:0,
            showVal:false,
            publicBoxPl:0
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
            // data1['keywords']=this.$route.query.val?this.$route.query.val:'';
            data1['keywords']=this.searchval;
            data1['limit']=18;
        }
        this.islogin(data1);
    },
    mounted(){
        this.windowChange(document.documentElement.clientHeight);
        this.$nextTick(()=>{
            // 获取父元素
            let publicBox=this.$refs.publicBox;
            // 获取宽度
            let wpublicBox = publicBox.getBoundingClientRect().width;
            // 添加左内边距
            if(wpublicBox<=325){
                this.publicBoxPl=0;
            }else{
                this.publicBoxPl=(wpublicBox-Math.floor(wpublicBox/292)*292)/2;
            }
        });
        const that = this;
        window.onresize=()=>{
            this.windowChange(document.documentElement.clientHeight);
            return(()=>{
                this.$nextTick(()=>{
                    // 获取父元素
                    let publicBox=this.$refs.publicBox;
                    // 获取宽度
                    let wpublicBox = publicBox.getBoundingClientRect().width;
                    // 添加左内边距
                    if(wpublicBox<=325){
                        this.publicBoxPl=0;
                    }else{
                        this.publicBoxPl=(wpublicBox-Math.floor((wpublicBox)/292)*292)/2;
                    }
                });
            })()
        }
    },
    methods:{
         ...mapMutations(["windowChange","changeUser","changeSearch","alertTxt"]),
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
            obj.keywords=this.searchval;
            this.islogin(obj);
            this.toTop(50);
        },
        // 查看详情
        lookItem(id,isVip){
            if(isVip){
                this.$alert('此模型需开通会员','提示',{
                    confirmButtonText:'立即开通',
                    center:true,
                    callback:(action)=>{
                        if(action=='confirm'){
                            if(localStorage.getItem('token')){
                                this.$router.push({
                                    name:'Personal',
                                    params:{
                                        rShow:5
                                    }
                                })
                            }else{
                                this.$refs.child.jumpLogin();
                            }
                        }
                    }
                })
            }else{
                if(this.twoNavIndex=='1'){
                    // window.location.href='https://www.evdo.vip/portal/model/view/id/'+id+'/token/'+localStorage.getItem('token')+'/version/2.0';
                    let f=document.createElement('form');
                    f.style.display='none';
                    f.action='https://www.evdo.vip/portal/model/view/';
                    f.method='post';
                    f.innerHTML='<input type="hidden" name="id" value="'+id+'"/><input type="hidden" name="token" value="'+localStorage.getItem('token')+'"/><input type="hidden" name="version" value="'+2.0+'"/>';
                    document.body.appendChild(f);
                    f.submit();
                    f.remove();
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
        // 收藏取消收藏模型
        addSc(id,isSc,index){
            if(isSc){
                let data={};
                data['ids']=id;
                data['type']=this.itemArr[index].video_url?'video':'model';
                delfavorites(data).then((res)=>{
                    if(res.data.code==0){
                        this.alertTxt({msg:res.data.msg,type:'success'});
                        this.itemArr[index].is_favorite=false;
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'warning'});
                    }
                })
            }else{
                let data={};
                data['id']=id;
                data['table']=this.itemArr[index].video_url?'video':'model';
                addfavorites(data).then((res)=>{
                    if(res.data.code==0){
                        this.alertTxt({msg:res.data.msg,type:'success'});
                        this.itemArr[index].is_favorite=true;
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'warning'});
                    }
                })
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
    computed:mapState(["ops","opsx","screenHeight","searchval"])
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
        width: 100%;
        max-width: 1920px;
        min-height: 200px;
        margin:0 auto;
        /* padding:10px 0 0 10px; */
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
        width: 205px;
        justify-content: space-between;
        bottom: 10px;
    }
    .publicBox .pubItem .imgTop .iconDown>div img{
        width: 30px;
        height: 30px;
    }
    .publicBox .pubItem .imgTop .iconDown>div img:hover{
        cursor: pointer;
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