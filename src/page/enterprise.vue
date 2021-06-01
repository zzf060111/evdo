<template>
    <div class="enterprise" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex" @searchPage="searchPage"></topnav>
        </div>
        <div class="twoNav">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
                <el-menu-item index="1"> 
                    基础医学
                </el-menu-item>
                <el-menu-item index="2">
                    医学视频
                </el-menu-item>
                <!-- <el-menu-item index="3">
                    图谱
                </el-menu-item>
                <el-menu-item index="4">
                    课件
                </el-menu-item> -->
            </el-menu>
        </div>
        <div class="leftNav" :style="`height:${screenHeight-110}px`" v-if="leftNav.length>0">
            <vue-scroll :ops="ops" style="width:100%;height:100%;">
            <el-menu class="left-menu" :default-active="leftIndex" background-color="#F6F6F6" unique-opened @select="changLeftNav">
                <el-submenu :index="item.num" v-for="(item,index) of leftNav" :key="index">
                    <template slot="title">
                        <img :src="item.more.thumbnail">
                        <span>{{item.name}} <b>|</b> {{item.auth_count}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item2.num" v-for="(item2,index2) of item.child" :key="index2">{{item2.name}} <b>|</b> {{item2.auth_child_count}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
            </vue-scroll>
        </div>
        <div class="pubBox">
            <div class="box boxJcyx" v-show="twoNavIndex==1&&itemArr.length>0">
                <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                    <img v-lazy="require('../../static/image/professional/bg_changyong@2x.png')" class="bj">
                    <div class="imgTop" @click="lookItem(item.id,item.need_vip)">
                        <img v-lazy="item.thumbnail">
                        <div class="iconTop">
                            <p>{{(currentPage-1)*15+(index+1)}}</p>
                            <img v-if="item.need_vip" :src="require('../../static/image/professional/icon_members@2x.png')">
                        </div>
                        <div class="iconDown">
                            <img :src="require('../../static/image/professional/icon_view@2x.png')">{{item.view_count}}
                        </div>
                    </div>
                    <div class="txtDown">
                        <h2>{{item.title}}</h2>
                        <p>{{item.subtitle}}  {{item.sub_title2}}</p>
                    </div>
                </div>
            </div>
            <div v-show="twoNavIndex==1&&itemArr.length==0&&showValue" style="padding-top:20px;font-size:20px;font-weight:bold">
                暂无数据
            </div>
            <div class="box boxyxsp" v-show="twoNavIndex==2&&itemArr.length>0">
                <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                    <img v-lazy="require('../../static/image/enterprise/bg_yxsp@2x.png')" class="bj">
                    <div class="imgTop" @click="lookItem(item.id,item.need_vip)">
                        <img v-lazy="item.thumbnail">
                        <div class="iconTop">
                            <p>{{(currentPage-1)*15+(index+1)}}</p>
                            <img v-if="item.need_vip" :src="require('../../static/image/professional/icon_members@2x.png')">
                        </div>
                        <div class="iconDown">
                            <img :src="require('../../static/image/professional/icon_view@2x.png')">{{item.hits}}
                        </div>
                        <img :src="require('../../static/image/enterprise/icon_bf@2x.png')" class="module">
                    </div>
                    <div class="txtDown">
                        <h2>{{item.title}}</h2>
                        <p>{{item.sub_title}} {{item.sub_title2}}</p>
                    </div>
                </div>
            </div>
            <div v-show="twoNavIndex==2&&itemArr.length==0&&showValue" style="padding-top:20px;font-size:20px;font-weight:bold">
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
        </div>
        </vue-scroll>
    </div>
</template>
<script>
    import store from '../vuex/store'
    import {mapState,mapMutations} from 'vuex'
    import topnav from '../components/topnav'
    import {enterpriseCategory,enterpriseModel} from '../services/api/modelVideo'
    export default {
        data(){
            return{
                topIcon:require('../../static/image/top/logo2@2x.png'),
                activeIndex:'3',
                twoNavIndex:'',
                leftIndex:'',
                leftNav:[],
                currentPage:1,
                data:{},
                itemArr:[],
                showValue:false,
                pageSize:0,
                total:0
            }
        },
        store,
        created(){
            let id=this.$route.query.id?this.$route.query.id:'noid';
            let type=this.$route.query.type?this.$route.query.type:'';
            if(type){
                if(localStorage.getItem('entindex')){
                    this.twoNavIndex=localStorage.getItem('entindex');
                }else{
                    this.twoNavIndex=type;
                }
            }else{
                this.twoNavIndex=localStorage.getItem('entindex')?localStorage.getItem('entindex'):'1';
            }
            this.getFenlei(this.twoNavIndex,id);
        },
        methods:{
            ...mapMutations(["windowChange","alertTxt","changeSearch"]),
            // 本页搜索
            searchPage(str){
                let obj=this.data;
                this.currentPage=1;
                obj['keywords']=str;
                obj.page=1;
                this.showValue=false;
                this.getList(obj);
            },
            // 导航
            changeNav(key){
                this.changeSearch('');
                this.twoNavIndex=key;
                this.leftNav=[];
                this.itemArr=[];
                this.showValue=false;
                localStorage.setItem('entindex',key);
                localStorage.removeItem('entLeftnav');
                localStorage.removeItem('entdata');
                this.getFenlei(key,'noid');
                this.toTop(50)
            },
            // 切换左侧导航
            changLeftNav(key,keyPath){
                this.changeSearch('');
                localStorage.setItem('entLeftnav',key);
                this.itemArr=[];
                this.showValue=false;
                let obj=this.data;
                let arr=this.leftNav;
                let id1=arr[parseInt(keyPath[0])-1].id;
                let id2=arr[parseInt(keyPath[0])-1].child[parseInt(key.split('-')[1])-1].id;
                obj.parent_id=id1;
                obj.category_id=id2;
                obj.page=1;
                obj['keywords']='';
                this.getList(obj);
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
            // 分页
            handleCurrentChange(val){
                this.itemArr=[];
                this.showValue=false;
                let obj=this.data;
                obj.page=val;
                this.getList(obj);
                this.toTop(50);
            },
            // 获取企业版分类
            getFenlei(index,jumpId){
                let data={};
                if(index==1){
                    data['type']='M';
                }else if(index==2){
                    data['type']='V';
                }
                enterpriseCategory(data).then((res)=>{
                    if(res.data.code==0){
                        let arr=res.data.data;
                        for(let i=0;i<arr.length;i++){
                            arr[i]['num']=(i+1).toString();
                            for(let j=0;j<arr[i].child.length;j++){
                                arr[i].child[j]['num']=`${i+1}-${(j+1)}`;
                            }
                        }
                        this.leftNav=arr;
                        if(jumpId!='noid'){
                            if(localStorage.getItem('entLeftnav')){
                                this.leftIndex=localStorage.getItem('entLeftnav');
                            }else{
                                if(jumpId==-1){
                                    this.leftIndex=localStorage.getItem('entLeftnav')?localStorage.getItem('entLeftnav'):arr[0].child[0].num;
                                }else{
                                    for(let i=0;i<arr.length;i++){
                                        if(jumpId==arr[i].id){
                                            this.leftIndex=arr[i].child[0].num;
                                        }
                                    }
                                }
                            }
                        }else{
                            this.leftIndex=localStorage.getItem('entLeftnav')?localStorage.getItem('entLeftnav'):arr[0].child[0].num;
                        }
                        this.currentPage=localStorage.getItem('entdata')?JSON.parse(localStorage.getItem('entdata')).page:1;
                        let data1={};
                        if(localStorage.getItem('entdata')){
                            data1=JSON.parse(localStorage.getItem('entdata'));
                        }else{
                            if(jumpId!='noid'){
                                if(jumpId==-1){
                                    data1['type']='V';
                                    data1['page']=this.currentPage;
                                    data1['parent_id']=arr[0].id;
                                    data1['category_id']=arr[0].child[0].id;
                                }else{
                                    data1['type']='M';
                                    data1['page']=this.currentPage;
                                    data1['parent_id']=jumpId;
                                    for(let i=0;i<arr.length;i++){
                                        if(jumpId==arr[i].id){
                                            data1['category_id']=arr[i].child[0].id;
                                        }
                                    }
                                }
                            }else{
                                if(index==1){
                                    data1['type']='M';
                                }else if(index==2){
                                    data1['type']='V';
                                }
                                data1['page']=this.currentPage;
                                data1['parent_id']=arr[0].id;
                                data1['category_id']=arr[0].child[0].id;
                            }
                        }
                        this.getList(data1);
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                        this.$router.push('/');
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }
                })
            },
            // 获取企业列表
            getList(data){
                this.data=data;
                localStorage.setItem('entdata',JSON.stringify(data));
                enterpriseModel(data).then((res)=>{
                    this.showValue=true;
                    if(res.data.code==0){
                        this.itemArr=res.data.data.data;
                        this.pageSize=res.data.data.per_page;
                        this.total=res.data.data.total;
                    }else if(res.data.code==-200){
                        this.alertTxt({msg:res.data.msg,type:'error'});
                        this.$router.push('/');
                    }else{
                        this.alertTxt({msg:res.data.msg,type:'error'});
                    }
                })
            }
        },
        mounted(){
            this.windowChange()
        },
        beforeRouteLeave(to, form, next) {
            next();
            if(to.name!="VideoItem"){
                localStorage.removeItem('entindex');
                localStorage.removeItem('entdata');
                localStorage.removeItem('entLeftnav');
            }
        },
        components:{
            topnav
        },
        computed:mapState(["opsx","ops","screenHeight"])
    }
</script>
<style>
    .enterprise .twoNav .el-menu-demo{
        height: 50px;
    }
    .enterprise .twoNav .el-menu-item{
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
        width:200px;    
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
    .left-menu .el-menu-item{
        width: 90%;
        height: 40px;
        margin:0 auto;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
        text-align: left;
        line-height: 40px;
    }
    .left-menu .el-submenu.is-active .el-menu-item.is-active{
        background-color: #FFD302 !important;
        border-radius: 10px;
        color: #333 !important;
        font-weight: bold;
    }
</style>
<style scoped>
    .enterprise{
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
    .pubBox{
        width: 100%;
        padding: 0 50px 0 350px;
        box-sizing: border-box;
    }
    .pubBox .box{
        width: 1473px;
        min-height: 200px;
        margin:0 auto;
        padding:10px 0 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
    .pubBox .box .pubItem{
        width: 282px;
        height: 348px;
        margin:0 10px 10px 0;
        box-sizing: border-box;
        position: relative;
        padding: 21px;
    }
    .pubBox .box .pubItem .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .pubBox .box .pubItem .imgTop{
        width: 240px;
        height: 240px;
        position: relative;
    }
    .pubBox .box .pubItem .imgTop>img{
        width: 100%;
        height: 100%;
    }
   .pubBox .box .pubItem .imgTop .iconTop,.pubBox .box .pubItem .imgTop .iconDown{
        width: 200px;
        display: flex;
        align-items: center;
        position: absolute;
        left: 20px;
        z-index: 1;
        color: #fff;
    }
    .pubBox .box .pubItem .imgTop .iconTop{
        justify-content: space-between;
        top:20px;
    }
    .pubBox .box .pubItem .imgTop .iconDown{
        bottom: 20px;
    }
    .pubBox .box .pubItem .imgTop .iconTop p{
        width: 32px;
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        line-height: 20px;
    }
    .pubBox .box .pubItem .imgTop .iconTop img{
        width: 20px;
        height: 16.27px;
    }
    .pubBox .box .pubItem .imgTop .iconDown img{
        width: 13.81px;
        height: 9.98px;
        margin-right: 5px;
    }
    .pubBox .box .pubItem .txtDown{
        width: 100%;
        line-height: 25px;
        color: #333;
        text-align: left;
        margin-top: 10px;
        padding-left: 20px;
        box-sizing: border-box;
    }
    .pubBox .box .pubItem .txtDown h2{
        font-size: 16px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .pubBox .box .pubItem .txtDown p{
        font-size: 12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    /* 医学视频 */
    .pubBox .boxyxsp .pubItem{
        height: 265px;
    }
    .pubBox .boxyxsp .pubItem .imgTop{
        height: 160px;
    }
    .pubBox .boxyxsp .pubItem .imgTop .module{
        width: 36px;
        height: 36px;
        position: absolute;
        top: 62px;
        left: 102px;
        z-index: 1;
    }
    /* 分页 */
    .pubBox .pageBox{
        width: 1473px;
        margin: 20px auto;
    }
</style>