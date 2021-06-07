<template>
    <div class="professional" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="ops" style="width:100%;height:100%;">
        <div class="topNav">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex" @searchPage="searchPage"></topnav>
            </vue-scroll>
        </div>
        <div class="twoNav" v-if="twoNavList.length>0">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
                <el-menu-item :index="item.num" v-for="(item,index) of twoNavList" :key="index"> 
                    {{item.name}}
                </el-menu-item>
            </el-menu>
            </vue-scroll>
        </div>
        <div class="publicBox" v-if="twoNavIndex!=twoNavList.length&&itemArr.length>0">
            <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                <img v-lazy="require('../../static/image/professional/bg_changyong@2x.png')" class="bj">
                <div class="imgTop" @click="lookItem(item.id,item.need_vip)">
                    <img v-lazy="item.thumbnail">
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
        <div v-else-if="twoNavIndex!=twoNavList.length&&itemArr.length==0&&valueShow" style="padding-top:20px;font-size:20px;font-weight:bold">
            暂无数据
        </div>
        <div class="publicBox boxyxsp"  v-if="twoNavIndex==twoNavList.length&&itemArr.length>0">
            <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                <img v-lazy="require('../../static/image/enterprise/bg_yxsp@2x.png')" class="bj">
                <div class="imgTop" @click="lookItem(item.id,item.need_vip)">
                    <img v-lazy="item.thumbnail">
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
                    <img :src="require('../../static/image/enterprise/icon_bf@2x.png')" class="module">
                </div>
                <div class="txtDown">
                    <h2>{{item.title}}</h2>
                    <p>{{item.sub_title}} {{item.sub_title2}}</p>
                </div>
            </div>
        </div>
        <div v-else-if="twoNavIndex==twoNavList.length&&itemArr.length==0&&valueShow" style="padding-top:20px;font-size:20px;font-weight:bold">
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
import {professionalCategory,professionalModel} from '../services/api/modelVideo'
export default {
    data(){
        return{
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'2',
            twoNavIndex:'',
            twoNavList:[],
            currentPage:1,
            pageSize:0,
            total:0,
            itemArr:[],
            valueShow:false,
            data:{}
        }
    },
    store,
    created(){
        let id=this.$route.query.id?this.$route.query.id:'noid';
        // 获取列表
        this.getFenlei(id);
    },
    mounted(){
        this.windowChange()
    },
    methods:{
        ...mapMutations(["windowChange","alertTxt","changeSearch"]),
        // 本页搜索
        searchPage(str){
            let obj=this.data;
            this.currentPage=1;
            obj['keywords']=str;
            obj.page=1;
            this.itemArr=[];
            this.valueShow=false;
            this.getList(obj);
        },
        // 导航
        changeNav(key){
            this.changeSearch('');
            this.twoNavIndex=key;
            localStorage.setItem('proindex',key);
            this.itemArr=[];
            this.valueShow=false;
            this.currentPage=1;
            let id=this.twoNavList[parseInt(key)-1].id;
            let data={};
            if(id==0){
                data['type']='M';
                data['page']=this.currentPage;
                data['isRecommaned']=1;
                data['limit']=18;
            }else if(id==-1){
                data['type']='V';
                data['page']=this.currentPage;
                data['limit']=18;
            }else{
                data['type']='M';
                data['page']=this.currentPage;
                data['parent_id']=id;
                data['limit']=18;
            }
            this.getList(data);
        },
        // 分页
        handleCurrentChange(val){
            this.itemArr=[];
            this.valueShow=false;
            let obj=this.data;
            obj.page=val;
            this.getList(obj);
            this.toTop(50)
        },
        // 返回顶部
        toTop(i){
            //参数i表示间隔的幅度大小，以此来控制速度，例如50
            document.documentElement.scrollTop-=i;
            if(document.documentElement.scrollTop>0) {
                var c=setTimeout(()=>this.toTop(i),16);
            }else{
                clearTimeout(c);
            }
        },
        // 查看详情
        lookItem(id,isVip){
            if(isVip){
                this.$alert('此模型需开通会员','提示',{
                    confirmButtonText:'立即开通',
                    center:true
                })
            }else{
                if(this.twoNavIndex!=this.twoNavList.length){
                    window.location.href='https://www.evdo.vip/portal/model/view/id/'+id+'/token/'+localStorage.getItem('token')+'/version/2.0';
                }else if(this.twoNavIndex==this.twoNavList.length){
                    this.$router.push({
                        path:'/videoItem',
                        query:{
                            id:id
                        }
                    })
                }
            }
        },
        // 获取分类
        getFenlei(jumpId){
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
                    newArr.push({id:-1,name:'医学动画'});
                    for(let i=0;i<newArr.length;i++){
                        newArr[i]['num']=(i+1).toString();
                    }
                    if(jumpId!='noid'){
                        if(localStorage.getItem('proindex')){
                            this.twoNavIndex=localStorage.getItem('proindex')
                        }else{
                            for(let i=0;i<newArr.length;i++){
                                if(jumpId==newArr[i].id){
                                    this.twoNavIndex=newArr[i].num;
                                }
                            }
                        }
                    }else{
                        this.twoNavIndex=localStorage.getItem('proindex')?localStorage.getItem('proindex'):newArr[0].num;
                    }
                    this.currentPage=localStorage.getItem('prodata')?JSON.parse(localStorage.getItem('prodata')).page:1;
                    this.twoNavList=newArr;
                    let data1={};
                    if(localStorage.getItem('prodata')){
                        data1=JSON.parse(localStorage.getItem('prodata'));
                    }else{
                        if(jumpId!='noid'){
                            if(jumpId==-1){
                                data1['type']='V';
                                data1['page']=this.currentPage;
                                data1['limit']=18;
                            }else{
                                data1['type']='M';
                                data1['page']=this.currentPage;
                                data1['parent_id']=jumpId;
                                data1['limit']=18;
                            }
                        }else{
                            data1['type']='M';
                            data1['page']=this.currentPage;
                            data1['isRecommaned']=1;
                            data1['limit']=18;
                        }
                    }
                    this.getList(data1);
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        },
        // 获取列表
        getList(data){
            this.data=data;
            localStorage.setItem('prodata',JSON.stringify(data));
            professionalModel(data).then((res)=>{
                this.valueShow=true;
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
    beforeRouteLeave(to, form, next) {
        next();
        if(to.name!="VideoItem"){
            localStorage.removeItem('proindex');
            localStorage.removeItem('prodata');
        }
    },
    components:{
        topnav
    },
    computed:mapState(["opsx","screenHeight","ops"])
}
</script>
<style>
    .professional .twoNav .el-menu-demo{
        height: 100%;
        display: flex;
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
        width: 91%;
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
        width:240px;                                                                                                           
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
        display: flex;
        justify-content: center;
    }
     /* 医学视频 */
    .publicBox.boxyxsp .pubItem{
        height: 265px;
    }
    .publicBox.boxyxsp .pubItem .imgTop{
        height: 160px;
    }
    .publicBox.boxyxsp .pubItem .imgTop .module{
        width: 36px;
        height: 36px;
        position: absolute;
        top: 62px;
        left: 102px;
        z-index: 1;
    }
</style>