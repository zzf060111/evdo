<template>
    <div class="index" :style="`height:${screenHeight-60}px;max-height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
            <vue-scroll :ops="opsx" style="width:100%;height:100%;">
                <topnav :topIcon="topIcon" :activeIndex="activeIndex" ref="child"></topnav>
            </vue-scroll>
        </div>
        <div class="carouse" ref="carouse">
            <el-carousel ref="carousel" @click.native="jumpBanner" :height="carouseHeight">
                <el-carousel-item v-for="(item,index) of bannerArr" :key="index">
                    <img v-lazy="item.image">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="fenleiBox" ref="fenleibox" :style="`padding-left:${fenleiboxPl}px`">
            <div class="flItem" v-for="(item,index) of flTopList" :key="index" @click="jumpMove(item.id)" :style="`margin:40px ${flItemRl}px`">
                <img :src="item.thumb?item.thumb:item.img" alt="">
                <p>{{item.name}}</p>
            </div>
        </div>
        <div class="otherflBox">
            <h4>更多分类</h4>
            <div class="itemBox" ref="otherflBox">
                <div class="items" v-for="(item,index) of flDownList" :key="index" @click="jumpMove(item.id)">
                    <p>{{item.name}}</p>
                    <img :src="require('../../static/image/index/icon_go.png')" alt="">
                </div>
            </div>
        </div>
        <div class="moveList" ref="moveList" :style="`padding-left:${moveBoxPl}px`">
            <div class="moveNav" :style="`margin-left:${-moveBoxPl}px`">
                <p :class="moveVal==0?'selected':''" @click="clickMove(0)">推荐</p>
                <p :class="moveVal==1?'selected':''" @click="clickMove(1)">人气</p>
            </div>
            <div class="moveBox" v-if="itemArr.length>0">
                <div class="pubItem" v-for="(item,index) of itemArr" :key="index">
                    <img :src="require('../../static/image/professional/bg_changyong@2x1.png')" class="bj">
                    <div class="imgTop">
                        <img v-lazy="item.thumbnail" @click="lookItem(item.id,item.need_vip)">
                        <div class="iconTop">
                            <p>{{(index+1)}}</p>
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
        </div>
        <div class="tab">
            医维度系列产品与功能介绍
            <p></p>
        </div>
        <div class="productBox">
            <div class="boxleft" @mouseenter="mEnter($event,'left1')" @mouseleave="mLeave($event,'left1')" @click="jumpfslist()" ref="boxleft">
                <img v-lazy="require('../../static/image/index/pic1@2x.png')" class="bj">
                <h2>医维度在线版</h2>
                <p>
                    医维度虚拟仿真教学软件系统是一款在线多终端数字化虚拟仿真医学平台，包含Web端、PC客户端、手机APP，所有终端数据同步，系统内容实时更新。卓越的跨平台3D渲染引擎可以在任意终端流畅运行，准确还原组织、器官的材质纹理与形态。该平台一直保持着持续的更新迭代，其中包括两套由真实人体断层重建的三维数字人体、两千余件真实的人体三维标本等，中博公司在2016年成立了专业的三维标本数字化扫描技术团队，自主研发多款高端三维彩色扫描设备与数据处理方案。扫描标本数量已达6千件以上，目前以具备了非常成熟、高速、高效的三维物体扫描技术。
                </p>
                <img :src="require('../../static/image/index/right.png')" class="rd left1">
            </div>
            <div class="boxright">
                <div class="top">
                    <div @mouseenter="mEnter($event,'right1')" @mouseleave="mLeave($event,'right1')" @click="jumpfslist()" ref="boxrightTop1" class="boxrightTop1">
                        <img v-lazy="require('../../static/image/index/pic2@2x.png')" class="bj">
                        <h2>医维度在线版</h2>
                        <h2>企业定制独立部署版</h2>
                        <p>为您的企业或院校特殊定制、独立部署，数据的存取更加快速、稳定、安全。</p>
                        <img :src="require('../../static/image/index/right.png')" class="rd right1">
                    </div>
                    <div @mouseenter="mEnter($event,'right2')" @mouseleave="mLeave($event,'right2')" @click="jumpfslist()" ref="boxrightTop2" class="boxrightTop2">
                        <img v-lazy="require('../../static/image/index/pic4@2x.png')" class="bj">
                        <h2>医维度单机版系列软件</h2>
                        <p>医维度单机版系列软件包括系统解剖学、局部解剖学，虚拟数字人等多款非常实用的基础医学类软件，无须联网、本地运行，非常适合院校、博物馆、生命科学馆、医院等使用场景</p>
                        <img :src="require('../../static/image/index/right.png')" class="rd right2">
                    </div>
                </div>
                <div class="down">
                    <div @mouseenter="mEnter($event,'right3')" @mouseleave="mLeave($event,'right3')" @click="jumpfslist()" ref="boxrightDown1" class="boxrightDown1">
                        <img v-lazy="require('../../static/image/index/pic3@2x.png')" class="bj">
                        <h2>医维度XR系列</h2>
                        <p>医维度VR、AR、MR、3D立体显示系统、全息投影等技术与设备可以满足您对高科技产品的众多需求</p>
                        <img :src="require('../../static/image/index/right.png')" class="rd right3">
                    </div>
                    <div @mouseenter="mEnter($event,'right4')" @mouseleave="mLeave($event,'right4')" @click="jumpfslist()" ref="boxrightDown2" class="boxrightDown2">
                        <img v-lazy="require('../../static/image/index/pic5@2x.png')" class="bj">
                        <h2>九大系统</h2>
                        <h2>三维科普动画</h2>
                        <p>医维度自主创作的人体九大系统3D动画能以2D和3D两种模式播放，可以让观众在享受视觉盛宴的同时了解大量人体解剖知识。</p>
                        <img :src="require('../../static/image/index/right.png')" class="rd right4">
                    </div>
                    <div @mouseenter="mEnter($event,'right5')" @mouseleave="mLeave($event,'right5')" @click="jumpfslist()" ref="boxrightDown3" class="boxrightDown3">
                        <img v-lazy="require('../../static/image/index/pic6@2x.png')" class="bj">
                        <h2>在线三维</h2>
                        <h2>全景展馆</h2>
                        <p>在线全景展馆系统可以对您的各种实景场地进行三维扫描，然后上线至网络，无论是学习还是企业宣传，都是非常优秀的一款产品。</p>
                        <img :src="require('../../static/image/index/right.png')" class="rd right5">
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomNav">
            <div class="text">
                <h2>医维度</h2>
                <p>方便快捷的在线3D人体解剖平台</p>
            </div>
            <div class="btn">
                <p :class="arrUser&&!arrUser.is_enterprise?'isSel':''" @click="changeUserIndex(0)">个人版</p>
                <p :class="arrUser&&arrUser.is_enterprise?'isSel':''" @click="changeUserIndex(1)">企业版</p>
            </div>
        </div>
        <div class="bottomTitle">
            <div class="aBox">
                <p @click="jumpOther(1)">关于医维度</p>
                <p @click="jumpOther(2)">联系与合作</p>
                <p @click="jumpOther(3)">用户协议</p>
                <p @click="jumpOther(4)">在线客服</p>
                <p @click="jumpOther(5)">公众号</p>
            </div>
            <p>河南中博健康科技有限公司|豫ICP备18001437号</p>
        </div>
        </vue-scroll>
    </div>
