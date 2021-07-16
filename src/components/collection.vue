<template>
    <div class="collection">
        <div class="topNavBox">
            <el-menu :default-active="twoNavIndex" class="el-menu-demo" mode="horizontal"  text-color="#333333"  @select="changeNav">
                <el-menu-item index="1"> 
                    模型
                </el-menu-item>
                <!-- <el-menu-item index="2">
                    切片
                </el-menu-item>
                <el-menu-item index="3">
                    断层
                </el-menu-item>
                <el-menu-item index="4">
                    课件
                </el-menu-item> -->
                 <el-menu-item index="2">
                    视频
                </el-menu-item>
            </el-menu>
            <div class="right">
                <p>{{selNum}}/{{arr.length}}</p>
                <p @click="selAll(setStr)" v-if="arr.length>0">{{setStr}}</p>
                <p @click="deleteSc" v-if="arr.length>0">删除</p>
            </div>
        </div>
        <div class="pubBox"  :style="`height:${screenHeight-130}px;padding-left:${pubBoxPl}px`" ref="pubBox">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <div class="box boxJcyx" v-if="showValue&&twoNavIndex==1&&arr.length>0">
                    <div class="pubItem" v-for="(item,index) of arr" :key="index">
                        <img :src="require('../../static/image/personal/bg_scmx@2x.png')" class="bj">
                        <div class="imgTop">
                            <img :src="item.thumbnail"  @click="lookItem(item.object_id,item.need_vip)">
                            <div class="iconTop">
                                <p>{{(currentPage-1)*15+(index+1)}}</p>
                                <img v-if="item.is_auth==1" :src="require('../../static/image/professional/icon_members@2x.png')">
                                <p v-else-if="item.is_auth==0">免费</p>
                            </div>
                            <div class="iconDown">
                                <img :src="require('../../static/image/professional/icon_view@2x.png')">{{item.price}}
                            </div>
                            <img :src="item.isSel==0?require('../../static/image/personal/icon_wgx@2x.png'):require('../../static/image/personal/icon_selected@2x.png')" class="selBtn" @click="clickSel(index,item.isSel,item.object_id)">
                        </div>
                        <div class="txtDown">
                            <h2>{{item.title}}</h2>
                            <p>{{item.sub_title}}  {{item.sub_title2}}</p>
                        </div>
                    </div>
                </div>
                <div v-else-if="showValue&&twoNavIndex==1&&arr.length==0" style="padding-top:20px;font-size:20px;font-weight:bold">
                    暂无收藏
                </div>
                <div class="box boxyxsp" v-if="showValue&&twoNavIndex==2&&arr.length>0">
                    <div class="pubItem" v-for="(item,index) of arr" :key="index">
                        <img :src="require('../../static/image/enterprise/bg_yxsp@2x.png')" class="bj">
                        <div class="imgTop">
                            <img :src="item.thumbnail"  @click="lookItem(item.object_id,item.need_vip)">
                            <div class="iconTop">
                                <p>{{(currentPage-1)*15+(index+1)}}</p>
                                <img v-if="item.is_auth==1" :src="require('../../static/image/professional/icon_members@2x.png')">
                                <p v-else-if="item.is_auth==0">免费</p>
                            </div>
                            <div class="iconDown">
                                <img :src="require('../../static/image/professional/icon_view@2x.png')">{{item.price}}
                            </div>
                            <img :src="require('../../static/image/enterprise/icon_bf@2x.png')" class="module"  @click="lookItem(item.object_id,item.need_vip)">
                            <img :src="item.isSel==0?require('../../static/image/personal/icon_wgx@2x.png'):require('../../static/image/personal/icon_selected@2x.png')" class="selBtn" @click="clickSel(index,item.isSel,item.object_id)">
                        </div>
                        <div class="txtDown">
                            <h2>{{item.title}}</h2>
                            <p>{{item.sub_title2}}</p>
                        </div>
                    </div>
                </div>
                <div v-else-if="showValue&&twoNavIndex==2&&arr.length==0" style="padding-top:20px;font-size:20px;font-weight:bold">
                    暂无收藏
                </div>
            </vue-scroll>
        </div>
        <!-- <div class="pageBox" v-show="twoNavIndex==1||twoNavIndex==5">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
            <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="25"
            layout="total,prev, pager, next,jumper"
            :total="9"
            hide-on-single-page
            >
            </el-pagination>
             </vue-scroll>
        </div> -->
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import {favorites,delfavorites,info} from '../services/api/personal'
export default {
    data(){
        return{
            twoNavIndex:'',
            currentPage:1,
            arr:[
            ],
            arrId:[],
            selNum:0,
            setStr:'',
            showValue:false,
            pubBoxPl:0
        }
    },
    store,
    created(){
        if(localStorage.getItem('collection-nav')){
            this.twoNavIndex=localStorage.getItem('collection-nav');
        }else{
            this.twoNavIndex='1';
        }
        this.reqfavorites();
    },
    mounted(){
        this.windowChange(document.documentElement.clientHeight);
        this.$nextTick(()=>{
            // 获取父元素
            let pubBox=this.$refs.pubBox;
            // 获取宽度
            let wpubBox = pubBox.getBoundingClientRect().width;
            // 添加左内边距
            if(wpubBox<=302){
                this.pubBoxPl=0;
            }else{
                this.pubBoxPl=(wpubBox-Math.floor(wpubBox/292)*292)/2;
            }
        });
        const that = this;
        window.onresize=()=>{
            this.windowChange(document.documentElement.clientHeight);
            return(()=>{
                this.$nextTick(()=>{
                    // 获取父元素
                    let pubBox=this.$refs.pubBox;
                    // 获取宽度
                    let wpubBox = pubBox.getBoundingClientRect().width;
                    // 添加左内边距
                    if(wpubBox<=302){
                        this.pubBoxPl=0;
                    }else{
                        this.pubBoxPl=(wpubBox-Math.floor(wpubBox/292)*292)/2;
                    }
                });
            })()
        }
    },
    methods:{
        ...mapMutations(["windowChange","alertTxt","changeUser"]),
        changeNav(key){
            this.showValue=false;
            this.arrId=[];
            this.twoNavIndex=key;
            localStorage.setItem('collection-nav',key);
            this.reqfavorites();
        },
        // 查看详情
        lookItem(id,isVip){
            info().then((res)=>{
                if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.changeUser(JSON.stringify(res.data.data));
                    if(isVip){
                        this.$alert('此模型需开通会员','提示',{
                            confirmButtonText:'立即开通',
                            center:true,
                            callback:(action)=>{
                                if(action=='confirm'){
                                    this.$parent.jumpMember();
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
                            // window.location.href='https://www.evdo.vip/portal/video/view/id/'+id;
                            this.$router.push({
                                path:'/videoItem',
                                query:{
                                    id:id
                                }
                            })
                        }
                    }
                }
            })
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
            this.toTop(50);
        },
        // 选择收藏
        clickSel(num,sel,id){
            let arr=this.arr;
            let arrid=this.arrId;
            let nums=0;
            if(sel==0){
                arr[num].isSel=1
                arrid.push(id);
            }else if(sel==1){
                arr[num].isSel=0;
                for(let i=0;i<arrid.length;i++){
                    if(arrid[i]==id){
                        arrid.splice(i,1);
                    }
                }
            }
            for(let i=0;i<arr.length;i++){
                if(arr[i].isSel==1){
                    nums++;
                }
            }
            this.selNum=nums;
            this.arr=arr;
            this.arrId=arrid;
            if(nums==arr.length){
                this.setStr="取消"
            }else{
                this.setStr="全选"
            }
        },
        // 全选或者取消
        selAll(str){
            let arr=this.arr;
            let arrid=[];
            if(str=="全选"){
                for(let i=0;i<arr.length;i++){
                    arr[i].isSel=1
                    arrid.push(arr[i].object_id);
                }
                this.selNum=arr.length;
                this.setStr="取消";
            }else if(str=="取消"){
                for(let i=0;i<arr.length;i++){
                    arr[i].isSel=0
                }
                this.selNum=0;
                this.setStr="全选";
            }
            this.arr=arr;
            this.arrId=arrid;
        },
        // 删除收藏
        deleteSc(){
            let arr=this.arrId;
            if(arr.length==0){
                this.$alert('请选择要删除的收藏','提示',{
                    confirmButtonText:'确 定',
                    center:true,
                })
            }else if(arr.length>0){
                this.$alert('确定取消收藏吗？','提示',{
                    confirmButtonText:'确 定',
                    center:true,
                    customClass:'errorAlert',
                    callback:(action)=>{
                        if(action=='confirm'){
                            let data={};
                            if(this.twoNavIndex=='1'){
                                data['type']='model'
                            }else if(this.twoNavIndex=='2'){
                                data['type']='video'
                            }
                            let str=this.arrId.join(',');
                            data['ids']=str;
                            delfavorites(data).then((res)=>{
                                if(res.data.code==0){
                                    this.alertTxt({msg:res.data.msg,type:'success'});
                                    this.reqfavorites();
                                }else if(res.data.code==-200){
                                    this.alertTxt({msg:res.data.msg,type:'error'});
                                    localStorage.removeItem('token');
                                    this.changeUser('');
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
        // 请求接口获取收藏列表
        reqfavorites(){
            let data={};
            if(this.twoNavIndex=='1'){
                data['type']='model'
            }else if(this.twoNavIndex=='2'){
                data['type']='video'
            }
            favorites(data).then((res)=>{
                if(res.data.code==0){
                    this.showValue=true;
                    let newArr=res.data.data.list;
                    if(newArr.length>0){
                        for(let i=0;i<newArr.length;i++){
                            newArr[i]['isSel']=0;
                        }
                        let num=0;
                        let arrid=[];
                        for(let i=0;i<newArr.length;i++){
                            if(newArr[i].isSel==1){
                                num++;
                                arrid.push(newArr[i].id);
                            }
                        }
                        this.selNum=num;
                        this.arrId=arrid;
                        if(num==newArr.length){
                            this.setStr="取消"
                        }else{
                            this.setStr="全选"
                        }
                    }
                    this.arr=newArr;
                }else if(res.data.code==-200){
                    this.alertTxt({msg:res.data.msg,type:'error'});
                    localStorage.removeItem('token');
                    this.changeUser('');
                    this.$router.push('/');
                }else{
                    this.alertTxt({msg:res.data.msg,type:'error'});
                }
            })
        }
    },
    computed:mapState(["opsx","screenHeight"])
}
</script>
<style>
    .el-menu-demo1{
        font-size: 18px;
    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border-bottom: 3px solid #FFD302 !important;
    }
    .collection .topNavBox .el-menu-item{
        height: 50px;
        padding: 0;
        margin: 0 35px;
        font-size: 18px;
    }
</style>
<style scoped>
    .collection .topNavBox{
        width: 100%;
        min-width: 520px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    .collection .topNavBox .right{
        display: flex;
        justify-content: space-around;
        color: #333;
        font-size: 16px;
        width: 200px;
    }
    .collection .topNavBox .right p:hover{
        cursor:pointer;
    }
    .collection .pubBox{
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
        box-sizing: border-box;
    }
     .pubBox .box{
        width: 100%;
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
    .pubBox .box .pubItem:hover{
        cursor: pointer;
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
    .pubBox .box .pubItem .imgTop>img.selBtn{
        width: 20px;
        height: 20px;
        position: absolute;
        top: 17px;
        right: 20px;
        z-index: 9;
    }
   .pubBox .box .pubItem .imgTop .iconTop,.pubBox .box .pubItem .imgTop .iconDown{
        width: 190px;
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
        width: 40px;
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        line-height: 20px;
        font-size: 12px;
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
    /* .pageBox{
        width: 100%;
        height: 50px;
        margin: 0px auto;
        padding-top:20px;
        box-sizing: border-box;
    } */
</style>