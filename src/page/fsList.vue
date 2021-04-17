<template>
    <div class="fsList" :style="`height:${screenHeight-60}px`">
        <vue-scroll :ops="opsx" style="width:100%;height:100%;">
        <div class="topNav">
             <topnav :topIcon="topIcon" :activeIndex="activeIndex"></topnav>
        </div>
        <div class="listBox">
            <div class="itemLi" v-for="(item,index) of fsArr" :key="index" @click="lookItem(item.id)">
                <div class="txtBox">
                    <h2>{{item.title}}</h2>
                    <h3>{{item.txt}}</h3>
                    <p>{{item.time}}</p>
                </div>
                <img v-lazy="item.img" class="imgright">
            </div>
        </div>
        </vue-scroll>
    </div>
</template>
<script>
import store from '../vuex/store'
import {mapState,mapMutations} from 'vuex';
import topnav from '../components/topnav'
export default {
    data(){
        return{
            topIcon:'../../static/image/top/logo2@2x.png',
            activeIndex:'6',
            fsArr:[
                {
                    id:1,
                    title:'医维度虚拟仿真教学软件系统',
                    txt:'医维度特点、功能、内容等介绍，医维度全景展馆、医学视频、考试系统及医维度的下载与注册。',
                    time:'2021-01-26 15:42:00',
                    img:'../../static/image/fslist/pic_jxxtrj@2x.png'
                },
                {
                    id:2,
                    title:'医维度虚拟仿真教学解决方案',
                    txt:'医维度虚拟仿真教学工作站、一体机、医维度虚拟仿真立体教室、数字教室、数字实验室、VR实验室、医维度人体断层三维重建数字解剖台。',
                    time:'2021-01-26 15:57:00',
                    img:'../../static/image/fslist/pic_ jxjjfa@2x.png'
                },
                {
                    id:3,
                    title:'医维度智能设备配套方案',
                    txt:'医维度智能互动设备、智能查询浏览系统。',
                    time:'2021-01-26 16:01:00',
                    img:'../../static/image/fslist/pic_sbptfa@2x.png'
                }, 
                {
                    id:4,
                    title:'医维度操作手册',
                    txt:'医维度平台高级查看器、标准查看器、切片查看器以及视频播放器的功能介绍及详细操作说明。',
                    time:'2020-04-03 08:50:00',
                    img:'../../static/image/fslist/pic_czsc@2x.png'
                }
            ]
        }
    },
    store,
    mounted(){
        this.windowChange();
    },
    methods:{
        ...mapMutations(["windowChange"]),
        // 查看详情
        lookItem(id){
            this.$router.push({
                name: 'Fsitem',
                params: {
                    id: id
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
<style scoped>
    .listBox{
        width: 100%;
        padding: 0 100px;
        box-sizing: border-box;
    }
    .listBox .itemLi{
        width: 1720px;
        height: 200px;
        border-bottom: 1px solid #C4CACE;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .listBox .itemLi .imgright{
        width: 220px;
        height: 150px;
    }
    .listBox .itemLi .txtBox{
        text-align: left;
    }
    .listBox .itemLi .txtBox h2{
        color: #333;
        font-weight: bold;
        font-size: 18px;
    }
    .listBox .itemLi .txtBox h3{
        margin: 10px 0 40px 0;
        font-size: 16px;
        color: #666;
        font-weight: 600;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical
    }
    .listBox .itemLi .txtBox p{
        font-size: 14px;
        color: #999;
    }
</style>