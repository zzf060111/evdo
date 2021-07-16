<template>
    <div class="professional" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex" @searchPage="searchPage" ref="child"></topnav>
            </vue-scroll>
        </div>
        <div class="twoNav">
            <!-- <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#616576" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
                <el-menu-item :index="item.num" v-for="(item,index) of twoNavList" :key="index"> 
                    {{item.name}}
                </el-menu-item>
            </el-menu>
            </vue-scroll> -->
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal" background-color="#576376" text-color="#ffffff" active-text-color="#FFD302" @select="changeNav">
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
            <el-menu class="left-menu" :default-active="leftIndex" background-color="#3A485D" text-color="#ffffff" unique-opened @select="changLeftNav" @open="openMenu">
                <el-submenu :index="item.num" v-for="(item,index) of leftNav" :key="index">
                    <template slot="title">
                        <img :src="item.more.thumbnail">
                        <span>{{item.name}} <b>|</b> {{item.auth_count}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item2.num" v-for="(item2,index2) of item.child" :key="index2">
                            <span style="display: inline-block;max-width:120px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item2.name}}</span> <b>|</b> <span>{{item2.auth_child_count}}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
            </vue-scroll>
        </div>
        <div class="parentBox" ref="publicBox" :style="`padding-left:${publicBoxPl+330}px`">
            <div class="publicBox" v-if="twoNavIndex==1&&itemArr.length>0"> 
                <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                    <img :src="require('../../static/image/professional/bg_changyong@2x1.png')" class="bj">
                    <div class="imgTop">
                        <img v-lazy="item.thumbnail"  @click="lookItem(item.id,item.need_vip)">
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
            <div class="publicBox boxyxsp" v-if="twoNavIndex==2&&itemArr.length>0">
                <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                    <img :src="require('../../static/image/professional/bg_yxsp@2x.png')" class="bj">
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
        </div>
        </vue-scroll>
    </div>    
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex'
import topnav from '../components/topnav'
import {professionalCategory,professionalModel,addfavorites,delfavorites} from '../services/api/modelVideo'
export default {
    data(){
        return{
            topIcon:require('../../static/image/top/logo2@2x.png'),
            activeIndex:'2',
            twoNavIndex:'',
            leftIndex:'',
            leftNav:[],
            twoNavList:[],
            currentPage:1,
            pageSize:0,
            total:0,
            itemArr:[],
            valueShow:false,
            data:{},
            publicBoxPl:0
        }
    },
    store,
    created(){
        let id=this.$route.query.id?this.$route.query.id:'noid';
        let type=this.$route.query.type?this.$route.query.type:'';
        if(type){
            if(localStorage.getItem('proindex')){
                this.twoNavIndex=localStorage.getItem('proindex');
            }else{
                this.twoNavIndex=type;
            }
        }else{
            this.twoNavIndex=localStorage.getItem('proindex')?localStorage.getItem('proindex'):'1';
        }
        // 获取列表
        this.getFenlei(this.twoNavIndex,id);
    },
    mounted(){
        this.windowChange(document.documentElement.clientHeight);
        this.$nextTick(()=>{
            // 获取父元素
            let publicBox=this.$refs.publicBox;
            // 获取宽度
            let wpublicBox = publicBox.getBoundingClientRect().width;
            // 添加左内边距
            if(wpublicBox<=642){
                this.publicBoxPl=0;
            }else{
                this.publicBoxPl=(wpublicBox-Math.floor((wpublicBox-350)/292)*292-350)/2;
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
                    if(wpublicBox<=642){
                        this.publicBoxPl=0;
                    }else{
                        this.publicBoxPl=(wpublicBox-Math.floor((wpublicBox-350)/292)*292-350)/2;
                    }
                });
            })()
        }
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
        // changeNav(key){
        //     this.changeSearch('');
        //     this.twoNavIndex=key;
        //     localStorage.setItem('proindex',key);
        //     this.itemArr=[];
        //     this.valueShow=false;
        //     this.currentPage=1;
        //     let id=this.twoNavList[parseInt(key)-1].id;
        //     let data={};
        //     if(id==0){
        //         data['type']='M';
        //         data['page']=this.currentPage;
        //         data['isRecommaned']=1;
        //         data['limit']=18;
        //     }else if(id==-1){
        //         data['type']='V';
        //         data['page']=this.currentPage;
        //         data['limit']=18;
        //     }else{
        //         data['type']='M';
        //         data['page']=this.currentPage;
        //         data['parent_id']=id;
        //         data['limit']=18;
        //     }
        //     this.getList(data);
        // },
        changeNav(key){
            this.changeSearch('');
            this.twoNavIndex=key;
            this.leftNav=[];
            this.itemArr=[];
            this.valueShow=false;
            localStorage.setItem('proindex',key);
            localStorage.removeItem('proLeftnav');
            localStorage.removeItem('prodata');
            this.getFenlei(key,'noid');
            this.toTop(50)
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
        // 切换左侧导航
        openMenu(index){
            let arr=this.leftNav;
            let obj=this.data;
            let id1;
            let id2;
            if(localStorage.getItem('proLeftnav')&&index==localStorage.getItem('proLeftnav').split('-')[0]){
                
            }else{
                this.leftIndex=index+'-'+'1';
                localStorage.setItem('proLeftnav',index+'-'+'1');
                id1=arr[index-1].id;
                id2=arr[index-1].child[0].id;
                obj.parent_id=id1;
                obj.category_id=id2;
                obj.page=1;
                obj['keywords']='';
                this.getList(obj);
            }
        },
        changLeftNav(key,keyPath){
            this.changeSearch('');
            localStorage.setItem('proLeftnav',key);
            this.itemArr=[];
            this.valueShow=false;
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
                    f.action='https://www.evdo.vip/portal/model/view/id/'+id;
                    f.method='post';
                    f.innerHTML='<input type="hidden" name="token" value="'+localStorage.getItem('token')+'"/><input type="hidden" name="version" value="'+2.0+'"/>';
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
        // 获取分类
        // getFenlei(jumpId){
        //     let data={};
        //     data['type']='M';
        //     professionalCategory(data).then((res)=>{
        //         if(res.data.code==0){
        //             let arr=res.data.data;
        //             let newArr=[];
        //             for(let i=0;i<arr.length;i++){
        //                 let obj={};
        //                 obj['id']=arr[i].id;
        //                 obj['name']=arr[i].name;
        //                 newArr.push(obj);
        //             }
        //             newArr.unshift({id:0,name:'常用'});
        //             newArr.push({id:-1,name:'医学动画'});
        //             for(let i=0;i<newArr.length;i++){
        //                 newArr[i]['num']=(i+1).toString();
        //             }
        //             if(jumpId!='noid'){
        //                 if(localStorage.getItem('proindex')){
        //                     this.twoNavIndex=localStorage.getItem('proindex')
        //                 }else{
        //                     for(let i=0;i<newArr.length;i++){
        //                         if(jumpId==newArr[i].id){
        //                             this.twoNavIndex=newArr[i].num;
        //                         }
        //                     }
        //                 }
        //             }else{
        //                 this.twoNavIndex=localStorage.getItem('proindex')?localStorage.getItem('proindex'):newArr[0].num;
        //             }
        //             this.currentPage=localStorage.getItem('prodata')?JSON.parse(localStorage.getItem('prodata')).page:1;
        //             this.twoNavList=newArr;
        //             let data1={};
        //             if(localStorage.getItem('prodata')){
        //                 data1=JSON.parse(localStorage.getItem('prodata'));
        //             }else{
        //                 if(jumpId!='noid'){
        //                     if(jumpId==-1){
        //                         data1['type']='V';
        //                         data1['page']=this.currentPage;
        //                         data1['limit']=18;
        //                     }else{
        //                         data1['type']='M';
        //                         data1['page']=this.currentPage;
        //                         data1['parent_id']=jumpId;
        //                         data1['limit']=18;
        //                     }
        //                 }else{
        //                     data1['type']='M';
        //                     data1['page']=this.currentPage;
        //                     data1['isRecommaned']=1;
        //                     data1['limit']=18;
        //                 }
        //             }
        //             this.getList(data1);
        //         }else{
        //             this.alertTxt({msg:res.data.msg,type:'error'});
        //         }
        //     })
        // },
        getFenlei(index,jumpId){
            let data={};
            if(index==1){
                data['type']='M';
            }else if(index==2){
                data['type']='V';
            }
            professionalCategory(data).then((res)=>{
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
                        if(localStorage.getItem('proLeftnav')){
                            this.leftIndex=localStorage.getItem('proLeftnav');
                        }else{
                            if(jumpId==-1){
                                this.leftIndex=localStorage.getItem('proLeftnav')?localStorage.getItem('proLeftnav'):arr[0].child[0].num;
                            }else{
                                for(let i=0;i<arr.length;i++){
                                    if(jumpId==arr[i].id){
                                        this.leftIndex=arr[i].child[0].num;
                                    }
                                }
                            }
                        }
                    }else{
                        this.leftIndex=localStorage.getItem('proLeftnav')?localStorage.getItem('proLeftnav'):arr[0].child[0].num;
                    }
                    this.currentPage=localStorage.getItem('prodata')?JSON.parse(localStorage.getItem('prodata')).page:1;
                    let data1={};
                    if(localStorage.getItem('prodata')){
                        data1=JSON.parse(localStorage.getItem('prodata'));
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
    beforeRouteLeave(to, form, next){
        next();
        if(to.name!="VideoItem"){
            localStorage.removeItem('proLeftnav');
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
    .el-menu{
        border-right: none !important;
    }
    .professional .twoNav .el-menu-demo{
        height: 100%;
        display: flex;
    }
    .professional .twoNav .el-menu-item{
        height: 50px !important;
        font-size: 16px;
        padding: 0;
        margin:0 20px;
    }
    .professional .twoNav .el-menu-item:hover{
        background-color: transparent !important;
    }
    .professional .el-pagination{
        margin: 20px 0;
    }
    .left-menu .el-submenu__title{
        display: flex;
        align-items: center;
        font-size: 16px;
    }
    .professional .left-menu .el-submenu.is-opened .el-submenu__title,.professional .left-menu .el-submenu.is-opened .el-menu,.professional .left-menu .el-submenu.is-opened .el-menu .el-menu-item{
        background-color: #576376 !important;
    }
    .left-menu .el-submenu.is-opened .el-submenu__title,.left-menu .el-submenu.is-opened .el-submenu__title:hover{
        border-radius: 0;
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
        width: 152px;
        /* max-width: 250px; */
        /* display: inline-block; */
        height: 40px;
        margin:10px 0 10px 40px;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
        text-align: left;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 20px !important;
        box-sizing: border-box;
    }
    .professional .left-menu .el-submenu.is-active .el-menu-item.is-active{
        background-color: #FFD302 !important;
        border-radius: 10px;
        color: #252B43 !important;
        font-weight: bold;
    }
    .left-menu .el-submenu .el-menu .el-menu-item,.left-menu .el-submenu .el-submenu__title{
        border-radius: 10px;
    }
    .left-menu .el-submenu .el-submenu__title:hover,.left-menu .el-submenu .el-menu .el-menu-item:hover{
        border-radius: 10px;
        background-color: #3A485D !important;
    }
    .professional .pageBox .el-pagination__total,.professional .pageBox .el-pagination__jump{
        color: #fff;
    }
</style>
<style scoped>
    .professional{
        padding-top: 50px;
        box-sizing: border-box;
        background-color: #29323F;
        position: relative;
        z-index: 0;
    }
    .twoNav{
        width: 100%;
        height: 50px;
        background-color: #576376;
        font-size: 16px;
        padding-left: 50px;
        box-sizing: border-box;
        position: fixed;
        top:60px;
        left:0;
        z-index: 9;
    }
    .leftNav{
        padding-top: 20px;
        box-sizing: border-box;
        width: 300px;
        background-color: #3A485D;
        overflow-y: auto;
        position: fixed;
        top:110px;
        left: 0;
        z-index: 9;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .parentBox{
        width: 100%;
        max-width: 1920px;
        margin: 0 auto;
        padding: 0 0 0 350px;
        box-sizing: border-box;
    }
    .publicBox{
        width: 100%;
        min-height: 200px;
        padding:30px 0 0 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
    .publicBox .pubItem{
        width: 264px;
        height: 330px;
        margin:0 16px 30px 0;
        box-sizing: border-box;
        position: relative;
        padding: 11px;
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
    .publicBox .pubItem .imgTop>img:hover{
        cursor: pointer;
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
        padding:0 20px;
        box-sizing: border-box;
    }
    .publicBox .pubItem .txtDown h2{
        font-size: 16px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #fff;
    }
    .publicBox .pubItem .txtDown p{
        font-size: 12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #fff;
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
        padding: 5px;
        box-sizing: border-box;
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