</template>
<script>
    import store from '../vuex/store'
    import {mapState,mapMutations} from 'vuex'
    import topnav from '../components/topnav'
    import {indexCategory,professionalModel,banner,addfavorites,delfavorites} from '../services/api/modelVideo'
    import $ from 'jquery'
    export default {
        data(){
            return{
                topIcon:require('../../static/image/top/logo@2x.png'),
                activeIndex:'1',
                flTopList:[],
                flDownList:[],
                moveVal:0,
                itemArr:[],
                bannerArr:[],
                carouseHeight:'',
                fenleiboxPl:0,
                flItemRl:0,
                moveBoxPl:0,
                otherflBoxPl:0
            }
        },
        store,
        created(){
            // 分类选项
            indexCategory().then((res)=>{
                if(res.data.code==0){
                    let arr=res.data.data.hotCategory;
                    let data={};
                    data['name']='医学动画';
                    data['id']=-1;
                    data['img']=require('../../static/image/index/icon_shouye_yxdh.png');
                    let data1={};
                    data1['name']='自测练习';
                    data1['id']=-2;
                    data1['img']=require('../../static/image/index/icon_zclx.png');
                    arr.push(data);
                    arr.push(data1);
                    this.flTopList=arr;
                    this.flDownList=res.data.data.category;
                }
            });
            // 首页模型
            let data={};
            data['type']='M';
            data['page']=1;
            if(localStorage.getItem('indexMoveValue')){
                if(localStorage.getItem('indexMoveValue')==0){
                    this.moveVal=0;
                    data['isRecommaned']=1;
                }else if(localStorage.getItem('indexMoveValue')==1){
                    this.moveVal=1;
                    data['isHot']=1;
                }
            }else{
                 data['isRecommaned']=1;
            }
            data['limit']=18;
            professionalModel(data).then((res)=>{
                if(res.data.code==0){
                    this.itemArr=res.data.data.data;
                }
            })
            // 首页轮播
            let datab={};
            datab['id']=6;
            banner(datab).then((res)=>{
                if(res.data.code==0){
                    this.bannerArr=res.data.data.list;
                }
            })
        },
        mounted(){
            this.windowChange(document.documentElement.clientHeight);
            this.$nextTick(() => {
                // 获取图片（或外层框）
                let carouse = this.$refs.carouse;
                let fenleibox=this.$refs.fenleibox;
                let otherflBox=this.$refs.otherflBox;
                let moveList=this.$refs.moveList;
                let boxleft=this.$refs.boxleft;
                let boxrightTop1=this.$refs.boxrightTop1;
                let boxrightTop2=this.$refs.boxrightTop2;
                let boxrightDown1=this.$refs.boxrightDown1;
                let boxrightDown2=this.$refs.boxrightDown2;
                let boxrightDown3=this.$refs.boxrightDown3;
                // 获取其宽度
                let wcarouse = carouse.getBoundingClientRect().width;
                let wfenleibox=fenleibox.getBoundingClientRect().width;
                let wotherflBox=otherflBox.getBoundingClientRect().width;
                let wmoveList=moveList.getBoundingClientRect().width;
                let wboxleft=boxleft.getBoundingClientRect().width;
                let wboxrightTop1=boxrightTop1.getBoundingClientRect().width;
                let wboxrightTop2=boxrightTop2.getBoundingClientRect().width;
                let wboxrightDown1=boxrightDown1.getBoundingClientRect().width;
                let wboxrightDown2=boxrightDown2.getBoundingClientRect().width;
                let wboxrightDown3=boxrightDown3.getBoundingClientRect().width;
                // 设置其高度（以宽度的60%为例）
                this.carouseHeight=0.4 * wcarouse+'px';
                if(wfenleibox>=1740){
                    this.flItemRl=70;
                    this.fenleiboxPl=(wfenleibox-Math.floor(wfenleibox/290)*290)/2;
                }else if(wfenleibox>1458&&wfenleibox<1740){
                    let wItem=(1750-wfenleibox)/12;
                    this.flItemRl=70-wItem;
                    this.fenleiboxPl=(wfenleibox-Math.floor(wfenleibox/(150+this.flItemRl*2))*(150+this.flItemRl*2))/2;
                }else{
                    this.flItemRl=46.5;
                    this.fenleiboxPl=(wfenleibox-Math.floor(wfenleibox/243)*243)/2;
                }
                this.otherflBoxPl=(wotherflBox-Math.floor(wotherflBox/220)*220)/2;
                this.moveBoxPl=(wmoveList-Math.floor(wmoveList/278)*278)/2;
                // console.log(this.moveBoxPl);
                $('.boxleft').attr('style',`height:${wboxleft*1.55}px`);
                $('.boxrightTop1').attr('style',`height:${wboxrightTop1*0.775}px`);
                $('.boxrightTop2').attr('style',`height:${wboxrightTop2*0.53}px`);
                $('.boxrightDown1').attr('style',`height:${wboxrightDown1*0.778}px`);
                $('.boxrightDown2').attr('style',`height:${wboxrightDown2*1.09}px`);
                $('.boxrightDown3').attr('style',`height:${wboxrightDown3*1.09}px`);
            });
            const that = this;
            window.onresize = () => {
                this.windowChange(document.documentElement.clientHeight);
                return (() => {
                    this.$nextTick(() => {
                        // 获取图片（或外层框）
                        let carouse = this.$refs.carouse;
                        let fenleibox=this.$refs.fenleibox;
                        let otherflBox=this.$refs.otherflBox;
                        let moveList=this.$refs.moveList;
                        let boxleft=this.$refs.boxleft;
                        let boxrightTop1=this.$refs.boxrightTop1;
                        let boxrightTop2=this.$refs.boxrightTop2;
                        let boxrightDown1=this.$refs.boxrightDown1;
                        let boxrightDown2=this.$refs.boxrightDown2;
                        let boxrightDown3=this.$refs.boxrightDown3;
                        // 获取其宽度
                        let wcarouse = carouse.getBoundingClientRect().width;
                        let wfenleibox=fenleibox.getBoundingClientRect().width;
                        let wotherflBox=otherflBox.getBoundingClientRect().width;
                        let wmoveList=moveList.getBoundingClientRect().width;
                        let wboxleft=boxleft.getBoundingClientRect().width;
                        let wboxrightTop1=boxrightTop1.getBoundingClientRect().width;
                        let wboxrightTop2=boxrightTop2.getBoundingClientRect().width;
                        let wboxrightDown1=boxrightDown1.getBoundingClientRect().width;
                        let wboxrightDown2=boxrightDown2.getBoundingClientRect().width;
                        let wboxrightDown3=boxrightDown3.getBoundingClientRect().width;
                        // 设置其高度（以宽度的60%为例）
                        this.carouseHeight=0.4 * wcarouse+'px';
                        if(wfenleibox>=1740){
                            this.flItemRl=70;
                            this.fenleiboxPl=(wfenleibox-Math.floor(wfenleibox/290)*290)/2;
                        }else if(wfenleibox>1458&&wfenleibox<1740){
                            let wItem=(1750-wfenleibox)/12;
                            this.flItemRl=70-wItem;
                            this.fenleiboxPl=(wfenleibox-Math.floor(wfenleibox/(150+this.flItemRl*2))*(150+this.flItemRl*2))/2;
                        }else{
                            this.flItemRl=46.5;
                            this.fenleiboxPl=(wfenleibox-Math.floor(wfenleibox/243)*243)/2;
                        }
                        this.otherflBoxPl=(wotherflBox-Math.floor(wotherflBox/220)*220)/2;
                        this.moveBoxPl=(wmoveList-Math.floor(wmoveList/278)*278)/2;
                        $('.boxleft').attr('style',`height:${wboxleft*1.55}px`);
                        $('.boxrightTop1').attr('style',`height:${wboxrightTop1*0.775}px`);
                        $('.boxrightTop2').attr('style',`height:${wboxrightTop2*0.53}px`);
                        $('.boxrightDown1').attr('style',`height:${wboxrightDown1*0.778}px`);
                        $('.boxrightDown2').attr('style',`height:${wboxrightDown2*1.09}px`);
                        $('.boxrightDown3').attr('style',`height:${wboxrightDown3*1.09}px`);
                    })
                })()
            }
        },
        methods:{
            ...mapMutations(["windowChange","alertTxt"]),
            // 导航箭头显示隐藏
           mEnter(event,num){
               event.target.parentElement.querySelector(`.${num}`).style.cssText += "opacity:1;";
           },
           mLeave(event,num){
               event.target.parentElement.querySelector(`.${num}`).style.cssText += "opacity:0";
           },
            //切换用户版本
            changeUserIndex(num){
               if(num==0){
                   this.$router.push('/professional')
               }else if(num==1){
                   if(!this.arrUser){
                    //    this.$alert('请登录后访问此页面','提示',{
                    //         confirmButtonText:'确 定',
                    //         center:true,
                    //     })
                        this.$refs.child.jumpLogin();
                   }else if(this.arrUser&&!this.arrUser.is_enterprise){
                        // this.$alert('此页面需企业级账号权限，请加入组织后访问','提示',{
                        //     confirmButtonText:'确 定',
                        //     center:true,
                        // })
                        this.$refs.child.showJoin();
                   }else if(this.arrUser&&this.arrUser.is_enterprise){
                        this.$router.push('/enterprise')
                   }
               }
            },
             // 跳转功能列表
            jumpfslist(){
                this.$router.push('/fsList');
            },
            // 跳转企业、专业详情
            jumpMove(id){
                if(id==-2){
                    if(!this.arrUser){
                         this.$refs.child.jumpLogin();
                    }else{
                         this.$router.push({
                            path:'/exercise',
                        })
                    }
                }else{
                    if(this.arrUser.is_enterprise){
                        this.$router.push({
                            path:'/enterprise',
                            query:{
                                id:id,
                                type:id==-1?2:1
                            }
                        })
                    }else{
                        this.$router.push({
                            path:'/professional',
                            query:{
                                id:id,
                                type:id==-1?2:1
                            }
                        })
                    }
                }
            },
            // 切换模型
            clickMove(key){
                localStorage.setItem('indexMoveValue',key);
                this.moveVal=key;
                this.itemArr=[];
                let data={};
                data['type']='M';
                data['page']=1;
                data['limit']=18;
                if(key==0){
                    data['isRecommaned']=1;
                }else if(key==1){
                    data['isHot']=1;
                }
                professionalModel(data).then((res)=>{
                    if(res.data.code==0){
                        this.itemArr=res.data.data.data;
                    }
                })
            },
            // 收藏取消收藏模型
            addSc(id,isSc,index){
                if(isSc){
                    let data={};
                    data['ids']=id;
                    data['type']='model';
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
                    data['table']='model';
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
            // 跳转轮播图
            jumpBanner(){
                if(this.bannerArr[this.$refs.carousel.activeIndex].url.indexOf('personal')!=-1){
                    if(!this.arrUser){
                         this.$refs.child.jumpLogin();
                    }else{
                        window.location.href=this.bannerArr[this.$refs.carousel.activeIndex].url
                    }
                }else{
                    window.location.href=this.bannerArr[this.$refs.carousel.activeIndex].url
                }
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
                    let f=document.createElement('form');
                    f.style.display='none';
                    f.action='https://www.evdo.vip/portal/model/view/id/'+id;
                    f.method='post';
                    f.innerHTML='<input type="hidden" name="token" value="'+localStorage.getItem('token')+'"/><input type="hidden" name="version" value="'+2.0+'"/>';
                    document.body.appendChild(f);
                    f.submit();
                    f.remove();
                }
            },
            // 跳转其他
            jumpOther(num){
                this.$router.push({
                    path:'/indexOther',
                    query:{
                        num:num
                    }
                })
            }   
        },
        components:{
            topnav
        },
        computed:mapState(["ops","opsx","screenHeight","arrUser"])
    }
</script>
<style>
    .index .el-carousel{
        width: 100%;
    }
    .index .el-carousel__item{
        width: 100%;
    }
    .index .el-carousel__item img{
        width: 100%;
        height: 100%;
    }
    .index .el-carousel__arrow{
        top:50% !important;
    }
    .index .el-carousel__button{
        width: 40px;
        height: 5px;
        background-color: #ccc;
    }
    .index .el-carousel__indicator.is-active .el-carousel__button{
        background-color:#999;
    }
</style>
<style scoped>
    .index{
        background-color: #29323F;
    }
    .carouse{
        width: 75%;
        max-width: 1630px;
        /* height: 2.5rem; */
        /* display: flex;
        align-items: center;
        justify-content: center; */
        margin: 20px auto;
    }
    .fenleiBox{
        width: 81%;
        max-width: 1920px;
        min-height: 466px;
        display: flex;
        flex-wrap: wrap;
        margin:0 auto;
        box-sizing: border-box;
    }
    .fenleiBox .flItem{
        /* width: 150px; */
        width: 150px;
        height: 170px;
        position: relative;
        /* margin:40px 70px; */
        /* margin:40px 70px; */
    }
    .fenleiBox .flItem:hover{
        cursor: pointer;
    }
    .fenleiBox .flItem img{
        width: 120px;
        height: 120px;
    }
    .fenleiBox p{
        font-size: 18px;
        width: 150px;
        text-align: center;
        color: #fff;
        height: 50px;
        line-height: 50px;
    }
    .otherflBox{
        width: 75%;
        max-width: 1630px;
        min-height: 200px;
        margin: 0 auto;
        padding-top: 52px;
        box-sizing: border-box;
    }
    .otherflBox h4{
        font-size: 20px;
        color: #fff;
    }
    .otherflBox .itemBox{
        width: 100%;
        min-height: 50px;
        display: flex;
        flex-wrap: wrap;
        margin-top: 40px;
        flex-basis: auto;
    }
    .otherflBox .itemBox .items{
        min-width: 200px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;      
        border: 1px solid #C4CACE;       
        border-radius: 6px;
        margin:10px 10px;
    }
    .otherflBox .itemBox .items:hover{
        cursor: pointer;
    }
    .otherflBox .itemBox .items p{
        margin-right: 5px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
    }
    .moveList{
        width: 90%;
        max-width: 1820px;
        min-height: 300px;
        margin: 70px auto 0 auto;
        /* padding-left: 5px; */
        box-sizing: border-box;
    }
    .moveList .moveNav{
        display: flex;
        justify-content: center;
        margin-bottom: 36px;
    }
    .moveList .moveNav p{
        font-size: 20px;
        margin: 0 30px;
        padding-bottom: 5px;
        box-sizing: border-box;
        color: #fff;
    }
    .moveList .moveNav p:hover{
        cursor: pointer;
    }
    .moveList .moveNav p.selected{
        border-bottom: 3px solid #FFD302;
    }
    .moveList .moveBox{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }
    .moveList .moveBox .pubItem{
        width: 262px;
        height: 328px;
        margin:0 16px 30px 0;
        box-sizing: border-box;
        position: relative;
        padding: 11px;
        /* background-color: #fff; */
        border-radius: 10px;
    }
    .moveList .moveBox .pubItem .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }
    .moveList .moveBox .pubItem .imgTop{
        width: 240px;
        height: 240px;
        position: relative;
    }
    .moveList .moveBox .pubItem .imgTop>img{
        width: 100%;
        height: 100%;
    }
    .moveList .moveBox .pubItem .imgTop>img:hover{
        cursor: pointer;
    }
    .moveList .moveBox .pubItem .imgTop .iconTop,.moveList .moveBox .pubItem .imgTop .iconDown{
        width: 200px;
        display: flex;
        align-items: center;
        position: absolute;
        left: 20px;
        z-index: 1;
        color: #fff;
    }
    .moveList .moveBox .pubItem .imgTop .iconTop{
        justify-content: space-between;
        top:20px;
        padding-right: 10px;
        box-sizing: border-box;
    }
    .moveList .moveBox .pubItem .imgTop .iconDown{
        justify-content: space-between;
        bottom: 10px;
    }
    .moveList .moveBox .pubItem .imgTop .iconDown>div img{
        width: 30px;
        height: 30px;
    }
    .moveList .moveBox .pubItem .imgTop .iconDown>div img:hover{
        cursor: pointer;
    }
    .moveList .moveBox .pubItem .imgTop .iconTop p{
        width: 32px;
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        line-height: 20px;
    }
    .moveList .moveBox .pubItem .imgTop .iconTop img{
        width: 20px;
        height: 16.27px;
    }
    .moveList .moveBox .pubItem .imgTop .iconDown img{
        width: 13.81px;
        height: 9.98px;
        margin-right: 5px;
    }
    .moveList .moveBox .pubItem .txtDown{
        width: 100%;
        line-height: 25px;
        color: #333;
        text-align: left;
        margin-top: 10px;
        padding-left: 20px;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
    }
    .moveList .moveBox .pubItem .txtDown h2{
        font-size: 16px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #fff;
    }
    .moveList .moveBox .pubItem .txtDown p{
        font-size: 12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #fff;
    }
    .tab{
        width: 100%;
        height: 100px;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .tab p{
        width: 40px;
        height: 4px;
        background-color: #FFD302;
        margin-top: 10px;
    }
    .productBox{
        width: 80%;
        max-width: 1632px;
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-content: center;
        margin: 0 auto 60px auto;
    }
    .productBox div{
        position: relative;
    }
    .productBox div h2{
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 20px;
        position: relative;
        z-index: 2;
    }
    .productBox div p{
        font-size: 16px;
        color: #fff;
        line-height: 32px;
        opacity: 0.8;
        position: relative;
        z-index: 2;
    }
    .productBox .bj{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        z-index: 1;
    }
    .productBox .rd{
        width: 44px;
        height: 44px;
        position: absolute;
        right: 20px;
        bottom: 20px;
        z-index: 1;
        opacity: 0;
        transition: opacity 1s;
    }
    .productBox .boxleft{
        /* width: 422px; */
        width: 28%;
        height: 672px;
        padding: 50px 20px 0 20px;
        box-sizing: border-box;
        text-align: left;
        overflow: hidden;
    }
    .productBox .boxleft:hover{
        cursor: pointer;
    }
    .productBox .boxright{
        width: 68%;
        margin-left:16px;
    }
    .productBox .boxright>div{
        display: flex;
    }
    .productBox .boxright>div div{
        padding: 50px 20px 0 20px;
        box-sizing: border-box;
        text-align: left;
        overflow: hidden;
    }
    .productBox .boxright>div div:hover{
        cursor: pointer;
    }
    .productBox .boxright .top{
        margin-bottom: 16px;
    }
    .productBox .boxright .top div:nth-child(1){
        /* width: 430px; */
        width: 41%;
        height: 328px;
    }
    .productBox .boxright .top div:nth-child(2){
        /* width: 746px; */
        width: 60%;
        height: 328px;
        margin-left:16px;
    }
    .productBox .boxright .down div:nth-child(1){
        /* width: 430px; */
        width: 40.7%;
        height: 328px;
    }
    .productBox .boxright .down div:nth-child(2){
        /* width: 365px; */
        width: 29%;
        height: 328px;
        margin-left:15px;
    }
    .productBox .boxright .down div:nth-child(3){
        /* width: 365px; */
        width: 29%;
        height: 328px;
        margin-left:15px;
    }
    .bottomNav{
        width: 100%;
        height: 282px;
        background-color: #3A485D;
    }
    .bottomNav .text{
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .bottomNav .text h2{
        font-size: 30px;
        color: #fff;
        margin-bottom: 20px;
    }
    .bottomNav .text p{
        font-size: 18px;
        color: #fff;
    }
    .bottomNav .btn{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .bottomNav .btn p{
        width: 180px;
        height: 46px;
        border: 1px solid #FFFFFF;
        border-radius: 3px;
        line-height: 46px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin:0 20px;
        box-sizing: border-box;
    }
    .bottomNav .btn p:hover{
        cursor: pointer;
    }
    .bottomNav .btn p.isSel{      
        background: #6495ED;
        border: none;
    }
    .bottomTitle{
        width: 100%;
        height: 180px;
    }
    .bottomTitle .aBox{
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .bottomTitle .aBox p{
        font-size: 16px;
        color: #999;
        display: inline-block;
        margin: 0 30px;
        font-weight: 400;
    }
    .bottomTitle .aBox p:hover{
        cursor: pointer;
    }
    .bottomTitle p{
        font-size: 14px;
        color: #C4CACE;
        text-align: center;
        margin-top: 30px;
    }
</style>